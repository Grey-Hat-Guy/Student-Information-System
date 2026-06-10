import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import ViewStudent from "../pages/ViewStudent";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />

        <Route path="/students/add" element={<AddStudent />} />

        <Route path="/students/:id" element={<ViewStudent />} />

        <Route path="/students/edit/:id" element={<EditStudent />} />
      </Route>
    </Routes>
  );
}
