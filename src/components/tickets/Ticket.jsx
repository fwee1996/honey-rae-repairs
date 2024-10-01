import { useState, useEffect } from "react"
import { getAllEmployees } from "../../services/employeeService"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketService"

export const Ticket =( {ticket, currentUser, getAndSetTickets} )=>{  //put {ticket} prop in () 
  //put getAndSetTickets then go down to handleClaim and insert in there now you see close button after press claim
    const [employees, setEmployees]=useState([])
    const [assignedEmployee, setAssignedEmployee]=useState({}) //empty object

    //right now each ticket is object with employee,tickets,property--see Compiler tab in DevTools
    //loop through all employee compare id to tickets employeeId \
    //if employeeTickets array is filled or not zero--ie. employee is assigned to the ticket


useEffect(()=>{ //only run on initial render
    getAllEmployees().then((employeesArray)=>{
      setEmployees(employeesArray) 

    } )
  },[])//

  useEffect(()=>{ 
    
    const foundEmployee= employees.find(employee=>employee.id===ticket.employeeTickets[0]?.employeeId)
  setAssignedEmployee(foundEmployee)

}  ,[employees, ticket])//so if value of ticket or employees changes run useEffect again

//get current Employee
const handleClaim = () => { //we want to create an employee ticket if you see in ERD employeeTicket has EmployeeId and ServiceTicketId
  const currentEmployee = employees.find((employee)=>employee.userId ===currentUser.id)
  const newEmployeeTicket = {
//created new const newEmployeeTicket object below assigned logged in employee to ticket they decide to claim
//user click , post new employee ticket relationship to database with employeeId and serviceTicketId: 
//look at ERD EmployeeTickets table so we want to store employeeId!! not userId !
    employeeId: currentEmployee.id, 
    serviceTicketId: ticket.id,
    //then refetch and set state
  }
  //go to ticketService create fn assign logged in user to ticket they claim.
  //now back from ticketService: import fn:
  assignTicket(newEmployeeTicket).then(()=>{
    //console.log("what??") -check that when press claim button it works to print
    //ok now load webpage,
    //so now you want 'validation' to user to see Close button after press Claim
    //How? get latest state of ticket (in the database) so need to refetch and set state(TicketList)
    //run useEffect --getAllTickets and setAllTickets fn in TIcketList over again
    getAndSetTickets()//now we can see close button after we clisk claim because we change the state using TicketList
  })
}


const handleClose = () =>{
  //add date completed value to ticket
  //PUT
  const closedTicket={
    id: ticket.id,
    userId: ticket.userId,
    description: ticket.description,
    emergency: ticket.emergency,
    dateCompleted: new Date (),//set to current date
  }
  //go to TicketService to create fn to send to database
  updateTicket(closedTicket).then(()=>{ 
    getAndSetTickets()})//get new ticket with updated relationship so that when press close dont see the close button anymore
 
}

//for delete button
const handleDelete =()=>{
  deleteTicket(ticket.id).then(()=>{
    getAndSetTickets()
  } )
}

    return (<section className="ticket" key={ticket.id}>
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
              <div>
                <div className="ticket-info">assignee</div>
                <div>{assignedEmployee ? assignedEmployee.user?.fullName: "None"}</div> {/*if we find assigned employee.. otherwise this will be undefined. 
                Also rmbr initially render assignedEmployee is an empty object,
                 .user works if there is user, but cant access if no user or "undefined" so add ? before .fullName*/}
                </div>
                <div>
                <div className="ticket-info">emergency</div>
                <div>{ticket.emergency? "yes": "no"}</div>
                </div>
              <div className="btn-container">
                {/* if  logged in user is employee and theres no employee ticket associated 
                with the service ticket then a button to claim ticket should display */}
                {/* currentUser.isStaff&&!assignedEmployee? means is he staff? and is there no assigned Emploee? If so... */}
                {currentUser && currentUser.isStaff && !assignedEmployee? (<button className="btn btn-secondary" onClick={handleClaim}>Claim</button>):( "" )} 
                {/* after adding onClick need to create new employee object for employee ticket for employee ticket 
                bcs we wanna post employee ticket relationship. Also need to get current employee by employee id from user. 
                then post to database you dont want to rite that all in here above {} so instead define fn handle claim and write fn above*/}

                {/*  if logged in user is assigned to ticket and theres no date completed then a button to close ticke should display*/}
                 {/*but who is current user? Appview has current  user state see ApplicationVIews fn  you can see use state and use effect handle this */}
             {/* good news is you have assignedEmployee if no assigned -undefined */}
             {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? <button className="btn btn-warning" onClick={handleClose}>Close</button>:""}
              
              {/* For delete button for cust view. Alt : {!currentUser.isStaff && (<button className="btn btn-warning">Delete</button>)}*/}
              {/* means if !currentUser.isStaff then do () dont need else part it'll just do nothing*/}
              {!currentUser.isStaff ? (<button className="btn btn-warning" onClick={handleDelete}>Delete</button>):""}
              </div>
            </footer>
          </section>
        )
}

//change is "ticket" inside () in line 1 : export const Ticket =(ticket)=>{
//inside () is the props that has key value pair defined in TicketLIst.jsx
//  because prop is declared in TicketList.jsx:
//<Ticket ticket={ticketObj}/> :pass a prop "Ticket" create key value pair  "ticket" is key , "ticketObj" is value

//component receives prop object create key value pair on props object for that component


//Prop drilling current user from Application view to ticketList to ticket