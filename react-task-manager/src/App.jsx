import { Provider } from "react-redux";
import { store } from "./redux/store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Task Manager</h1>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
