import React , {Component } from 'react';
import axios from 'axios';


export default class ProductsList extends Component{
    constructor(props){
        super(props);
    
        this.state={
            productsList:[],
            categories:[],
            filteredName:'',
            filteredCategory:'',
        }
        this.filterByName = this.filterByName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
    }
   

  async componentDidMount(){ 
        let products = [];
        let cats = [];
        await axios.get("http://localhost:5000/product/")
        .then(response => {
            //console.log(response.data)
            if(response.data.length > 0){
                response.data.forEach(prod => {
                    //console.log(prod._id)
                    let product={
                        id: prod._id,
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        unit: prod.unit,
                        category: prod.category,
                        quantity:1
                       
                    }
                    products.push(product);
                });
            }
           
        });

      
        await axios.get("http://localhost:5000/category/")
        .then(response => {
            if(response.data.length > 0 ){
                response.data.forEach(cat =>{
                    let category={
                        name:cat.name,
                    }
                    cats.push(category);
                })
            }
        });
        let category={
            name:'',
        }
        cats.unshift(category);
        this.setState({productsList : products, categories: cats})
        //console.log(this.state.categories)
        
    }
   onChangeCategory(e){
       //console.log(e.target.value)
       this.setState({filteredCategory: e.target.value})
       //console.log(this.state.filteredCategory)
   }


    filterByName(e){
        this.setState({filteredName: e.target.value})
        //console.log(this.state.filteredName)
    }
    handleChange(product){
        //console.log(product);
        this.props.onOrderChange(product)
    }
    quantityChange(e,product){
        let list = this.state.productsList;
        let index = list.indexOf(product);
        list[index].quantity=e.target.value;
       
    } 
    

    renderProducts(){
        return(
        <table className="table">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Opis</th>
                        <th>Cena</th>
                        <th>Jednostka</th>
                        <th>Kategoria</th>
                        <th>Ilosc</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.productsList.map((product)=>
                        (
                            (product.name.toLowerCase().includes(this.state.filteredName.toLowerCase()) && this.state.filteredName !== '' ) 
                            ||
                            ((product.category === this.state.filteredCategory) && this.state.filteredName === '')
                            ||
                            ((this.state.filteredName === '') && (this.state.filteredCategory===''))
                        )
                        ? 
                        <tr key={product.id} >
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} zł</td>
                            <td>{product.unit}</td>
                            <td>{product.category}</td>
                            <td><input style={{marginRight:10, width:'20%'}} defaultValue={1} onChange ={(e) => this.quantityChange(e,product)}/><button onClick = {() => {this.handleChange(product)}} className="btn btn-success">Dodaj do koszyka</button></td>
                        </tr>
                    :
                    <tr></tr>
                    )}
                </tbody>
            </table>


        )}
   

    
    render(){
        return(
            <div> 
                
                <label style={{marginRight:10}}>Nazwa: </label>
                <input placeholder="Nazwa produktu" onChange={this.filterByName}/>
                <label style={{marginRight:10,marginLeft:10}}>Kategoria: </label>
                <select onChange={this.onChangeCategory}
                        value={this.state.filteredCategory}
                >
                    {this.state.categories.map((cat)=>
                    <option value={cat.name}>{cat.name}</option>)}
                </select>
                {this.renderProducts()}
               
            </div>
        )
    }
}