export interface Task {
    content: string;
    isCompleted: boolean;
    assignedUser: string;
    deadline: number;
}

export interface TaskEvent {
    taskId: number;
    user: string;
    content: string;
}
