import Modal from 'react-modal';
import { useState } from 'react';

interface AddTaskProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onAdd: (content: string) => void;
}

function AddTaskModal({ isOpen, onRequestClose, onAdd }: AddTaskProps) {
    const [content, setContent] = useState('');

    const handleAdd = () => {
        onAdd(content);
        setContent('');
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <input value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 w-full" />
            <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 mt-2">Add Task</button>
        </Modal>
    );
}

export default AddTaskModal;
