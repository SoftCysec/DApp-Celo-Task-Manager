export interface Task {
    isCompleted: any;
    id: number; // Unique identifier for each task
    content: string;
    completed: boolean; // Renamed from isCompleted
    assignedUser: string;
    deadline: number;
}

export interface TaskEvent {
    taskId: number;
    user: string;
    content: string;
}

export interface ContractDefinition {
    abi: any[];
}

export interface ExtendedWindow extends Window {
    celo: any;
}

export interface AddTaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onAdd: (content: string, assignedUser: string, deadline: number) => void;
    // ... other props
}

export interface TaskItemProps {
    task: Task;
    onToggle?: (taskId: number) => void;
    onDelete?: (taskId: number) => void;
    // ... other props for other actions
}

