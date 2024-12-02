import React from 'react';

const TaskList = ({ tasks, deleteTask, setEditingTask, toggleTaskCompletion }) => {
    return (
        <div>
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => toggleTaskCompletion(task._id, !task.isCompleted)}
                                />
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                            </div>
                            <button onClick={() => setEditingTask(task)}>Edit</button>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
