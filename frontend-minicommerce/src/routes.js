import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemList from './containers/itemlist';
import CartItems from './containers/cartItems';

export const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ItemList} />
                <Route exact path="/cart" component={CartItems} />
            </Switch>
        </div>

    );
};