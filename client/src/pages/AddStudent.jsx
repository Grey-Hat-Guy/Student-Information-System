import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../api/studentApi";
import {
  Save,
  ArrowLeft,
  User,
  Hash,
  Calendar,
  Phone,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";

export default function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    admissionNo: "",
    fullName: "",
    gender: "",
    dob: "",
    parentName: "",
    phone: "",
    address: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "admissionNo":
        if (!value.trim()) return "Admission number is required";
        if (value.length < 3)
          return "Admission number must be at least 3 characters";
        return "";
      case "fullName":
        if (!value.trim()) return "Student name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Name should only contain letters";
        return "";
      case "gender":
        if (!value) return "Please select gender";
        return "";
      case "dob":
        if (!value) return "Date of birth is required";
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 5) return "Student must be at least 5 years old";
        if (age > 25) return "Student age should not exceed 25 years";
        return "";
      case "parentName":
        if (!value.trim()) return "Parent name is required";
        if (value.length < 2)
          return "Parent name must be at least 2 characters";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.length < 10) return "Please provide complete address";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const allTouched = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await createStudent(formData);
      if (response.success) {
        const successMessage = document.createElement("div");
        successMessage.className =
          "fixed top-4 right-4 bg-sage-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in";
        successMessage.textContent = "Student added successfully";
        document.body.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);

        navigate("/students");
      } else {
        setErrors({ submit: response.message });
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: "admissionNo",
      label: "Admission Number",
      type: "text",
      icon: Hash,
      placeholder: "e.g., STU-2024-001",
      required: true,
    },
    {
      name: "fullName",
      label: "Student Name",
      type: "text",
      icon: User,
      placeholder: "Enter full name",
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      icon: Users,
      options: [
        { value: "", label: "Select Gender" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
      required: true,
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      icon: Calendar,
      required: true,
    },
    {
      name: "parentName",
      label: "Parent Name",
      type: "text",
      icon: Users,
      placeholder: "Enter parent/guardian name",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      icon: Phone,
      placeholder: "10-digit mobile number",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      icon: MapPin,
      placeholder: "Enter complete address",
      rows: 4,
      required: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-warm-gray-800">
            Add New Student
          </h2>
          <p className="text-sm text-warm-gray-500 mt-1">
            Fill in the details to register a new student
          </p>
        </div>

        <button
          onClick={() => navigate("/students")}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm text-warm-gray-600 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-warm-gray-200 rounded-xl shadow-sm"
      >
        <div className="p-6 space-y-5">
          {inputFields.map((field) => {
            const Icon = field.icon;
            const hasError = touched[field.name] && errors[field.name];
            const isSuccess =
              touched[field.name] &&
              !errors[field.name] &&
              formData[field.name];

            return (
              <div key={field.name}>
                <label className="block text-sm font-medium text-warm-gray-700 mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-amber-500 ml-1">*</span>
                  )}
                </label>

                <div className="relative">
                  {field.type !== "select" && field.type !== "textarea" && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                  )}

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={field.rows}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                        hasError
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : isSuccess
                            ? "border-sage-400 focus:border-sage-500 focus:ring-sage-100"
                            : "border-warm-gray-200 focus:border-sage-400 focus:ring-sage-100"
                      }`}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 appearance-none bg-white ${
                        hasError
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : isSuccess
                            ? "border-sage-400 focus:border-sage-500 focus:ring-sage-100"
                            : "border-warm-gray-200 focus:border-sage-400 focus:ring-sage-100"
                      }`}
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        hasError
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : isSuccess
                            ? "border-sage-400 focus:border-sage-500 focus:ring-sage-100"
                            : "border-warm-gray-200 focus:border-sage-400 focus:ring-sage-100"
                      }`}
                    />
                  )}

                  {isSuccess && field.type !== "select" && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-500" />
                  )}
                </div>

                {hasError && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                    <p className="text-xs text-red-600">{errors[field.name]}</p>
                  </div>
                )}
              </div>
            );
          })}

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-cream-50 border-t border-warm-gray-200 rounded-b-xl flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="px-4 py-2 text-sm font-medium text-warm-gray-700 bg-white border border-warm-gray-200 rounded-lg hover:bg-warm-gray-50 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Student</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
