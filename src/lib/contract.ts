import { kit } from './celo';
import TodoListContract from '@/../contracts/TodoList.json'; // ABI of the deployed contract

const contractAddress = '0xDef7Ee6a11795437cdc2eb04212a232836eD7D69'; // Replace with your contract's address
const todoList = new kit.web3.eth.Contract(TodoListContract.abi as any, contractAddress);

// Fetch all tasks
async function fetchTasks() {
    const taskCount = await todoList.methods.taskCount().call();
    const tasks = [];
    for (let i = 0; i < taskCount; i++) {
        const task = await todoList.methods.tasks(i).call();
        tasks.push(task);
    }
    return tasks;
}

// Create a new task
async function createTask(content: string, assignedUser: string, deadline: number) {
    const tx = await todoList.methods.createTask(content, assignedUser, deadline).send({ from: kit.defaultAccount });
    return tx;
}

// Toggle task completion status
async function toggleTask(taskId: number) {
    const tx = await todoList.methods.toggleCompleted(taskId).send({ from: kit.defaultAccount });
    return tx;
}

// Delete a task
async function deleteTask(taskId: number) {
    const tx = await todoList.methods.deleteTask(taskId).send({ from: kit.defaultAccount });
    return tx;
}

export { fetchTasks, createTask, toggleTask, deleteTask };
