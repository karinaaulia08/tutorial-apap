import React from "react";
import listItems from "../../items.json";
import List from "../../components/List/index";
import "./index.css";
import { Fab } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopItems: listItems,
            cartItems: [],
            cartHidden: true,
            balance: 120,
        };
    }
    handleAddItemToCart = (item) => {
        const newItems = [...this.state.cartItems];
        const newItem = { ...item };
        const targetInd = newItems.findIndex((it) => it.id === newItem.id);
        if (this.state.balance - newItem.price < 0) {
            alert("Balance not sufficient");
        } else {
            if (targetInd < 0) {
                newItem.inCart = true;
                newItems.push(newItem);
                this.updateShopItem(newItem, true)
            } 
            this.setState({ cartItems: newItems });
            this.state.balance -= newItem.price;
        }
    };
    handleRemoveItemFromCart = (item) => {
        const removeItems = [...this.state.cartItems];
        const removeItem = { ...item };
        const targetInd = removeItems.findIndex((it) => it.id === removeItem.id);
        if (targetInd >= 0) {
            removeItem.inCart = true;
            const result = removeItems.filter((it) => it.id !== removeItem.id);
            this.updateShopItem(removeItem, false);
            this.setState({ cartItems: result });
            this.state.balance += removeItem.price;
        } 
    };
    handleRemoveAllItemFromCart = (item) => {
        const emptyItems = [];
            this.setState({ cartItems: emptyItems});
            this.state.balance = 120;
        } 
    };
    //update button pada list item
    updateShopItem = (item, inCart) => {
        const tempShopItems = this.state.shopItems;
        const targetInd = tempShopItems.findIndex((it) => it.id === item.id);
        tempShopItems[targetInd].inCart = inCart;
        this.setState({ shopItems: tempShopItems });
    }
    handleToggle = () => { 
        const cartHidden = this.state.cartHidden;
        this.setState({ cartHidden: !cartHidden });
    };                                                                
    render() {
        return (
            <div className="container-fluid">
                <h1 className="text-center mt-3 mb-0">Mini Commerce</h1>
                <div style={{ position: "fixed", top: 25, right: 25 }}>
                    <Fab variant="extended" onClick={this.handleToggle}>
                        {this.state.cartHidden ?
                            <Badge color="secondary" badgeContent={this.state.cartItems.length}>
                                <ShoppingCartIcon />
                            </Badge>
                            : <ViewStreamIcon/>}
                    </Fab>
                </div>
                {/* <div style={{ position: "fixed", top: 25, right: 25 }}>
                    <Fab variant="extended" onClick={this.handleRemoveAllItemFromCart}>
                            <ShoppingCartIcon />
                    </Fab>
                </div> */}
                <p className="text-center text-secondary text-sm font-italic">
                    (this is a <strong>class-based</strong> application)
                </p>
                <p className="text-center text-primary" >Your Balance: <b> {this.state.balance}</b> </p>
                <div className="container pt-3">
                    <div className="row mt-3">
                        {!this.state.cartHidden ? (
                            <div className="col-sm">
                                <List
                                    title="My Cart"
                                    items={this.state.cartItems}
                                    onItemClick={this.handleRemoveItemFromCart}
                                ></List>
                            </div>
                        ) : <div className="col-sm">
                            <List
                                title="List Items"
                                items={this.state.shopItems}
                                onItemClick={this.handleAddItemToCart}
                                isShopList={true}
                            ></List>
                        </div>}
                        {/* <div className="col-sm">
                            <List
                                title="List Items"
                                items={listItems}
                                onItemClick={() => {}}
                            ></List>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}