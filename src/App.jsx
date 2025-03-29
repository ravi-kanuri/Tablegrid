import "./App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route,Navigate  } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { setAuthUser } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser); 
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuthUser(token));
    }
  }, [dispatch]);

  return <>
 <Routes>
    <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/Auth" />} />
      <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
      <Route path="/home" element={ authUser ? <HomePage /> : <Navigate to="/Auth" />} />
      <Route path="*" element={<Navigate to="/Auth" />} />
    </Routes>

    <Toaster />
  </>;
}

export default App;
