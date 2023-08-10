import Modal from 'react-modal';
import { AddTaskModalProps } from '@/types/Index';
import { useState } from 'react';

function AddTaskModal({ isOpen, onRequestClose, onAdd }: AddTaskModalProps) {
    const [content, setContent] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [deadline, setDeadline] = useState<number | null>(null);

    const handleAdd = () => {
        if (deadline !== null) {
            onAdd(content, assignedUser, deadline);
            setContent('');
            setAssignedUser('');
            setDeadline(null);
            onRequestClose();
        } else {
            console.error("Deadline is not set!");
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <input 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Task content"
                className="border p-2 w-full mb-2"
            />
            <input 
                value={assignedUser} 
                onChange={(e) => setAssignedUser(e.target.value)} 
                placeholder="Assigned user"
                className="border p-2 w-full mb-2"
            />
            <input 
                type="number"
                value={deadline ? deadline.toString() : ''}
                onChange={(e) => setDeadline(Number(e.target.value))}
                placeholder="Deadline (as a timestamp)"
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 mt-2">Add Task</button>
        </Modal>
    );
}

export default AddTaskModal;
