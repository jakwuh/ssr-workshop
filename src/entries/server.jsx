import React from 'react';
import Koa from 'koa';
import Document from '../components/Document/Document';
import { renderToString } from 'react-dom/server';

const docType = '<!doctype html>';
const app = new Koa();

app.use(async ctx => {
    const document = <Document />;
    ctx.body = `${docType}${renderToString(document)}`;
});

app.listen(3000);
