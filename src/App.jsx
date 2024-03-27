import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTodo,
    removeTodo,
    todoMarkAsRead,
    fetch_products,
} from "./features/todoSlice";

function App() {
    const [task, setTask] = useState("");

    const todos = useSelector((state) => state.todos);
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(fetch_products());
    },[])

    const addTask = (e) => {
        e.preventDefault();
        dispatch(addTodo(task));
        setTask("");
    };

    const markAsRead = (e, id) => {
        console.log(id);
        dispatch(todoMarkAsRead(id));
    };

    const deleteTask = (e, id) => {
        console.log(id);
        dispatch(removeTodo(id));
    };

    return (
        <>
            <div className="container bg-light">
                <h1 className="h2 text-center">TODO MANAGER</h1>
                <br />

                <div>
                    <form className="mx-5" onSubmit={addTask}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add Task"
                                onChange={(e) => setTask(e.target.value)}
                                value={task}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-secondary"
                                    type="submit"
                                    onClick={addTask}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <div className="row mx-5">
                    <div className="col-2">
                        <div className="input-group">
                            <select
                                className="form-select-sm"
                                aria-label="Default select example"
                            >
                                <option selected value="">
                                    Default
                                </option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-3 justify-content-end">
                        <div className="input-group">
                            <button className="btn btn-primary" type="button">
                                Mark all as read
                            </button>
                        </div>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-4 mr-auto">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control-md border"
                                placeholder="Search"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-5 mt-5 mb-5">
                    <i className="text-left">All your notes are here</i>
                    <br />
                    <br />
                    <table className="table table-hover">
                        <tbody>
                            {/* <tr>
                                <td>1</td>
                                <td>Task to eat food</td>
                                <td>Mark as read</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Task to eat food</td>
                                <td>Mark as read</td>
                                <td>Delete</td>
                            </tr> */}

                            {todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td
                                        className={`
                                            ${
                                                todo.completed
                                                    ? "text-decoration-line-through"
                                                    : ""
                                            }
                                        `}
                                    >
                                        {todo.task}
                                    </td>
                                    <td onClick={(e) => markAsRead(e, todo.id)}>
                                        Mark as read
                                    </td>
                                    <td onClick={(e) => deleteTask(e, todo.id)}>
                                        Delete
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default App;
