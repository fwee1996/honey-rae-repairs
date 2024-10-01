//copy pasted from App.jsx to protect only allow logged in user to access these routes 
// import { Route,Routes } from "react-router-dom"
// import { NavBar } from "../components/nav/EmployeeNav"
// import { Welcome } from "../components/welcome/Welcome"
// import { Outlet } from "react-router-dom"
// import { EmployeeDetails } from "../components/employees/EmployeeDetails"
// import { EmployeeList } from "../components/employees/EmployeeList"
// import { TicketList } from "../components/tickets/TicketList"
// import { CustomerList } from "../components/customers/CustomerList"
// import { CustomerDetails } from "../components/customers/CustomerDetails"
import { useEffect, useState } from "react"
//import { EmployeeForm } from "../components/forms/EmployeeEdit"
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"


export const ApplicationViews = () => {

  //set new state  for logged in user
  const[currentUser, setCurrentUser]=useState({}) //{} rep of current user //so now if any route components need access to currentUser can be passed down as a prop to routes

  //on intial render want to get current user from local storage and store in [currentUser] obj

useEffect(()=>{
  const localHoneyUser = localStorage.getItem("honey_user")
  const honeyUserObject=JSON.parse(localHoneyUser) 

  setCurrentUser(honeyUserObject)
},[])

  return currentUser.isStaff? <EmployeeViews currentUser={currentUser}/>:<CustomerViews currentUser={currentUser}/>
    //ternary to see if staff then show employee view
    //<></>
  
}


// Prop Drilling
// In this chapter we defined a new state variable to hold the logged in user. 
//We defined this state in the ApplicationViews component so that we can pass the current user down to any component that needs it. 
//We encountered this when writing the logic for the Claim and Close buttons for each ticket. 
//We needed to know the id and isStaff value of the user when deciding which button, if any, the user should see on a ticket.
// In order to provide the currentUser state to the Ticket component, we has to pass it down from ApplicationViews to TicketList and from TicketList to Ticket. 
//Passing props down multiple levels like this is called prop drilling. It can be messy and hard to follow and there are advanced, 
//better ways around this. But it's likely, if you're working on a legacy React application, that you will run into this on the job.