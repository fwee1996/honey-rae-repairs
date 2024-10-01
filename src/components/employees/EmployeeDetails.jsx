import { useEffect, useState } from "react"
import { getEmployeeByUserId, getEmployeeTicketsByUserId } from "../../services/employeeService"
import { useParams } from "react-router-dom"
import "./Employees.css"

export const EmployeeDetails= ()=>{
    const [employee, setEmployee]=useState({})

    //The useParams hook gives us a way to retrieve that information within the component that corresponds to that URL. 
   // Set up a route param to capture the userId of the employee.
    const {employeeId}=useParams()

    const [employeeTickets, setEmployeeTickets] = useState([]);

    useEffect(()=>{
        getEmployeeByUserId(employeeId).then((data)=>{
            const employeeObj=data[0]
            console.log(employeeObj)
            setEmployee(employeeObj)
        })
    },[employeeId])

    useEffect(()=>{ //added a new state variable employeeTickets to store the tickets assigned to the employee.
        getEmployeeTicketsByUserId(employeeId)//We fetched the employee's tickets using the 
        //getEmployeeTicketsByUserId function and updated the employeeTickets state accordingly.
        .then(data => {
            setEmployeeTickets(data);//changes here
        })
    },[employeeId])

return (<section className="employee">
    <header className="employee-header">{employee?.user?.fullName}</header>
    <div>
    <span className="employee-info">Email : </span>
    {employee?.user?.email}
    </div>
    <div>
    <span className="employee-info">Specialty : </span>
    {employee?.specialty}
    </div>
    <div>
    <span className="employee-info">Rate : </span>
    {employee?.rate}
    </div>
    <div>
    <span className="employee-info">Currently working on  {employeeTickets?.length}  tickets</span>
    </div>
</section>)
}

//display the number of tickets the employee is currently working on using employeeTickets.length.











//wherever routes is
// <Route path=":projectId" element={<ProjectDetails />} /> {/* This will render at /projects/[some-id] */}
//In order to access that id in the ProjectDetails component, we utilize the useParams() hook from react-router-dom.
// export const ProjectDetails = () => {
//     const { projectId } = useParams()
//     return (
//       <div>Project #{projectId}</div>
//     )
//   }
// Let's say the the user navigates to www.someapp.com/projects/2.
// In the Route above, we defined our route parameter as projectId. When the user visits this path, ProjectDetails component is rendered. Within this component, we use the useParams hook, which returns an object containing the projectId as a key with the value 3. By deconstructing this object, we retrieve the projectId and display it within a div. As a result, the user sees "Project #3" displayed on the page.
// More on Route Params
// We can place a route parameter anywhere in the url, as long as it's prefaced with a :
// <Route path="projects"> 
//   <Route index element={<Projects />} />
//   <Route path=":projectId" element={<ProjectDetails />} /> 
//   <Route path="edit/:projectId" element={<EditProject />} />
// </Route>
// In the EditProject route above, we defined another route parameter as projectId just like we did in the ProjectDetails route. When the url of the application is /projects/edit/4, the EditProject component will render. In the EditProject component, we can once again access the route parameter via the useParams hook.
// export const EditProject = () => {
//   const { projectId } = useParams()
//   return (
//     <div>Project #{projectId}</div>
//   )
// }
