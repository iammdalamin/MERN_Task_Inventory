import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./componentss/Header";
import TaskCreate from "./componentss/TaskCreate";
import { TaskListByStatus } from "./Helpers/TaskService";
import CompleteTaskPage from "./pages/CompleteTaskPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewTaskPage from "./pages/NewTaskPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgressTaskPage from "./pages/ProgressTaskPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/task-create"
          element={user ? <TaskCreate /> : <LoginPage />}
        />
        <Route
          path="/new-task"
          element={user ? <NewTaskPage /> : <LoginPage />}
        />
        <Route
          path="/progress-task"
          element={user ? <ProgressTaskPage /> : <LoginPage />}
        />
        <Route
          path="/complete-task"
          element={user ? <CompleteTaskPage /> : <LoginPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
