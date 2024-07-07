import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [cartList, setCartList] = useState(() => {
      const savedCart = localStorage.getItem("cartList");
      return savedCart ? JSON.parse(savedCart) : [];
   });
   const [isOpen, setIsOpen] = useState(false);
   const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
      const getProducts = async () => {
         const response = await api.get("/products");
         setProductList(response.data);
         setFilteredProducts(response.data);
      };
      getProducts();
   }, []);

   useEffect(() => {
      localStorage.setItem("cartList", JSON.stringify(cartList));
   }, [cartList]);


   const addToCart = (product) => {
      const isProductInCart = cartList.some(cartItem => cartItem.id === product.id);
      if (isProductInCart) {
         alert("Este item já foi inserido no carrinho");
      } else {
         setCartList((prevCartList) => [...prevCartList, product]);
      }
   };

   const removeProduct = (index) => {
      setCartList((prevCartList) => prevCartList.filter((_, i) => i !== index));
   };

   const removeAll = () => {
      setCartList([]);
   };

   const toggleModal = () => {
      setIsOpen(!isOpen);
   };

   const handleSearch = (value) => {
      setSearchValue(value);
      if (value) {
         const filtered = productList.filter(product => product.name.toLowerCase().includes(value.toLowerCase()) || product.category.toLowerCase().includes(value.toLowerCase())
         );
         setFilteredProducts(filtered);
      } else {
         setFilteredProducts(productList);
      }
   };

   return (
      <>
         <Header toggleModal={toggleModal} cartList={cartList} handleSearch={handleSearch} />
         <main>
            <ProductList productList={filteredProducts} addToCart={addToCart} />
            {isOpen && (<CartModal cartList={cartList} removeProduct={removeProduct} removeAll={removeAll} toggleModal={toggleModal} />)}
         </main>
      </>
   );
};
