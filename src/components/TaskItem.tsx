interface TaskProps {
    content: string;
    isCompleted: boolean;
    onDelete: () => void;
    onToggle: () => void;
}

function TaskItem({ content, isCompleted, onDelete, onToggle }: TaskProps) {
    return (
        <div className="border p-4 flex justify-between">
            <p className={isCompleted ? "line-through" : ""}>{content}</p>
            <div>
                <button onClick={onToggle} className="bg-green-500 text-white px-4 py-2 mr-2">{isCompleted ? "Undo" : "Complete"}</button>
                <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2">Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;
