import React, { useState } from "react";
import Button from "../button";
import classes from "./styles.module.css";
const Item = (props) => {
    const { id, title, price, description, category, quantity, handleEdit, handleDelete, handleAddToCart} = props;
    const [input, setInput] = useState(0);
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
                    type="number"
                    name="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button action={() => handleAddToCart(input, id, title, price, description, category, quantity)}>
                    Add to Cart
                </Button>
            </form>
        </div>
    );
};



export default Item;