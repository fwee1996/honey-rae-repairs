import { useNavigate } from "react-router-dom"

export const FilterBar = ({setShowEmergencyOnly, setSearchTerm, currentUser, setShowOpenOnly}) => {
    {/* when user click ticket we want to nav to diff url . 
  Then go to filter-btn btn-primary below add onClick that navigates to "/tickets/create". then go create a route in CustViews.jsx*/}
    const navigate= useNavigate() 
    
    return (<div className="filter-bar">
      {currentUser.isStaff ?<><button className="filter-btn btn-primary" onClick={()=>{setShowEmergencyOnly(true)}}>Emergency</button>
        <button className="filter-btn btn-info" onClick={()=>{setShowEmergencyOnly(false)}}>Show All</button>
        <input type="text" placeholder="Search Tickets" className="ticket-search" onChange={(event)=>{setSearchTerm(event.target.value)}}/>
        {/*when user type in a value, capture the value and use it to filter
        so when i type hello in search bar, App:TicketList --- Hooks:state: "hello" in devtools*/ } </>:
         <><button className="filter-btn btn-primary" onClick={()=>{navigate("/tickets/create")}}>Create Ticket</button>
         <button className="filter-btn btn-info" onClick={()=>{setShowOpenOnly(true)}}>Open Tickets</button>
         <button className="filter-btn btn-secondary" onClick={()=>{setShowOpenOnly(false)}}>All My Tickets</button>
         </>}
        

      </div>)
    }

//make sure go to TicketList put currentUser as a prop too!
//those button  open, all my tickets work like show emergency vs show all toggle--go to TicketList to start making buttons work!