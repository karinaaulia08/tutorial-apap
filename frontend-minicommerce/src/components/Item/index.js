import React from "react";
import Button from "../button";
import classes from "./styles.module.css";
const Item = (props) => {
    const { id, title, price, description, category, quantity, handleEdit, handleDelete} = props;
    const handleAddToCart = (event) => {
        console.log(event.target.value)
        quantity(event.target.value)
        console.log(quantity)
    };
    return (
        <div className={classes.item}>
            <h3>{`ID ${id}`}</h3>
            <p>{`Nama Barang: ${title}`}</p>
            <p>{`Harga: ${price}`}</p>
            <p>{`Deskripsi: ${description}`}</p>
            <p>{`Kategori: ${category}`}</p>
            <p>{`stok: ${quantity}`}</p>
            <Button action={handleEdit}>
                Edit
            </Button>
            <Button action={handleDelete}>
                Delete
            </Button>
            <form>
                <input
                    className="form-control-sm" 
                    type="text"
                />
                <Button action={handleAddToCart}>
                    Add to Cart
                </Button>
            </form>
        </div>
    );
};



export default Item;