import React , {Component } from 'react';
import axios from 'axios';

export default class editProduct extends Component{
    constructor(props){
        super(props);
    
        this.state={
            productsList:[],
            categories:[],
            filteredName:'',
            filteredCategory:'',
            units:[]
        }
        this.filterByName = this.filterByName.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.inactiveEdit = this.inactiveEdit.bind(this);
        this.activeEdit = this.activeEdit.bind(this);
        this.changeEditValue = this.changeEditValue.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onEditCategory = this.onEditCategory.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
    }
   

  async componentDidMount(){ 
        let products = [];
        let cats = [];
        this.setState({
            units:["KG", "SZT", "L"]
        })
        await axios.get("http://localhost:5000/product/")
        .then(response => {
            if(response.data.length > 0){
                response.data.forEach(prod => {
                    let product={
                        id:prod._id,
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        unit: prod.unit,
                        category: prod.category,
                        editValue:false
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
        //console.log(this.state.productsList)
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

    inactiveEdit(product){
        return(
            <tr>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} zł</td>
                <td>{product.unit}</td>
                <td>{product.category}</td>
                <td><button className='btn btn-primary' onClick={()=>{this.changeEditValue(product)}}>EDYTUJ</button></td>
            </tr>
        )

    }
    activeEdit(product){
        return(
            <tr>
                <td><input  placeholder={product.name} onChange={(e) => this.onNameChange(e, product)} 
                            value={this.state.productsList[this.state.productsList.indexOf(product)].name}/>
                </td>
                <td><input  placeholder={product.description} onChange={(e) => this.onDescriptionChange(e, product)}  
                            value={this.state.productsList[this.state.productsList.indexOf(product)].description}/>
                </td>
                <td><input  placeholder={product.price} onChange={(e) => this.onPriceChange(e, product)}  
                            value={this.state.productsList[this.state.productsList.indexOf(product)].price}/> zł
                </td>
                <td> <select required className="form-control" 
                                value={this.state.productsList[this.state.productsList.indexOf(product)].unit}
                                onChange={(e) => this.onChangeUnit(e, product)}
                               >
                            {
                                this.state.units.map(function(unit){
                                    return <option 
                                    key={unit}
                                    value={unit}>{unit}</option>;
                                })
                            }
                        </select></td>
                <td> <select required 
                                className="form-control" 
                                value={this.state.productsList[this.state.productsList.indexOf(product)].category}
                                onChange={(e) => this.onEditCategory(e, product)}>
                            {
                                this.state.categories.map(function(cat){
                                    return <option 
                                    key={cat.name}
                                    value = {cat.name}>{cat.name}</option>;
                                })
                            }
                        </select></td>
                <td><button className='btn btn-success' onClick={(e)=>{this.submitChanges(e,product)}}>Zatwierdz</button></td>
            </tr>
        )
    }
    changeEditValue(product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        if(products[index].editValue === true){
            products[index].editValue = false;
        }
        else if(products[index].editValue === false){
            products[index].editValue = true;
        }
        this.setState({productsList : products})
    }
    onChangeUnit(e,product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].unit = e.target.value
        this.setState({productsList : products})

    }
    onEditCategory(e, product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].category = e.target.value
        this.setState({productsList : products})
        
    } 
    onNameChange(e,product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].name = e.target.value
        this.setState({productsList : products})
    }
    onDescriptionChange(e,product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].description = e.target.value
        this.setState({productsList : products})

    }
    onPriceChange(e,product){
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].price = e.target.value
        this.setState({productsList : products})
    }
    async submitChanges(e, product){
        //console.log(product)
        e.preventDefault();
        await axios({
        method:"put",
        url:`http://localhost:5000/product/`,
        params:{
            id: product.id
        },
        data: {
        name: product.name,
        description :product.description,
        price : product.price,
        unit: product.unit,
        category: product.category
        }})
        .then(()=>{
        alert(`Produkt został pomyslnie edytowany`);
        //window.location.assign('/product/edit');
        let products = this.state.productsList;
        let index = products.indexOf(product);
        products[index].editValue = false;
        this.setState({productsList : products})
    })

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
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.productsList.map((product)=>
                        (
                            (product.name.toLowerCase().includes(this.state.filteredName.toLowerCase()) && this.state.filteredName !== '') 
                            ||
                            ((product.category === this.state.filteredCategory) && this.state.filteredName === '')
                            ||
                            ((this.state.filteredName === '') && (this.state.filteredCategory===''))
                        )
                        ? (product.editValue) ?  this.activeEdit(product) : this.inactiveEdit(product)
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