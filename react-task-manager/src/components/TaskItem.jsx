import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask } from "../redux/taskSlice";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium");
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedPriority(task.priority);
    }
  }, [task]);

  const handleEdit = () => {
    if (editedTitle.trim() && task) {
      dispatch(
        editTask({
          id: task.id,
          title: editedTitle,
          priority: editedPriority,
        })
      );
      setIsEditing(false);
    }
  };

  if (!task) return null;

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>
          <span className="priority">{task.priority}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
