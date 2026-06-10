import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/studentApi";
import { Users, Mars, Venus, TrendingUp, Loader } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const response = await getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      iconBg: "bg-sage-100",
      iconColor: "text-sage-700",
      borderColor: "border-sage-200",
      gradient: "from-sage-50 to-white",
    },
    {
      title: "Male Students",
      value: stats.maleStudents,
      icon: Mars,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      borderColor: "border-blue-200",
      gradient: "from-blue-50 to-white",
    },
    {
      title: "Female Students",
      value: stats.femaleStudents,
      icon: Venus,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-700",
      borderColor: "border-pink-200",
      gradient: "from-pink-50 to-white",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sage-600 animate-spin mx-auto mb-4" />
          <p className="text-warm-gray-600 text-sm">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-warm-gray-800">
            Dashboard
          </h2>
          <p className="text-sm text-warm-gray-500 mt-1">
            Overview of student statistics
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-cream-50 border border-warm-gray-200 rounded-lg">
          <TrendingUp className="w-4 h-4 text-sage-600" />
          <span className="text-xs text-warm-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`group relative bg-linear-to-br ${card.gradient} border ${card.borderColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-warm-gray-50 to-transparent opacity-50 rounded-bl-full"></div>

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 ${card.iconBg} rounded-xl ${card.iconColor} transition-transform group-hover:scale-110 duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-warm-gray-500 uppercase tracking-wider">
                      {card.title}
                    </p>
                    <p className="text-4xl font-bold text-warm-gray-800 mt-1">
                      {card.value}
                    </p>
                  </div>
                </div>

                {card.title !== "Total Students" && stats.totalStudents > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-warm-gray-500 mb-1">
                      <span>Percentage</span>
                      <span>
                        {Math.round((card.value / stats.totalStudents) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-warm-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          card.title === "Male Students"
                            ? "bg-blue-500"
                            : "bg-pink-500"
                        }`}
                        style={{
                          width: `${(card.value / stats.totalStudents) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {stats.totalStudents === 0 && !loading && (
        <div className="bg-cream-50 border border-warm-gray-200 rounded-xl p-12 text-center">
          <Users className="w-16 h-16 text-warm-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-warm-gray-700 mb-2">
            No students yet
          </h3>
          <p className="text-sm text-warm-gray-500">
            Start by adding your first student to see statistics here
          </p>
        </div>
      )}
    </div>
  );
}
