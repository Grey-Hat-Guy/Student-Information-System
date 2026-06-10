import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getStudentById } from "../api/studentApi";
import {
  ArrowLeft,
  Edit,
  User,
  Hash,
  Calendar,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  Loader,
  AlertCircle,
  Mail,
  Home,
} from "lucide-react";

export default function ViewStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStudentById(id);
      if (response.success) {
        setStudent(response.data);
      } else {
        setError(response.message || "Failed to load student details");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const studentInfoSections = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        { label: "Full Name", value: student?.fullName, icon: User },
        { label: "Gender", value: student?.gender, icon: Users },
        {
          label: "Date of Birth",
          value: formatDate(student?.dob),
          icon: Calendar,
        },
      ],
    },
    {
      title: "Academic Information",
      icon: GraduationCap,
      fields: [
        { label: "Admission Number", value: student?.admissionNo, icon: Hash },
      ],
    },
    {
      title: "Parent/Guardian Information",
      icon: Users,
      fields: [
        { label: "Parent Name", value: student?.parentName, icon: Users },
        { label: "Phone Number", value: student?.phone, icon: Phone },
      ],
    },
    {
      title: "Contact Information",
      icon: MapPin,
      fields: [{ label: "Address", value: student?.address, icon: Home }],
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sage-600 animate-spin mx-auto mb-4" />
          <p className="text-warm-gray-600 text-sm">
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">
            Unable to Load Student
          </h3>
          <p className="text-sm text-warm-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/students")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Students</span>
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-warm-gray-800">
            Student Details
          </h2>
          <p className="text-sm text-warm-gray-500 mt-1">
            Complete information about the student
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/students")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-warm-gray-600 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <Link
            to={`/students/edit/${student._id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-all duration-200 shadow-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Student</span>
          </Link>
        </div>
      </div>

      <div className="bg-linear-to-r from-sage-50 to-cream-50 border border-warm-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-linear-to-br from-sage-200 to-sage-300 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-sage-700" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-warm-gray-800">
              {student.fullName}
            </h3>
            <p className="text-sm text-warm-gray-500 mt-1">
              Admission Number: {student.admissionNo}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sage-100 text-sage-700">
                {student.gender}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studentInfoSections.map((section, idx) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-warm-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-5 py-4 bg-cream-50 border-b border-warm-gray-200 flex items-center gap-2">
                <SectionIcon className="w-5 h-5 text-sage-600" />
                <h3 className="font-semibold text-warm-gray-800">
                  {section.title}
                </h3>
              </div>

              <div className="p-5 space-y-4">
                {section.fields.map((field, fieldIdx) => {
                  const FieldIcon = field.icon;
                  return (
                    <div key={fieldIdx} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <FieldIcon className="w-4 h-4 text-warm-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-gray-500 uppercase tracking-wider">
                          {field.label}
                        </p>
                        <p className="text-sm text-warm-gray-800 mt-0.5 wrap-break-word">
                          {field.value || "Not specified"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-cream-50 border border-warm-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-warm-gray-500">Student ID: {student._id}</p>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="text-xs text-warm-gray-600 hover:text-sage-700 transition-colors duration-200"
          >
            Print Details
          </button>
          <span className="text-warm-gray-300">|</span>
          <Link
            to={`/students/edit/${student._id}`}
            className="text-xs text-sage-600 hover:text-sage-700 font-medium transition-colors duration-200"
          >
            Edit Information
          </Link>
        </div>
      </div>
    </div>
  );
}
