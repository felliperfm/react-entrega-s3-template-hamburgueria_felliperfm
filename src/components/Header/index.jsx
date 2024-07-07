import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ toggleModal, cartList, handleSearch }) => {
   const [value, setValue] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      handleSearch(value);
   };

   return (
      <header className={styles.header}>
         <div className={`${styles.headerBox} container`}>
            <img src={Logo} alt="Logo Kenzie Burguer" />
            <div className={styles.menuBox}>
               <button className={styles.cartButton} onClick={toggleModal}>
                  <MdShoppingCart size={21} className={styles.icon} />
                  <span className={styles.itemCount}>{cartList.length}</span>
               </button>
               <form className={styles.searchBox} onSubmit={handleSubmit}>
                  <input
                     type="text"
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                     className={styles.input}
                     placeholder="Pesquisar..."
                  />
                  <button type="submit" className={styles.searchButton}>
                     <MdSearch size={21} className={styles.icon} />
                  </button>
               </form>
            </div>
         </div>
      </header>
   );
};
