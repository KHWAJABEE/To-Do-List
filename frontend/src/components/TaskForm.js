import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editingTask, updateTask, clearEditingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const task = { title, description };

        if (editingTask) {
            updateTask(editingTask._id, task);
        } else {
            addTask(task);
        }

        setTitle('');
        setDescription('');
        if (clearEditingTask) clearEditingTask();
    };

    return (
        <div>
            <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
                {editingTask && (
                    <button type="button" onClick={clearEditingTask}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default TaskForm;
