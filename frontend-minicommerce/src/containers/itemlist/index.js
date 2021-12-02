import React, { Component } from "react";
import Item from "../../components/Item";
import classes from "./styles.module.css";
import APIConfig from "../../api/APIConfig";
import Button from "../../components/button";
import Modal from "../../components/modal";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Fab } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            isCreate: false,
            isEdit: false,
            id: "",
            title: "",
            price: 0,
            description: "",
            category: "",
            quantity: 0,
            cartItems: []
        };
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmitItem = this.handleSubmitItem.bind(this);
        this.handleSubmitEditItem = this.handleSubmitEditItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleEditStok = this.handleEditStok.bind(this);
        // this.routeChange = this.routeChange.bind(this);

    }
    handleCancel(event) {
        event.preventDefault();
        this.setState({ isCreate:false, isEdit: false });
    }
    handleAddItem() {
        this.setState({ isCreate:true });
    }
    async handleAddToCart(input, id, title, price, description, category, quantity) {
        try {
            if (input <= quantity) {
                const data = {
                    idItem: id,
                    quantity: input
                };
                await APIConfig.post("/cart", data);
                const stok = quantity - input;
                this.handleEditStok(id, title, price, description, category, stok)
                this.loadData()
            } else {
                alert("Jumlah stok kurang")
            }
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    async handleEditStok(id, title, price, description, category, stok) {
        const data = {
            title: title,
            price: price,
            description: description,
            category: category,
            quantity: stok
        };
        await APIConfig.put(`/item/${id}`, data);
    }


    handleEditItem(item) {
        this.setState({
            isEdit: true,
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            quantity: item.quantity
        })
    }
    handleChangeField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    async handleSubmitItem(event) {
        event.preventDefault();
        try {
            const data = {
                title: this.state.title,
                price: this.state.price,
                description: this.state.description,
                category: this.state.category,
                quantity: this.state.quantity
            };
            await APIConfig.post("/item", data);
            this.setState({
                title: "",
                price: 0,
                description: "",
                category: "",
                quantity: 0
            });
            this.loadData();
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
        this.handleCancel(event);
    }
    async handleSubmitEditItem(event) {
        event.preventDefault();
        try {
            const data = {
                title: this.state.title,
                price: this.state.price,
                description: this.state.description,
                category: this.state.category,
                quantity: this.state.quantity
            };
            await APIConfig.put(`/item/${this.state.id}`, data);
            this.setState({
                id: "",
                title: "",
                price: 0,
                description: "",
                category: "",
                quantity: 0
            });
            this.loadData();
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
        this.handleCancel(event);
    }
    async handleSearch(event) {
        try {
            const { data } = await APIConfig.get("item?title=" + event.target.value);
            this.setState({ items: data.result });
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    async handleDeleteItem(item) {
        try {
            await APIConfig.delete(`/item/${item.id}`);
            this.loadData();
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    

    componentDidMount() {
        this.loadData();
        this.loadDataCart();
    }
    async loadData() {
        try {
            const { data } = await APIConfig.get("/item");
            this.setState({ 
                items: data.result });
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    async loadDataCart() {
        try {
            const { data } = await APIConfig.get("/cart");
            this.setState({ 
                cartItems: data.result });
        } catch (error) {
            alert("Oops terjadi masalah pada server");
            console.log(error);
        }
    }
    
    // routeChange=()=> {
    //     let path = `cart`;
    //     let history = useHistory();
    //     history.push(path);
    //   }

    render() {
        return (
            <div>
                <div className={classes.itemList}>
                    <h1 className={classes.title}>All Items</h1>
                    <div style={{ position: "fixed", top: 25, right: 25 }}>
                        <Fab variant="extended" onClick={event =>  window.location.href='/cart'}>
                            <Badge color="secondary" badgeContent={this.state.cartItems.length}>
                                <ShoppingCartIcon />
                            </Badge>
                        </Fab>
                    </div>
                    <form>
                        <input
                            className="form-control" 
                            type="search"
                            name="title"
                            onChange={this.handleSearch}
                        />
                    </form>
                    <Button action={this.handleAddItem}>
                        Add Item
                    </Button>
                    <div>
                        {this.state.items.map((item) => (
                            <Item
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                quantity={item.quantity}
                                handleEdit={() => this.handleEditItem(item)}
                                handleDelete={() => this.handleDeleteItem(item)}
                                handleAddToCart={this.handleAddToCart}
                            />
                        ))}
                    </div>
                    <Modal
                        show={this.state.isCreate || this.state.isEdit}
                        handleCloseModal={this.handleCancel}
                        modalTitle={this.state.isCreate
                            ? "Add Item"
                            : `Edit Item ID ${this.state.id}`}
                        >
                        <form>
                            <input
                            className={classes.textField}
                            type="text"
                            placeholder="Nama Item"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChangeField}
                            />
                            <input
                            className={classes.textField}
                            type="number"
                            placeholder="Harga"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleChangeField}
                            />
                            <textarea
                            className={classes.textField}
                            placeholder="Deskripsi"
                            name="description"
                            rows="4"
                            value={this.state.description}
                            onChange={this.handleChangeField}
                            />
                            <input
                            className={classes.textField}
                            type="text"
                            placeholder="Kategori"
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChangeField}
                            />
                            <input
                            className={classes.textField}
                            type="number"
                            placeholder="qty"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleChangeField}
                            />
                            <Button action={this.state.isCreate
                                ? this.handleSubmitItem
                                : this.handleSubmitEditItem}
                            >
                                Create
                            </Button>
                            <Button action={this.handleCancel}>
                                Cancel
                            </Button>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default ItemList;
// import React, { Component } from "react";
// class ItemList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [
//                 {
//                     id: 1,
//                     title: "Nintendo Switch",
//                     price: "Rp5.000.000",
//                     description: "The video game system you can play at home or on the go.",
//                     category: "Console",
//                 },
//                 {
//                     id: 2,
//                     title: "Playstation 5",
//                     price: "Rp12.000.000",
//                     description: "A home video game console developed by Sony Interactive Entertainment.",
//                     category: "Console",
//                 },
//                 {
//                     id: 3,
//                     title: "ASUS ROG Zephyrus G14",
//                     price: "Rp17.000.000",
//                     description: "ASUS ROG Zephyrus G14 is a successful equipment for work and entertainment.",
//                     category: "Laptop",
//                 }
//             ],
//             isLoading: false,
//         };
//         this.handleClickLoading = this.handleClickLoading.bind(this);
//     }
//     handleClickLoading() {
//         const currentLoading = this.state.isLoading;
//         this.setState({ isLoading: !currentLoading });
//         console.log(this.state.isLoading);
//     }
//     componentDidMount() {
//         console.log("componentDidMount()");
//     }
//     shouldComponentUpdate(nextProps, nextState) {
//         console.log("shouldComponentUpdate()");
//         return true;
//     }
//     render() {
//         console.log("render()");
//         return (
//             <div>
//             <h1>All Item</h1>
//             <p>Item 1, 2, 3, dst</p>
//             <button onClick={this.handleClickLoading}>Change State</button>
//             </div>
//         );
//     }
    
// }
// export default ItemList;