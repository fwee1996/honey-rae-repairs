//Chapter 14:
//you have routes for employee view now need route for customer 

import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { CustomerList } from "../components/customers/CustomerList"
import { CustomerDetails } from "../components/customers/CustomerDetails"
import { EmployeeList } from "../components/employees/EmployeeList"
import { EmployeeDetails } from "../components/employees/EmployeeDetails"
import { EmployeeForm } from "../components/forms/EmployeeEdit"

// applicationView handles that to show either E view or Cust view depending on who is logged in
export const EmployeeViews=({currentUser})=>{ //need currentUser to know what to show, will render AppView if current user is staff if not render cust view
    return(
    <Routes>
        <Route path="/" element={
          <>
          <EmployeeNav />
          <Outlet/>
          </>
        } 
          >
          <Route index element = { <Welcome />}/>
          <Route path="tickets" element={<TicketList currentUser={currentUser}/>} />
         {/* above: passing currentUser to TicketList so go there put in prop export...({currentUser})*/}
      {/* also in TicketLIst write key and value pair :
      return(
                  <Ticket ticket={ticketObj} name="Joe" currentUser={currentUser} key={ticketObj.id}/> 
              ) */}
      
              {/*  put currentUser in Ticket.jsx: export const Ticket =( {ticket, currentUser} )=>{  */}
          <Route path="customers" >
      <Route index element={<CustomerList/>}/> 
      <Route path=":customerId" element={<CustomerDetails/>}/> {/*whenever user path matches this "/customers/:customerId"take whatevers on the url that number 1,2,3 
      and store it in an object where **key is customerId and value is 1,2,3 whatever number is in url then u render cust details component*/}
          {/**and at path above, you render  CustomerDetails, get access to key value pair via useParams 
           * in CustomerDetails.jsx that can get customerId bcs returns object with key custId and value 1,2,3*/}
          </Route>
      
          <Route path="employees" >
          <Route index element={<EmployeeList/>}/>
          <Route path=":employeeId" element={<EmployeeDetails/>}/>
          </Route>
      
          <Route path="profile" element={<EmployeeForm currentUser={currentUser}/>}/>  
          {/* path means when at /profile, check webpage. So want to see current value use user profile to display in the form */}
          {/* fetch user profile so that specialty and rate input will have current values in the edit form that you can change*/}
      {/* so need current user(AppView-> Employee Form) to use id to get employee by user id
      ----use employeeServices fn that gets employee by id! Then go back to EmEdit */}
          </Route>
        </Routes>
        )}