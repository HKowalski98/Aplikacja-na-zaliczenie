import React , {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


//import axios from 'axios';


export default class OrderView extends Component{
    constructor(props){
        super(props);

        this.state={
            order:this.props.order,
            orderValue:[],
            sum: 0,
            confirm: false,
            username:'',
            email:'',
            phone:'',
            emailValidate: '',
            phoneValidate: ''
        }

        this.handleChangingOrder = this.handleChangingOrder.bind(this);
        this.renderOrderView = this.renderOrderView.bind(this);
        this.renderText = this.renderText.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.confirmOrderForm = this.confirmOrderForm.bind(this);
        this.confirmForm = this.confirmForm.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.orderUsername = this.orderUsername.bind(this);
        this.orderEmail = this.orderEmail.bind(this);
        this.orderPhone = this.orderPhone.bind(this);
        this.dupa = this.dupa.bind(this);

       
        
}

componentDidMount(){
    //console.log(this.state.order);
    let order = this.state.order
    let summary = 0 
    order.forEach((prod)=>{
        summary += (parseFloat(prod.quantity) * prod.price)
    })
    //console.log(summary)
    this.setState({sum : summary});
}




componentWillUnmount(){
    this.props.sentOrder(this.state.order)
}

handleChangingOrder(product){
    let order  = this.state.order
    let index = order.indexOf(product);
    order.splice(index,1);
    this.setState({order})
    //console.log(this.state.order)
}

quantityChange(e,product){
    //console.log(parseFloat(e.target.value))
    let list = this.state.order;
    let index = list.indexOf(product);
    //console.log(list[index])
    list[index].quantity =  parseFloat(e.target.value);
    //console.log(list[index])
    let summary = 0;
    list.forEach((prod)=>{
        summary += (parseFloat(prod.quantity) * prod.price)
    })
    //console.log(summary)
    this.setState({sum : summary});
    
   
    
} 
confirmForm(){
    this.setState({confirm : true})

}
orderUsername(e){
    this.setState({username : e.target.value})
}
orderEmail(e){
    if(!(/[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,}/.test(e.target.value))){
        this.setState({emailValidate : "Podano nieprawidłowy adres e-mail!"})
    }
    else{
        this.setState({emailValidate : ''})
    }
    this.setState({email : e.target.value})

}
orderPhone(e){
    if((e.target.value.length <= 11)){
        if(e.target.value.length < this.state.phone.length){
        this.setState({phone : e.target.value})
        }
        else{
            if((e.target.value.length === 3) || (e.target.value.length===7)){
            e.target.value+='-';
            this.setState({phone : e.target.value})
            }
            else{ this.setState({phone : e.target.value})}}}
    else {
        this.setState({phoneValidate : "Numer telefonu musi składać się z nie więcej niz 9 CYFR"})
    }
}
confirmOrderForm(){
    return(
        <div>
        <div style={{marginBottom:10}}>Podaj dane do zamowienia: </div>
       <form  onSubmit={this.confirmOrder}>
            <div className="form-group">
                <label style={{marginRight:10}}>Nazwa uytkownika: </label>
                <input type="text" placeholder="Nazwa uzytkownika" onChange={this.orderUsername} value={this.state.username}/>
            </div>
            <div className="form-group">
                <label style={{marginRight:10}}>E-mail: </label>
                <input type="text" placeholder="nazwa@domena" onChange={this.orderEmail} value={this.state.email}/>
                <label style={{color:'red', marginLeft:10}}>{this.state.emailValidate}</label>
            </div>
            <div className="form-group">
                <label style={{marginRight:10}}>Telefon: </label>
                <input type="text" placeholder="@@@-@@@-@@@" onChange={this.orderPhone} value={this.state.phone}/>
                <label style={{color:'red', marginLeft:10}}>{this.state.phoneValidate}</label>
            </div>
            <div style={{marginBottom:10}}>{`Kwota do zapłaty to ${!isNaN(this.state.sum) ? this.state.sum : 0} zł`}</div>
           <button type="submit" active="false">Zatwierdź</button>
       </form>
       </div>
    )
}
confirmOrder(e){
e.preventDefault()
//console.log(this.state.username);
//console.log(this.state.email);
//console.log(this.state.phone);
let orderList = this.state.order;
let finalOrderList =[]
orderList.forEach((prod)=>{
    let tmpOrder = []
    tmpOrder.push(prod.id)
    tmpOrder.push(prod.quantity)
    finalOrderList.push(tmpOrder);
    
})
if((this.state.email !== '') && (this.state.phone !== '')){
    if(!(/[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,}/.test(this.state.email))){
    alert("Podano nieprawidłowy email!")
    } 
    else if(!(/\d{3}-\d{3}-\d{3}/.test(this.state.phone))){
    alert("Numer telefonu moze skladac sie tylko z cyfr!")
    }
    else{
    axios.post("http://localhost:5000/order/", {
    "username": this.state.username,
    "email": this.state.email,
    "phoneNumber": this.state.phone,
    "order": finalOrderList}).then(()=>{
        alert("Zamowienie zostało zlozone pomyślnie!!!");
        window.location.assign('/');
    })
    }
}
else { 
    alert('Adres email i/lub telefon nie moga byc puste!')
}
}


dupa(){
    console.log(this.state.order);
    console.log(this.state.sum);
}

renderOrderView(){
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Jednostka</th>
                        <th>Ilość</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.order.map((product) => 
                    <tr key={product.id} >
                        <td>{product.name}</td>
                        <td>{product.price} zł</td>
                        <td>{product.unit}</td>
                        <td><input type='number' value={product.quantity} onChange ={(e) => this.quantityChange(e, product)}/></td>
                        <td><button onClick = {()=>{this.handleChangingOrder(product)}} >Usuń</button></td>
                    </tr>)}
                <tr>
                    <td>Suma</td>
                    <td>{!isNaN(this.state.sum) ? this.state.sum : 0} zł</td>
                </tr>
                </tbody>
            </table>
            <div>  
                {this.state.confirm ? 
                this.confirmOrderForm()
                :<button onClick={this.confirmForm}>Zamow</button>}</div>
            
        </div>
        );
}

renderText(){
return(
    <div>
        <div style={{marginBottom:30}}>Twoj koszyk jest pusty ;(</div>
        <Link type='button' to='/product' >Wróć do sklepu</Link>
    </div>
)
}


render(){
    return(
        <div>
            {(this.state.order.length === 0)?
            this.renderText()
            :
            this.renderOrderView() 
            }
        </div>
    )
}



}