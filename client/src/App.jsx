import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassPage from "./components/Account Recover/ForgetPassPage";
import ResetPassPage from "./components/Account Recover/ResetPassPage";
import VerifyOTP from "./components/Account Recover/VerifyOTP";
import Header from "./components/Header";
import TaskCreate from "./components/TaskCreate";
import { getOTP } from "./Helpers/SessionHelper";
import CompleteTaskPage from "./pages/CompleteTaskPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewTaskPage from "./pages/NewTaskPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgressTaskPage from "./pages/ProgressTaskPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const { user } = useSelector((state) => state.auth);
  const otp = getOTP();
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
        <Route path="/forget-password" element={<ForgetPassPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
