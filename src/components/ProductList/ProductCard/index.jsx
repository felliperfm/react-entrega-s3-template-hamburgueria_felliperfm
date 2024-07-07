import styles from "./style.module.scss";

export const ProductCard = ({ product, addToCart }) => {
    return (
        <li className={styles.card}>
            <img src={product.img} alt={product.name} />
            <div>
                <h3 className="title">{product.name}</h3>
                <span className="subtitle">{product.category}</span>
                <span className="price">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button className="btn sm" onClick={() => addToCart(product)}>Adicionar</button>
            </div>
        </li>
    );
};
