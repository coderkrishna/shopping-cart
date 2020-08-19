import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/."
import "./App.css"
import { toast,ToastContainer } from "react-toastify";
import Cart from "./components/cartSection";
import {Container,Row,Col} from "reactstrap"
import BuyPage from "./components/buyPage"
const App = () => {
  //state which stores the items of the cart in a cart.
  const [cartItem,setCartItem] = useState([]);

  // adding a particular item on to the cart 
  const addInCart = item => {
    // checking mechanism if the passed item is already present in the cart by comparing the id
    const isAlreadyAdded = cartItem.findIndex((array)=>{
      return array.id === item.id
    })


    if(isAlreadyAdded !== -1){
      toast("already added in the cart", {
        type: "error"
      })
      return;
    }
     // the entire above section checks whether an item is present in an cart.
     // findIndex method returns a postive index if the item is present in the cart
    setCartItem([...cartItem, item]);
    // if item is not present in the cart,then add into the cart using setCartItem.
  };
  
  //buy method for the functionality of the buyNow button inside a cart
  //for a large scale product, a payment gateway can be added in this method 
  const buyNow = () => {
       setCartItem([]);
       //Emptying the cart and procedding to the payment
       toast("Purchase Complete",{
         type: "success"
       });
  }

  // remove a particular item in a cart using the remove button,
  // using a filter method on the state to remove out the id of the item passed
  const removeItem = (item) => {
      setCartItem(cartItem.filter(singleItem => singleItem.id !== item.id))
  };
 return(
   <div className="App">
     <Container fluid>
       <ToastContainer/>
       <Row>
         <Col md="8">
           <BuyPage addInCart={addInCart}/>
         </Col>
         <Col md="4">
           <Cart cartItem={cartItem} removeItem={removeItem} buyNow={buyNow}/>
         </Col>
       </Row>
     </Container>
   </div>
 );

}

export default App;