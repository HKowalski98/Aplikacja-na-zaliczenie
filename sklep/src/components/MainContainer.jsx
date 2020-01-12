import React, { Component} from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import Home from "./home";
import ProductsList from "./productsList";
import CreateProduct from './createProduct';
import EditProduct from './editProduct';
import OrderView from './OrderView.jsx';
import ShopOrders from './shopOrders';




export default class MainContainer extends Component{
constructor(){
    super()



    this.state={
        order:[]
    }

    this.productAddToOrder = this.productAddToOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);

}
productAddToOrder(product){
    let order = this.state.order
    let exist = false 
    order.forEach((prod)=> {
        if(prod.name === product.name) 
        {
        alert("Produkt znajduje sie juz w koszyku. Jego ilość mozesz zmienić w koszyku.")
        exist = true
        }
    }) 
    if(!exist){
        order.push(product)
        this.setState({order})
    }
    
   
}
updateOrder(order){
    this.setState({order});
}


render(){
    return(
    <Router>
        <div className='container-fluid' style={{maxWidth:'90%'}}>
        <Navbar/>
        <br/>
        <Route  path="/" exact component={Home}/>
        <Route  path="/product" exact render={(props) => <ProductsList onOrderChange={this.productAddToOrder}  />} />
        <Route  path="/product/create" exact component={CreateProduct}/>
        <Route  path="/product/edit" exact component={EditProduct} />
        <Route  path="/shopOrders" exact component={ShopOrders} />
        <Route  path='/order' exact render={(props) => <OrderView  order ={this.state.order} sentOrder={this.updateOrder} />} />
        </div>    
    </Router>
    )
}
}


