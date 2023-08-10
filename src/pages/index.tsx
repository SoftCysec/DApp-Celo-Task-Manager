import { useEffect, useState } from 'react';
import { Task } from '@/types/Index';
import NavBar from '@/components/NavBar';
import TaskItem from '@/components/TaskItem';
import AddTaskModal from '@/components/AddTaskModal';
import { fetchTasks, createTask, toggleTask, deleteTask } from '@/lib/contract';
import { connectCeloWallet } from '@/lib/celo';

function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        connectCeloWallet();
    }, []);

    useEffect(() => {
        async function loadTasks() {
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        loadTasks();
    }, []);

    const handleToggleTask = async (taskId: number) => {
        try {
            // Call the function from your contract to toggle the task
            await toggleTask(taskId);
            // Refresh tasks after toggling
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };
    
    const handleDeleteTask = async (taskId: number) => {
        try {
            // Call the function from your contract to delete the task
            await deleteTask(taskId);
            // Refresh tasks after deletion
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    

    const handleAddTask = async (content: string, assignedUser: string, deadline: number) => {
        try {
            // Logic to add task to the blockchain
            await createTask(content, assignedUser, deadline);
            // Refresh tasks after adding
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error adding task:", error);
        }
        // Close the modal
        setIsModalOpen(false);
    };

    return (
        <div>
            <NavBar />
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task}
                    // Uncomment and implement the following if you want these functionalities
                    onToggle={(taskId) => handleToggleTask(taskId)}
                    onDelete={(taskId) => handleDeleteTask(taskId)}
                />
            ))}
            <button onClick={() => setIsModalOpen(true)}>Add Task</button>
            <AddTaskModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                onAdd={(content: string, assignedUser: string, deadline: number) => handleAddTask(content, assignedUser, deadline)} 
            />
        </div>
    );
    
}

export default Home;
