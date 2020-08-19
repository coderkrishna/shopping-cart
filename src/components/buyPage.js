import React,{useState,useEffect} from "react";
//why is useEffect used??
// useEffect is used to load imformation or the data that is fetched from the api which
// can be extracted by firing a request to the api via Axios or an HTTPClient
//useEffect is used to load beforehand
import Axios from "axios";
import {random, commerce} from "faker";
// inorder to generate some random data from the commerce section such as cost,itemname
import {Container,Col,Row} from "reactstrap";
import CartItem from "./cardItem";
const apiKey = "INSERT_YOUR_KEY_HERE";
const localurl = "https://jsonkeeper.com/b/LA4K"
const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"

const BuyPage = ({addInCart}) => {
   const [product,setProduct] = useState([]);

   // fetch photos from the api using a asynchronus request via axios 
   // if we have an api key from the pexels,then follow the below
   /*const fetchPhotos = async () => {
       const response = await Axios.get(url,{
           header:{
               Authorization: apiKey,
           }
       });
   }*/
  //What is the use of await???
  // what is the header in the get()
  
  //if we dont have an api key and hoisted the json locally on our browser,then
  //local url
  //Extraction is entirely the part of fetchPhotos method and all the api 
  // related stuff must be inside the fetch method
const fetchPhotos = async () => {
    const {data} = await Axios.get(localurl);

// accessing photos branch from the data
// loop through the sections of the photos branch and retrieve the imformation
// and store in the state
 const {photos} = data;

 const allProducts = photos.map(photo=>(
     {
         smallImage: photo.src.medium,
         tinyImage : photo.src.tiny,
         productName:random.word(),
         productPrice:commerce.price(),
         id: random.uuid() 
     }
 )); 
  //setting all the data extracted from the api to the state
   setProduct(allProducts);
};


 //usage of useEffect here,restoring of photos on the reload of the page
  useEffect(()=>{
      fetchPhotos()
  },[]);

  return(
      <Container fluid>
         <h1 className="text-info text-center">
           BUY PAGE
         </h1>
         <Row>
           {product.map(product => (
               <Col md={4} key={product.id}>
                 <CartItem product={product} addInCart={addInCart} />
               </Col>
           ))}
         </Row>
      </Container>
  )
 
}

export default BuyPage;