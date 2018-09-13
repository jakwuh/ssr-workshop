import React from 'react';
import { StaticRouter } from 'react-router'
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import Document from '../components/Document/Document';
import DocumentStream from '../components/Document/DocumentStream';
import Page from '../components/Page/Page';
import Store from '../models/Store';

const app = new Koa();

app.use(proxy('/search/apartments', {
    target: ONLINER_API_BASE_URL,
    changeOrigin: true,
}));

app.use(serve(PUBLIC_ROOT));

app.use(ctx => {
    const store = new Store();
    const document = (
        <Document store={store}>
            <StaticRouter location={ctx.request.url} context={{}}>
                <Page store={store}/>
            </StaticRouter>
        </Document>
    );

    const stream = new DocumentStream(document);

    ctx.type = 'html';
    ctx.body = stream;
});

app.listen(3000);
