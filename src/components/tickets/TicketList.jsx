import { useEffect, useState } from "react" //set fn "setAllTickets" keep rerendering, useEffect stops it
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { FilterBar } from "./FilterBar"

//copy paste all from App fn in App.jsx :

export const TicketList = ({currentUser}) => {
    const [allTickets, setAllTickets] = useState([]) //create state variable for ticket
    //so if you click emergency button,it shows all emergency and if press show all it shows all tickets:
    //declare a state variable to show if emergency or not "like toggle"
    //then go line80 to create button
    const [showEmergencyOnly, setShowEmergencyOnly]=useState(false) //set default to false--for employee view
   
    const [filteredTickets, setFilteredTickets]=useState([])//dont forget [] empty array as initial value
    const  [searchTerm,setSearchTerm]= useState("")//user input
    const [showOpenOnly, setShowOpenOnly]=useState(false)//for cust view buttons open tix vs all my tix


const getAndSetTickets =()=>{
  //copy paste from below useEffect content moved it up here and invoke this new fn inside useEffect instead
  getAllTickets().then((ticketsArray)=>{//get all tickets then set all tickets and pass in array "ticketsArray"
    // conditional idf user is staff set all tickets with all tix in database if not filter tix tix that current ticket.user.id=currentuser id
    if (currentUser.isStaff) {setAllTickets(ticketsArray)}else{
      const customerTickets=ticketsArray.filter((ticket)=>ticket.userId===currentUser.id)
      setAllTickets(customerTickets)}
    //below: is put into if statement above
    //setAllTickets(ticketsArray)})//once you get all the tickets you set the ticket state with all the tickets we got from database 
    //use ticket.user id bcs serviceTickets array, each serviceTicket has userId linked to the customer that made ticket
    
  })}
//getAndSet after new employee ticket has been posted so we can see that its been claim and dont see claim button anymore so go down set prop getAndSet
// return(
 // <Ticket ticket={ticketObj} name="Joe" currentUser={currentUser} getAndSetTickets={getAndSetTickets} key={ticketObj.id}/> 
//then go to Ticket put it in first line of export fn code

  //hook from react, useEffect takes 2 argument: a fn "what we want to happen" and an array "when we want it to happen"--dependency array
  //like an eventListener that tells you only run this fn {} on initial render if array is empty []
  //useEffect(()=>{},[])--only run on initial render--stop infinite loop--so when click button it says "tickets set!"
  useEffect(()=>{ //only run on initial render
    //getAllTickets().then((ticketsArray)=>{//get all tickets then set all tickets and pass in array "ticketsArray"
      //setAllTickets(ticketsArray) //set function trigger rerender! runs getAllTickets and set all --infinite loop
      //console.log("tickets set!")
      getAndSetTickets() 
  },[currentUser])//ONLY runs on initial render of component
  //last part of Chapter 15: add currentUser in dependency array otherwise when you refresh in ticket page of customer view tickets disappear
  //why?
  //when refresh all component trees rerender-initial render all the states run through whole cycle with initial state
  //appview-currentUser AppViews fn rerenders with current user empty obj then go down to return <custView> with currentUser={} empty obj 
  //so CustVIews.jsx gets that empty obj : export const CustView=({}) then go down to <Route path"tickets" <TicketList currentUser={}
  //then in TicketList useEffect getAndSetTix will send to getAndSetTickets where check {} is staff? No. SO go to else where you try to filter empty obj which become undefined
  //so customerTickets becomes an empty array
  //then in AppView useEffect setCurrentUser-state changed state rerender > CustViews.jsx rerenders again
  //but in TicketList useEffect getAndSet dont run again bcs only initial render, so add currentUser in []dependency array!
  



  //to watch when value of showEmergencyOnly changes, when it changes it filters tickets either emergency tix or all depend on true or false of set fn below line 80
  //only run when showEmergencyOnly changes --thats why put in dependency array
  useEffect(()=>{ // run on initial render and when [showEmergencyOnly] state changes and when allTickets(an initially empty array) changes
    //console.log("show emergency changed")
    if (showEmergencyOnly){
      const emergencyTickets = allTickets.filter(
        (ticket)=> ticket.emergency===true
      )
      setFilteredTickets(emergencyTickets) //now we have allTickets and filteredTIckets which is an at first an empty array that will populate with filtered tickets
    }else{
      setFilteredTickets(allTickets)//if you press show all filtered tickets will populate with all tickets
    }
  },[showEmergencyOnly, allTickets])//now when you toggle between emergency and show all button, "show emergency changed" will keep printing
  //, allTickets] part makes sure that first time page opens can see all tickets. 
  
  

//SEARCH BAR <-> state 
//Filtering tickets based on SEARCH
//when setsearchTerm changes i want to filter my tickets based on the user search input
//when does setsearchTerm changes?
useEffect(()=>{ 
  const foundTickets = allTickets.filter((ticket)=> ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
  setFilteredTickets(foundTickets) 
},[searchTerm, allTickets])//[searchTerm]:so whenever search term changes i want to filter my tickets ; this part:, allTickets] is so that if allTickets changes this runs again also


//for cust view show open only
useEffect(()=>{
  if (showOpenOnly) {
  const openTickets= allTickets.filter(ticket=>ticket.dateCompleted==="")
  setFilteredTickets(openTickets)
}else{setFilteredTickets(allTickets)}
},[showOpenOnly, allTickets])

   //wrap all tickets in <article className="tickets">
   //each ticket in <section className="ticket">
   //you'll get error each child in a list need unique KEY prop : return(<section className="ticket" key="">
   //rmbr{} bcs JS
    return (<div className="tickets-container">
      <h2>Tickets</h2>
      <FilterBar setShowEmergencyOnly={setShowEmergencyOnly} 
      setShowOpenOnly={setShowOpenOnly}//created props for cust view buttons open vs all my tix rmbr to put in FilterBar deconstruction in export fn line! 
      setSearchTerm={setSearchTerm}
      currentUser={currentUser}/> {/*<FilterBar key={fn}/> */ }
      <article className="tickets">
        {filteredTickets.map(ticketObj=>{
          return(
            <Ticket ticket={ticketObj} name="Joe" currentUser={currentUser} getAndSetTickets={getAndSetTickets} key={ticketObj.id}/> 
        )
          })}
      </article>
      </div>
  )
}

//Keep in mind: for  <Ticket ticket={ticketObj} name="Joe" key={ticketObj.id}/> :
/// destructuring prop ticket ticket is key and ticketObj is value*/ use same name "ticket" in {} in Tickets.jsx: export const Ticket =( {ticket})=>{
//key={ticket.id} is moved from Ticket.js return line because error msg each child in a list need unique key value pair //also (ticketObj) instead of (ticket) 

