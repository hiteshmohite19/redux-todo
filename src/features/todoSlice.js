import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    todos: [
        {
            id: nanoid(),
            task: 'Eat food',
            completed: false,
        }
    ],
    products: []
}


export const fetch_products = createAsyncThunk('fetchProducts', async () => {
    const products_data = await axios.get('http://localhost:8000/api/products/')
    return products_data.data
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                task: action.payload,
                completed: false
            }
            state.todos.push(todo)

        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => action.payload !== todo.id)
        },
        todoMarkAsRead: (state, action) => {
            state.todos = state.todos.map(todo => {
                return todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            })
        },
    },
    extraReducers(builder) {
        builder.addCase(fetch_products.fulfilled, (state, action) => {
            state.products = action.payload
            console.log(state.products);
        })
    }
})

export const { addTodo, removeTodo, todoMarkAsRead } = todoSlice.actions

export default todoSlice.reducer