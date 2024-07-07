import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";

export const CartModal = ({ cartList, removeProduct, removeAll, toggleModal }) => {
   const modalRef = useRef(null);
   const [isModalOverflow, setIsModalOverflow] = useState(false);

   useEffect(() => {
      const checkOverflow = () => {
         if (modalRef.current && modalRef.current.offsetHeight >= window.innerHeight) {
            setIsModalOverflow(true);
         } else {
            setIsModalOverflow(false);
         }
      };

      const resizeObserver = new ResizeObserver(() => {
         checkOverflow();
      });

      if (modalRef.current) {
         resizeObserver.observe(modalRef.current);
      }

      checkOverflow();

      return () => {
         if (modalRef.current) {
            resizeObserver.unobserve(modalRef.current);
         }
      };
   }, []);

   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            toggleModal();
         }
      };

      const handleKeyDown = (event) => {
         if (event.key === "Escape") {
            toggleModal();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, [toggleModal]);

   return (
      <div role="dialog" className={`${styles.modalOverlay} ${isModalOverflow ? styles.oversized : ""}`}>
         <div className={styles.modalBox} ref={modalRef}>
            <div className={styles.modalTitle}>
               <h2 className="title white">Carrinho de compras</h2>
               <button aria-label="close" title="Fechar" className={styles.closeButton} onClick={toggleModal}>
                  <MdClose size={21} />
               </button>
            </div>
            <div className={styles.modalMain}>
               <div className={styles.itemsList}>
                  <ul>
                     {cartList.map((product, index) => (
                        <CartItemCard key={index} index={index} product={product} removeProduct={removeProduct} />
                     ))}
                  </ul>
               </div>
               <div>
                  <div className={styles.total}>
                     <span className="total">Total</span>
                     <span className="total grey">{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                  </div>
                  <button className={`${styles.removeAllButton} btn lg`} onClick={() => removeAll()}>Remover todos</button>
               </div>
            </div>
         </div>
      </div>
   );
};
