import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss"

export const CartItemCard = ({ product, index, removeProduct }) => {
   return (
      <li>
         <div className={styles.itemCard}>
            <div>
               <img src={product.img} alt={product.name} />
               <div>
                  <h3 className="title">{product.name}</h3>
                  <p className="price">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
               </div>
            </div>
            <button aria-label="delete" title="Remover item" onClick={() => removeProduct(index)} className={styles.removeButton}>
               <MdDelete size={21} />
            </button>
         </div>
      </li>
   );
};
