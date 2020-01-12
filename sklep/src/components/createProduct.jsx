import React , {Component } from 'react';
import axios from 'axios';


export default class CreateProduct extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);


        this.state={
            name:"",
            description:"",
            price:0,
            unit:"",
            category:"",
            categories:[],
            units:[]
        }
    };

    onChangeName(e){
        this.setState({name: e.target.value});
        
    } 
    onChangeDescription(e){
        this.setState({description: e.target.value});
    } 
    onChangePrice(e){
        this.setState({price: e.target.value});
    } 
    onChangeUnit(e){
        console.log(e.target.value)
        this.setState({unit: e.target.value});
        console.log(this.state.unit)
    } 
    onChangeCategory(e){
        this.setState({category: e.target.value});
    } 
    onSubmit(e){
       e.preventDefault();

        let product = {
            name:this.state.name,
            description:this.state.description,
            price:this.state.price,
            unit:this.state.unit,
            category:this.state.category
        }
        //console.log(product);

        axios.post("http://localhost:5000/product/", product)
        

        //window.location = "/product/create";
        
    }
    async componentDidMount(){
       let cats =[]
        this.setState({
            units:["KG", "SZT", "L"]
        })
        this.setState({unit : "KG"});
        this.setState({category : this.state.categories[0]});

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
        this.setState({categories: cats})
    }
    /*TODO
    Przy kazdym zaladowaniu komponentu powinny pobierac
    sie kategorie ktore pozniej beda na rozwijanej liscie,
    zeby kategorii nie trzeba bylo wpisywac z palucha
    */    
    render(){
        return(
            <div> 
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label >Name</label>
                        <input  className="form-control" 
                                placeholder="Name" 
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <textarea   className="form-control"  
                                    placeholder="Description" 
                                    onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input  className="form-control"     
                                placeholder="Price" 
                                onChange={this.onChangePrice}/>
                    </div>
                    <div className="form-group">
                        <label >Unit</label>
                        <select required className="form-control" 
                                value={this.state.unit}
                                onChange={this.onChangeUnit}
                               >
                            {
                                this.state.units.map(function(unit){
                                    return <option 
                                    key={unit}
                                    value={unit}>{unit}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Category</label>
                        <select required 
                                className="form-control" 
                                value={this.state.category}
                                onChange={this.onChangeCategory}>
                            {
                                this.state.categories.map(function(cat){
                                    return <option 
                                    key={cat.name}
                                    value = {cat.name}>{cat.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-dark">DODAJ</button>
               </form>
            </div>
        )
    }
}