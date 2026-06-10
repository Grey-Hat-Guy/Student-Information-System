import { Menu, GraduationCap } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-cream-50 border-b border-warm-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-warm-gray-600 hover:bg-sage-100 hover:text-sage-700 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="lg:hidden">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sage-600" />
              <h1 className="text-sm font-semibold text-warm-gray-800">
                Student Info
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
    </header>
  );
}
