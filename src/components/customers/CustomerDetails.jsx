import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerByUserId } from "../../services/customerService"
import "./Customers.css"

export const CustomerDetails =() =>{
const [customer,setCustomer]=useState({})

//customers/3 --value:3
//path="/customers/:customerId" --key:customerId
const {customerId }=useParams()//return to us {customerId:3} //useParam return obj with key value pair
// customerId must match naming convention in path in Route in App.jsx :/customerId
//so above say {customerId :3}--want to fetch that customer--step1: useState
//Deconstruction: const {customerId }
//rmbr this customerId is actually userId 

useEffect(()=>{
    //get cust by user id pass in cust id you get from url via useparams once you get cust obj back set it with cust obj
    getCustomerByUserId(customerId).then((data)=>{
    const customerObj=data[0]//this must be done bcs get returns an array with 1 cust object so that is at index 0
        setCustomer(customerObj)
})
},[customerId])

//()=>{},[] callback fn and dependency array
//empty dependency means only initial render
return (<section className="customer">
    <header className="customer-header">{customer.user?.fullName}</header>
    <div>
        <span className="customer-info">Email : </span>
        {customer.user?.email}
    </div>
    <div>
        <span className="customer-info">Address : </span>
        {customer.address}
    </div>
    <div>
        <span className="customer-info">Phone Number : </span>
        {customer.phoneNumber}
    </div>
    </section>)
    
    //<div>Customer #{customerId}</div>--dont want anymore instead <section>s above

}
//then go back to App.jsx to ask to render

//next want to get customer w id =2:
//http://localhost:8088/customers?userId=2 ---note that returns an array with a single object thats customer with id=2

//http://localhost:8088/customers?userId=2&_expand=user--expand to get full name email etc

