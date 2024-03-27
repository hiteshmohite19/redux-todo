import { useSelector } from "react-redux";

function Another() {
    const todo_data = useSelector((state) => state.products);

    return <>{todo_data.length}</>;
}

export default Another;
