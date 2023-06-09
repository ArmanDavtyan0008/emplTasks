import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, RouterProvider, Navigate
} from 'react-router-dom';
import Employee from "./pages/Employee";
import Task from "./pages/Task";
import EmployeePage from "./pages/EmployeePage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={'/employee'} element={<Employee/>}/>
            <Route path={'/tasks'} element={<Task/>}/>
            <Route path={"/employee/:id"} element={<EmployeePage/>} />
            <Route path={'*'} element={<Navigate to={'/employee'}/>}/>
        </Route>

    )
)

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;