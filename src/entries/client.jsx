import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Page from '../components/Page/Page';
import Store from '../models/Store';

import 'antd/lib/card/style';
import 'antd/lib/button/style';

const store = new Store();

if (window.STORE_DATA) {
    store.deserialize(window.STORE_DATA);
}

ReactDOM.hydrate(
    <BrowserRouter>
        <Page store={store}/>
    </BrowserRouter>,
    document.getElementById('root'),
);
