import { Link } from "react-router-dom";
import { Users, Plus, LayoutDashboard, GraduationCap } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-warm-gray-200 min-h-screen sticky top-0">
      <div className="p-5 border-b border-warm-gray-100">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-sage-600" />
          <span className="text-lg font-semibold text-warm-gray-800">
            Student Info System
          </span>
        </div>
      </div>

      <nav className="p-4 flex flex-col gap-1.5">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 text-warm-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-700 transition-all duration-200 group"
        >
          <LayoutDashboard className="w-4.5 h-4.5" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link
          to="/students"
          className="flex items-center gap-3 px-3 py-2.5 text-warm-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-700 transition-all duration-200 group"
        >
          <Users className="w-4.5 h-4.5" />
          <span className="text-sm font-medium">Students</span>
        </Link>

        <Link
          to="/students/add"
          className="flex items-center gap-3 px-3 py-2.5 text-warm-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-700 transition-all duration-200 group"
        >
          <Plus className="w-4.5 h-4.5" />
          <span className="text-sm font-medium">Add Student</span>
        </Link>
      </nav>
    </aside>
  );
}
