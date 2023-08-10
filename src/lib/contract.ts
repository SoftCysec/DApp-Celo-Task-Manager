import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { ContractDefinition } from '@/types/Index';
import TodoListContractJson from '@/contracts/TodoList.json';
import { Contract } from 'web3-eth-contract';

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

const kit = newKitFromWeb3(web3);

const TodoListContract = TodoListContractJson as unknown as ContractDefinition;
const contractAddress = '0xDef7Ee6a11795437cdc2eb04212a232836eD7D69'; // Make sure to replace with your actual contract address

const todoList = new kit.web3.eth.Contract(TodoListContract.abi, contractAddress) as unknown as Contract;
// Fetch all tasks
async function fetchTasks() {
    try {
        const taskCount = await todoList.methods.taskCount().call();
        const tasks = [];
        for (let i = 0; i < taskCount; i++) {
            const task = await todoList.methods.tasks(i).call();
            tasks.push(task);
        }
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

// Create a new task
async function createTask(content: string, assignedUser: string, deadline: number) {
    try {
        const tx = await todoList.methods.createTask(content, assignedUser, deadline).send({ from: kit.defaultAccount });
        return tx;
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
}

// Toggle task completion status
async function toggleTask(taskId: number) {
    try {
        const tx = await todoList.methods.toggleCompleted(taskId).send({ from: kit.defaultAccount });
        return tx;
    } catch (error) {
        console.error("Error toggling task:", error);
        return null;
    }
}

// Delete a task
async function deleteTask(taskId: number) {
    try {
        const tx = await todoList.methods.deleteTask(taskId).send({ from: kit.defaultAccount });
        return tx;
    } catch (error) {
        console.error("Error deleting task:", error);
        return null;
    }
}

export { fetchTasks, createTask, toggleTask, deleteTask };
