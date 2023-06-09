import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

const Employee = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        position: "",
    })

    const [editID, setEditID] = useState();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const {name, surname, email, position,} = formData;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && name && surname && position) {
            await axios.post('https://rocky-temple-83495.herokuapp.com/employees', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({name: "", surname: "", email: "", position: ""});
                })
                .catch(err => console.log(err));
        }
    };

    const handleUpdate = async () => {
        if (email && name && surname && position) {
            await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${editID}`, formData)
                .then(res => {
                    setFormData({name: "", surname: "", email: "", position: ""});
                    setRefresh(refresh + 1);
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = async (deleteID) => {
        await axios.delete(`https://rocky-temple-83495.herokuapp.com/employees/${deleteID}`)
            .then(res => {
                return res
            })
            .catch(err => console.log(err));
    };

    const handleEdit = async (editIDNotState) => {
        await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${editIDNotState}`)
            .then(res => {
                setFormData(res.data)
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('https://rocky-temple-83495.herokuapp.com/employees')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, [refresh]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">

                    <h1>Employees List</h1>

                    <form onSubmit={handleSubmit} className={"forms"}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </div><br/>

                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                placeholder="Enter surname"
                                name="surname"
                                value={surname}
                                onChange={handleChange}
                            />
                        </div><br/>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div><br/>

                        <div className="form-group">
                            <label htmlFor="position">Position</label>
                            <input
                                type="text"
                                className="form-control"
                                id="position"
                                placeholder="Enter position"
                                name="position"
                                value={position}
                                onChange={handleChange}
                            />
                        </div><br/>

                        <div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="submit" className="btn btn-primary" onClick={() => handleUpdate()}>Update</button>
                        </div>
                    </form>

                    <hr/>

                    <div className={"group"}>
                        <Link to={'/tasks'}>
                            <button className={"btn btn-outline-warning"}>Create Employees Tasks</button>
                        </Link>
                    </div><br/>

                    <table className="table table-hover table-dark">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.email}</td>
                                <td>{item.position}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => {
                                        handleEdit(item.id)
                                        setEditID(item.id)
                                    }}>
                                        Edit
                                    </button>
                                    {" "}
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                    <Link to={`/employee/${item.id}`}>
                                        <button className={"btn btn-primary"}>Show Employee</button>
                                    </Link>
<br /> 
                                </td>
                            </tr>))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default Employee;