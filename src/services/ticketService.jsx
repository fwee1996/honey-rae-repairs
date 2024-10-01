export const getAllTickets=()=>{
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets
    `).then((res)=>res.json())//get a response, make it readable //embed part get info on employeeTickets
}
//so can get employee id, but you want employee name it is in user object /table! user id in employee table
//so look at service ticket , then loom at employee id and compare 
//EMBED is if the thing you want is FK on something else, expand is if you have foreign key for something to somewhere else
//employee has userid for fk:expand to get user object

//claim ticket fn for that you need employee ticket thats what you put in ()
export const assignTicket=(employeeTicket)=>{
    return fetch (`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type":" application/json",
        },
        body: JSON.stringify(employeeTicket),
        })
}
//update ticket
export const updateTicket=(ticket)=>{
    return fetch (`http://localhost:8088/serviceTickets/${ticket.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
    })
}

//DELETE A TICKET FN: for cust view so they can delete 
export const deleteTicket=(ticketId)=>{
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`,{ //note ticketId instead of ticket.id
    method: "DELETE",
})
}

//create ticket fn
export const createTicket=(ticket)=>{
    return fetch (`http://localhost:8088/serviceTickets`, {
        method: "POST",
        headers: {
            "Content-Type":" application/json",
        },
        body: JSON.stringify(ticket),
        })
}

