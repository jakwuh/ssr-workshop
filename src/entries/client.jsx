import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../components/Page/Page';
import Store from '../models/Store';

import 'antd/lib/card/style';
import 'antd/lib/button/style';

const store = new Store();

ReactDOM.render(
    <Page store={store}/>,
    document.getElementById('root'),
);
