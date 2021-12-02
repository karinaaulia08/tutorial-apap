import React, { Component } from "react";
import CartItem from "../../components/CartItem";
import classes from "./styles.module.css";
import APIConfig from "../../api/APIConfig";
import Button from "../../components/button";
import { Fab } from "@material-ui/core";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import Item from "../../components/Item";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems:[],
            items: []
        };
        this.loadDataCart= this.loadDataCart.bind(this);
        this.addCartItems = this.addCartItems.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }
    componentDidMount() {
        this.loadDataCart();
    }
    async loadDataCart() {
        try {
            const { data } = await APIConfig.get("/cart");
            this.setState({ 
                cartItems: data.result });
            console.log(data.result)
            this.addCartItems(data.result);
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    async addCartItems(arr) {
        const listItem = []
        for (const item in arr) {
            const { data } = await APIConfig.get(`/item/${item.id_item}`);
            listItem.push(data);
        }
        this.setState({items: listItem})
    }
    async handleCheckout() {
        await APIConfig.get("/cart/checkout");
        this.loadDataCart();
    }


    render() {
        return (
            <div>
                <div className={classes.itemList}>
                    <h1 className={classes.title}>Cart Items</h1>
                    <div style={{ position: "fixed", top: 25, left: 25 }}>
                        <Fab color="primary" variant="extended" onClick={event =>  window.location.href='/'}>
                            <ArrowBackIcon /> BACK
                        </Fab>
                    </div>
                    <div style={{ position: "fixed", top: 25, right: 25 }}>
                    {this.state.cartItems.length !== 0 ? (
                        <Fab color="primary" variant="extended" onClick={this.handleCheckout}>
                            <PointOfSaleIcon /> CHECKOUT
                        </Fab>
                    ) : null}
                    </div>
                    {this.state.cartItems.length === 0 ? (
                        <div className="text-center">
                            <h1>Belum ada yang dipilih</h1>
                            <h3>Klik salah satu item di List Item</h3>
                        </div>
                    ) : null}
                    <div>
                        {this.state.cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                idCart={item.id}
                                title={item.item.title}
                                price={item.item.price}
                                description={item.item.description}
                                category={item.item.category}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default CartItems;