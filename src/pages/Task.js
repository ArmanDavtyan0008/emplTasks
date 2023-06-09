
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch tasks data
        fetch("https://rocky-temple-83495.herokuapp.com/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.log("Error fetching tasks data: ", error));

        // Fetch employees data
        fetch("https://rocky-temple-83495.herokuapp.com/employees")
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.log("Error fetching employees data: ", error));
    }, []);

    const handleCreateTask = (event) => {
        event.preventDefault();
        const taskData = {
            name,
            description,
            startDate,
            endDate,
            employeeId
        };

        fetch("https://rocky-temple-83495.herokuapp.com/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Task created successfully:", data);
                // Reset form
                setName("");
                setDescription("");
                setStartDate("");
                setEndDate("");
                setEmployeeId("");
                // Refresh task list
                fetchTasks();
            })
            .catch((error) => console.log("Error creating task: ", error));
    };

    const handleDeleteTask = (taskId) => {
        fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`, {
            method: "DELETE"
        })
            .then(() => {
                console.log("Task deleted successfully");
                // Refresh task list
                fetchTasks();
            })
            .catch((error) => console.log("Error deleting task: ", error));
    };

    const fetchTasks = () => {
        fetch("https://rocky-temple-83495.herokuapp.com/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.log("Error fetching tasks data: ", error));
    };

    return (
        <div className="container">
            <h1>Create Task</h1>
            <form onSubmit={handleCreateTask} className={"forms"}>
                <div className="form-group">
                    <label htmlFor="name">Task Name:</label>
                    <input
                        className={"form-control"}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div><br/>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className={"form-control"}
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    ></textarea>
                </div><br/>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        className={"input-task"}
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        required
                    />
                </div><br/>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        className={"input-task"}
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        required
                    />
                </div><br/>

                <div className="form-group">
                    <label htmlFor="employeeId">Employee:</label>
                    <select
                        className={"form-control"}
                        id="employeeId"
                        value={employeeId}
                        onChange={(event) => setEmployeeId(event.target.value)}
                        required
                    >

                        <option value="">Select an employee</option>

                        {employees.map((employee) => (
                            <option key={employee.employeeId} value={employee.employeeId}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div><br/>

                <div className={"form-group"}>
                    <button className="btn btn-primary" type="submit">Create Task</button>
                </div>

                <div>
                    <hr/>
                    <Link to={'/employee'}>
                        <button className={"btn btn-outline-info"} type="submit">Employees List</button>
                    </Link>
                    <Link to={'/employee/:id'}>
                        <button className={"btn btn-outline-warning"}>Employee Page</button>
                    </Link>
                </div>
            </form>
            <hr/>
            <h1>Tasks</h1>
            <table className={"table table-hover table-light"}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Employee ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.startDate}</td>
                        <td>{task.endDate}</td>
                        <td>{task.employeeId}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tasks;