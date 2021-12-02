import classes from "./styles.module.css";
const CartItem = (props) => {
    const { idCart, title, price, description, category, quantity} = props;
    const totalPrice = price * quantity;
    return (
        <div className={classes.item}>
            <h3>{`ID Cart: ${idCart}`}</h3>
            <p>{`Nama Barang: ${title}`}</p>
            <p>{`Harga: ${price}`}</p>
            <p>{`Jumlah: ${quantity}`}</p>
            <p>{`Deskripsi: ${description}`}</p>
            <p>{`Kategori: ${category}`}</p>
            <h6>{`Total Harga: ${totalPrice}`}</h6>
        </div>
    );
};



export default CartItem;