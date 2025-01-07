import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <div className="task-filter">
      <select
        value={currentFilter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="ALL">All</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
    </div>
  );
};

export default TaskFilter;
