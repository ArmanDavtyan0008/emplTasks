import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

function EmployeePage() {
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`https://rocky-temple-83495.herokuapp.com/employees/${id}`)
            .then((response) => response.json())
            .then((data) => setEmployee(data))
            .catch((error) => console.log(error));

        fetch(`https://rocky-temple-83495.herokuapp.com/tasks?employeeId=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    if (!employee) {
        return <div className="text-center ">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

    return (
        <div className={"container"}>
            <h1>Employee Page</h1>
            <h3>Employee Information</h3>
            <p>Name: {employee.name}</p>
            <p>Surname: {employee.surname}</p>
            <p>Position: {employee.position}</p>
            <p>Email: {employee.email}</p>

            <h2>Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>Task Name: {task.name}</p>
                    <p>Description: {task.description}</p>
                    <p>Start Date: {task.startDate}</p>
                    <p>End Date: {task.endDate}</p>
                </div>
            ))}
            <Link to={'/employee'}>
                <button className={"btn btn-outline-info"} type="submit">Employees List</button>
            </Link>
            <Link to={'/tasks'}>
                <button className={"btn btn-outline-warning"}>Create Employees Tasks</button>
            </Link>
        </div>

    );
}

export default EmployeePage;