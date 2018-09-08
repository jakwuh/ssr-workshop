import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import Document from '../components/Document/Document';
import { renderToString } from 'react-dom/server';
import Page from '../components/Page/Page';
import Store from '../models/Store';

const docType = '<!doctype html>';
const app = new Koa();

app.use(proxy('/search/apartments', {
    target: 'https://ak.api.onliner.by',
    changeOrigin: true,
}));

app.use(serve(PUBLIC_ROOT));

app.use(async ctx => {
    const store = new Store();
    const document = (
        <Document>
            <Page store={store}/>
        </Document>
    );
    ctx.body = `${docType}${renderToString(document)}`;
});

app.listen(3000);
