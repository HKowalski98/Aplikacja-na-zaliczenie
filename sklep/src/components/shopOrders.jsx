import React , {Component } from 'react';
import axios from 'axios';


export default class shopOrders extends Component{
    constructor(props){
        super(props);

        this.state={
            orders:[],
            possibleStatus:[],
            selectedStatus:''
        }

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.approveOrder = this.approveOrder.bind(this);
        this.completeOrder = this.completeOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.renderOrders = this.renderOrders.bind(this);
    }
   async componentWillMount(){
        let orders = []
        let possibleStatus = []
        await axios.get("http://localhost:5000/order/")
        .then(response => {
            if(response.data.length > 0){
                response.data.forEach(order=> {
                    //console.log(order)
                    orders.push(order);


                });
            } 
        });

        await axios.get("http://localhost:5000/status/")
        .then(response => {
            if(response.data.length > 0){
                response.data.forEach(status=> {
                   // console.log(status)
                    possibleStatus.push(status);


                });
                let status = { 
                    name: '',
                    lvl: 1
                }
                possibleStatus.unshift(status)
            } 
        });
            this.setState({orders, possibleStatus})
    }
   
    onChangeStatus(e){
        this.setState({selectedStatus : e.target.value})
    }
    async approveOrder(e, order){
        await axios({
            method:"put",
            url:`http://localhost:5000/order/`,
            params:{
                id: order._id,
                status: 'APPROVED'
            },
            data: {
            username: order.username,
            email: order.email,
            phoneNumber : order.phoneNumber,
            order: order.order
            }})
            .then(()=>{
            alert(`Stan zamówienia został zmieniony`);
            window.location.assign('/shopOrders');
            let orders = this.state.orders;
            let index = orders.indexOf(order);
            orders[index].orderStatus = 'APPROVED';
            this.setState({orders})
        })
    } 
    async completeOrder(e, order){
        await axios({
            method:"put",
            url:`http://localhost:5000/order/`,
            params:{
                id: order._id,
                status: 'COMPLETED'
            },
            data: {
            username: order.username,
            email: order.email,
            phoneNumber : order.phoneNumber,
            order: order.order
            }})
            .then(()=>{
            alert(`Stan zamówienia został zmieniony`);
            window.location.assign('/shopOrders');
            let orders = this.state.orders;
            let index = orders.indexOf(order);
            orders[index].orderStatus = 'COMPLETED';
            this.setState({orders})
        })
    }
    async cancelOrder(e, order){
        await axios({
            method:"put",
            url:`http://localhost:5000/order/`,
            params:{
                id: order._id,
                status: 'CANCELLED'
            },
            data: {
            username: order.username,
            email: order.email,
            phoneNumber : order.phoneNumber,
            order: order.order
            }})
            .then(()=>{
            alert(`Stan zamówienia został zmieniony`);
            window.location.assign('/shopOrders');
            let orders = this.state.orders;
            let index = orders.indexOf(order);
            orders[index].orderStatus = 'CANCELLED';
            this.setState({orders})
        })
    }
    renderOrders(){
        return(
            
            <table className='table'>
            <thead>
                <th>Nazwa uzytkownika</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Status</th>
                <th>Data zatwierdzenia</th>
                <th>Zamowienie</th>
                <th></th>
            </thead>
            <tbody>
                {this.state.orders.map((order) =>  
                (
                (order.orderStatus === this.state.selectedStatus) 
                || 
                (this.state.selectedStatus === '')
                )
                ?
                <tr key={order._id}>
                        <td>{order.username}</td>
                        <td>{order.email}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.approvalDate}</td>
                        <td>{this.renderProducts(order)}</td>
                        <td>
                            {order.orderStatus === 'NOT APPROVED' ?
                            <button className='btn btn-success' onClick={(e) => this.approveOrder(e,order)}>APPROVE</button>
                            :
                            ((order.orderStatus === 'CANCELLED') || (order.orderStatus ==='COMPLETED')) ? 
                            <div></div> :
                            <div>
                                <button className='btn btn-success' style={{marginRight:5}} onClick={(e) => this.completeOrder(e,order)}>COMPLETE</button>
                                <button className='btn btn-danger' style={{marginLeft:5}} onClick={(e) => this.cancelOrder(e,order)}>CANCEL</button> 
                            </div>
                            }   
                        </td>
                </tr>
                :
                <tr></tr>)} 
            </tbody>
        </table>  
        
        )
    }
    renderProducts(order){
        let keys = [];
        let values = [];
        let products = [];
        
        keys = Object.keys(order.order);
        values = Object.values(order.order);
        
        for( let i = 0; i < keys.length; i++){
            let product ={
                id : keys[i],
                quantity: values[i]
            }
            products.push(product);
        }

        return(
            <table>
                <thead>
                    <th>ID</th>
                    <th>Ilość</th>
                </thead>
                <tbody>
                {products.map((product)=>
                    <tr>
                        <td>{product.id}:</td>
                        <td>{product.quantity}</td>
                    </tr>)}
                </tbody>
            </table>
            
        )


        
    }

    render(){
        return( 
            this.state.orders !== null ? 
                <div>
                <label style={{marginRight:10,marginLeft:10}}>Status: </label>
                <select value={this.state.selectedStatus} onChange={this.onChangeStatus}
                >
                    {this.state.possibleStatus.map((status)=>
                    <option value={status.name} key={status.id}>{status.name}</option>)}
                </select>
                {this.renderOrders()}
                </div>
                :
                <div>Brak zamowien</div>
        )
       
    }
    
}