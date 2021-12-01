import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemList from './containers/itemlist';

export const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ItemList} />
            </Switch>
        </div>

    );
};