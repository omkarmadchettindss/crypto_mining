import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Mining from "./pages/Mining";
import Payments from "./pages/Payments";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="mining" element={<Mining />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
