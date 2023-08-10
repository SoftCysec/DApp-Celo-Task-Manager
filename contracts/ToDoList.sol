// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    struct Task {
        string content;
        bool isCompleted;
        address assignedUser;
        uint256 deadline;
    }

    Task[] public tasks;

    event TaskCreated(uint256 taskId, address indexed user, string content);
    event TaskCompleted(uint256 taskId, address indexed user);
    event TaskDeleted(uint256 taskId, address indexed user);

    function createTask(string calldata _content, address _assignedUser, uint256 _deadline) external {
        tasks.push(Task(_content, false, _assignedUser, _deadline));
        emit TaskCreated(tasks.length - 1, msg.sender, _content);
    }

    function toggleCompleted(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        task.isCompleted = !task.isCompleted;
        emit TaskCompleted(_taskId, msg.sender);
    }

    function deleteTask(uint256 _taskId) external {
        delete tasks[_taskId];
        emit TaskDeleted(_taskId, msg.sender);
    }

    function getTask(uint256 _taskId) external view returns (string memory content, bool isCompleted, address assignedUser, uint256 deadline) {
        Task storage task = tasks[_taskId];
        return (task.content, task.isCompleted, task.assignedUser, task.deadline);
    }
}
