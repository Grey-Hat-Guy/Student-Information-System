import { Menu, Bell, User, Search, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-cream-50 border-b border-warm-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-warm-gray-600 hover:bg-sage-100 hover:text-sage-700 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="lg:hidden">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sage-600" />
              <h1 className="text-sm font-semibold text-warm-gray-800">
                Student Info System
              </h1>
            </div>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-warm-gray-800">
              Student Information System
            </h1>
            <p className="text-xs text-warm-gray-500 mt-0.5">
              Manage and track student records
            </p>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 border-t border-warm-gray-100 pt-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-warm-gray-200 rounded-lg">
            <Search className="w-4 h-4 text-warm-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="text-sm text-warm-gray-700 bg-transparent outline-none flex-1"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
