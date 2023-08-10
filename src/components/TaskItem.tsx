import React from 'react';
import { TaskItemProps } from '@/types/Index';



const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div className="border p-4 mb-2">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-bold">{task.content}</h3>
                    <p>Assigned to: {task.assignedUser}</p>
                    <p>Deadline: {new Date(task.deadline * 1000).toLocaleString()}</p> {/* Assuming deadline is a UNIX timestamp */}
                </div>
                <div>
                    <button 
                        onClick={() => onToggle && onToggle(task.id)}
                        className={`px-4 py-2 ${task.isCompleted ? 'bg-green-500' : 'bg-gray-500'}`}
                    >
                        {task.isCompleted ? 'Completed' : 'Incomplete'}
                    </button>
                    <button 
                        onClick={() => onDelete && onDelete(task.id)}
                        className="bg-red-500 text-white px-4 py-2 ml-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
