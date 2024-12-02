import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        const { data } = await axios.get('http://localhost:5000/tasks');
        setTasks(data);
    };

    const addTask = async (task) => {
        const { data } = await axios.post('http://localhost:5000/tasks', task);
        setTasks([...tasks, data]);
    };

    const updateTask = async (id, updatedTask) => {
        const { data } = await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
        setTasks(tasks.map((task) => (task._id === id ? data : task)));
        setEditingTask(null);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const toggleTaskCompletion = async (id, isCompleted) => {
        const { data } = await axios.put(`http://localhost:5000/tasks/${id}`, { isCompleted });
        setTasks(tasks.map((task) => (task._id === id ? data : task)));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <TaskForm
                addTask={addTask}
                editingTask={editingTask}
                updateTask={updateTask}
                clearEditingTask={() => setEditingTask(null)}
            />
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                toggleTaskCompletion={toggleTaskCompletion}
            />
        </div>
    );
};

export default App;
