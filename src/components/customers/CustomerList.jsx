import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/User"
import { Link } from "react-router-dom"
import "./Customers.css"

export const CustomerList =()=>{
    //get those users in store them in state:
    // Destructuring assignment used here:
    // useState is a hook that returns an array with two elements: 
    //the current state value (customers) and a function (setCustomers) to update it.
    // Here, useState is used to initialize the 'customers' state to an empty array.
    const[customers,setCustomers]= useState([])
    //on initial render:
    // useEffect is a hook used to perform side effects in function components.
    // Here, it's used to fetch non-staff users when the component mounts.
    // The empty dependency array [] ensures this effect runs only once, on the initial render.
    useEffect (()=>{
        // Fetching non-staff users and updating the 'customers' state using setCustomers.
        getNonStaffUsers().then((customerArray)=>{
            setCustomers(customerArray)
        })
    },[])

//----at this point stop to test on webpage rmbr to go to App.jsx comment out 
// <TicketList/> and instead have <CustomerList/>


         return (
          <div className="customers">
            {customers.map((customerObj)=>{
                return (
                <Link to = {`/customers/${customerObj.id}`} key={customerObj.id}> 
                {/**${customerObj.id} id of cust they click on, this is also userId */}
                <User user={customerObj} />
                </Link>
                )
            })}
          </div>
      
)
  
}

//wrapping return in link so that when you click customers you can click each customer 
//and it will take you to individual cutomer info page
// eg:http://localhost:5173/customers/1
//<Link to = {`/customers/${customerObj.id}`}>
                //<User user={customerObj} />
                //</Link>

//you use the user id like 1,2,3 to capture the display details of that user and the customer of that user