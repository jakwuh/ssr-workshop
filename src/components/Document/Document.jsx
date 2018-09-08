import React from 'react';

const style = `
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    font-weight: 300;
}
`;

export default ({ children }) => <>
    <html>
    <head lang='en'>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width'/>
        <title>SSR Workshop</title>
        <style dangerouslySetInnerHTML={{ __html: style }} />
    </head>
    <body>
    <div id="root">{children}</div>
    <script src='/bundle.js'/>
    </body>
    </html>
</>
