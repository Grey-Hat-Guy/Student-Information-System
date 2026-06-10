// Sidebar.jsx - Fixed
import { Link, useLocation } from "react-router-dom";
import { Users, Plus, LayoutDashboard, GraduationCap, X } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/students", icon: Users, label: "Students" },
    { to: "/students/add", icon: Plus, label: "Add Student" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const sidebarContent = (
    <aside className="w-64 h-full bg-white border-r border-warm-gray-200 flex flex-col">
      <div className="p-5 border-b border-warm-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-sage-600" />
          <span className="text-lg font-semibold text-warm-gray-800">
            Student Info System
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-warm-gray-500 hover:bg-sage-100 hover:text-sage-700 transition-all duration-200"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-sage-50 text-sage-700"
                  : "text-warm-gray-700 hover:bg-sage-50 hover:text-sage-700"
              }`}
            >
              <Icon
                className={`w-4.5 h-4.5 ${active ? "text-sage-700" : ""}`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 h-full z-20">
        {sidebarContent}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
