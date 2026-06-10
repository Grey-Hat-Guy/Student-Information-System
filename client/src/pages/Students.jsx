import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStudents, deleteStudent } from "../api/studentApi";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Loader,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon,
} from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);
    setCurrentPage(1);
    setLoading(true);
    try {
      const response = await getStudents(value);
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const response = await deleteStudent(id);
      if (response.success) {
        await loadStudents();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-warm-gray-800">
            Students
          </h2>
          <p className="text-sm text-warm-gray-500 mt-1">
            Manage and view all student records
          </p>
        </div>

        <Link
          to="/students/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add Student</span>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
        <input
          type="text"
          value={search}
          placeholder="Search by name or admission number..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-warm-gray-200 rounded-lg bg-white focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all duration-200 text-sm text-warm-gray-700 placeholder:text-warm-gray-400"
        />
      </div>

      <div className="bg-white border border-warm-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream-50 border-b border-warm-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-warm-gray-600 uppercase tracking-wider">
                  Admission No
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-warm-gray-600 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-warm-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Parent Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-warm-gray-600 uppercase tracking-wider hidden lg:table-cell">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-warm-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-warm-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center">
                    <Loader className="w-8 h-8 text-sage-600 animate-spin mx-auto mb-3" />
                    <p className="text-sm text-warm-gray-500">
                      Loading students...
                    </p>
                  </td>
                </tr>
              ) : currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-sage-50/30 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-warm-gray-900">
                      {student.admissionNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-warm-gray-700">
                      {student.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-warm-gray-600 hidden md:table-cell">
                      {student.parentName}
                    </td>
                    <td className="px-4 py-3 text-sm text-warm-gray-600 hidden lg:table-cell">
                      {student.phone}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/students/${student._id}`}
                          className="p-1.5 text-sage-600 hover:bg-sage-100 rounded-lg transition-all duration-200 group"
                          title="View"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link
                          to={`/students/edit/${student._id}`}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200 group"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </Link>

                        <button
                          onClick={() => handleDelete(student._id)}
                          disabled={deletingId === student._id}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                          title="Delete"
                        >
                          {deletingId === student._id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center">
                    <UsersIcon className="w-12 h-12 text-warm-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-warm-gray-700 mb-1">
                      No students found
                    </p>
                    <p className="text-xs text-warm-gray-500">
                      {search
                        ? "Try a different search term"
                        : "Click 'Add Student' to get started"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && students.length > 0 && (
          <div className="px-4 py-3 border-t border-warm-gray-200 bg-cream-50 flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs text-warm-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, students.length)} of {students.length}{" "}
              students
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 text-warm-gray-600 hover:bg-sage-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-sage-600 text-white shadow-sm"
                          : "text-warm-gray-600 hover:bg-sage-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 text-warm-gray-600 hover:bg-sage-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
