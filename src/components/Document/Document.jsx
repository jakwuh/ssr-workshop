import React from 'react';
import serialize from 'serialize-javascript';

const style = `
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    font-weight: 300;
}
`;

export default ({ children, store }) => <>
    <html>
    <head lang='en'>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width'/>
        <title>SSR Workshop</title>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
    <div id="root">{children}</div>
    <script dangerouslySetInnerHTML={{ __html: `window.STORE_DATA = ${serialize(store.serialize())};` }} />
    <script src='/bundle.js'/>
    </body>
    </html>
</>
