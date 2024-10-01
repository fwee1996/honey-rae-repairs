export const getCustomerByUserId=(userId)=>{
    return fetch (`http://localhost:8088/customers?userId=${userId}&_expand=user`).then((res)=>res.json())
}
//check example if userId=2: http://localhost:8088/customers?userId=2&_expand=user



