import { useState, useEffect } from "react"
import { getAllEmployees } from "../../services/employeeService"
import { User } from "../../users/User"
import "./Employees.css"
import { Link } from "react-router-dom"

export const EmployeeList =()=>{
    //get employees
    //Create a state variable to store the employees
    const [employees,setEmployees]=useState([])

    //Get the employees on the initial render
    useEffect(()=>{
        getAllEmployees().then(employeesArray=>{
            setEmployees(employeesArray)
        })
    },[])

    //Map the employees in the JSX
    //For each employee, render the User component and pass the employee to the user prop
    return (
    <div className="employees">
    {employees.map((employeeObj)=>{
        return (
        <Link to = {`/employees/${employeeObj.id}`} key={employeeObj.id}>
        <User user = {employeeObj.user}/> 
        {/* After Barry and Sarah fixed the userid employee id mess, .
        user above was added to get user component of employee to populate info on card when you click Employee button */}
        </Link>
        )
    })}
    </div>
    )
}

//Finally, go to App.jsx: Render the EmployeeList component in the App component