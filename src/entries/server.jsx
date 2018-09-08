import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import Document from '../components/Document/Document';
import { renderToString } from 'react-dom/server';
import Page from '../components/Page/Page';
import fetchDataFromTree from '../helpers/getDataFromTree';
import Store from '../models/Store';

const docType = '<!doctype html>';
const app = new Koa();

app.use(proxy('/search/apartments', {
    target: ONLINER_API_BASE_URL,
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

    await fetchDataFromTree(document);

    ctx.body = `${docType}${renderToString(document)}`;
});

app.listen(3000);
