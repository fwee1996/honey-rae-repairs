import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerNav } from "../components/nav/CustomerNav"
import { Welcome } from "../components/welcome/Welcome"
import { TicketList } from "../components/tickets/TicketList"
import { TicketForm } from "../components/forms/TicketForm"

//look at cust view on wireframe, in homepage want welcome msg and logout
//login as a cust to see if correct things are showing up
//so welcome msg and navbar must load on homepage so create a new navbar for 
//cus bcs in the future can add links/buttons easily instead of using employee navBar via ternary statement
export const CustomerViews=({currentUser})=>{
    return (<Routes>
<Route path="/" element={
<>
<CustomerNav/>
<Outlet/>
</>
}>
<Route index element={<Welcome/>}/>
{/* coming here from CustNav create ticket route path for customer view ticket button on navbar*/}

<Route path ="tickets" >

<Route index element={<TicketList currentUser={currentUser}/>}></Route>    
{/* now we want TicketList to pass currentUser but CustomerViews dont have access to currentUser, 
but AppView does! App view defines currentUser state and set the current user state! 
In AppView make sure to pass currentUser to CustView */}
{/* pass currentUser prop in CustView() and put in props in Route path= "tickets" */}
<Route path="create" element={<TicketForm currentUser={currentUser}/>}/>
{/* problem: create is child route tickets is parent route so tickets will render with every single child route */}
{/* want ticketList to render every time user goes to just /tickets not when tickets/create*/}
{/* so dont want element or TicketList in element above, instead create an index route that is default child route */}
</Route>

</Route>
    </Routes>)
}

