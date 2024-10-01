export const getAllEmployees=()=>{
    return fetch(`http://localhost:8088/employees?_expand=user`).then ((res)=>res.json())}

export const getEmployeeByUserId=(userId)=>{
    return fetch(`http://localhost:8088/employees?_expand=user&userId=${userId}`).then ((res)=>res.json())}

    //this is Sarah's  change that fixed it: ?id=${userId} id instead of userId!!!!!!

    //http://localhost:8088/employees?userId_expand=user

//http://localhost:8088/employeeTickets?employeeId=2&_expand=employee
//http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets

//val's:http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${userId}

export const getEmployeeTicketsByUserId=(userId)=>{
    return fetch(`http://localhost:8088/employeeTickets?employeeId=${userId}&_expand=employee`).then ((res)=>res.json())}

    export const updateEmployee=(employee)=>{
    return fetch (`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":" application/json",
        },
        body: JSON.stringify(employee),
        })
}







