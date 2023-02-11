import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./componentss/Header";
import TaskCreate from "./componentss/TaskCreate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";

function App() {
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
