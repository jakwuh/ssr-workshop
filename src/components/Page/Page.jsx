import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import Apartments from '../Apartments/Apartments';
import Home from '../Home/Home';

const Page = ({ store }) => (
    <Switch>
        <Route path="/home" render={Home}/>
        <Route component={observer(() => <Apartments apartments={store.apartments}/>)}/>
    </Switch>
);

export default Page;
