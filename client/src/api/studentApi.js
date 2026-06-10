const BASE_URL = "http://localhost:5000/api/students";

export const getDashboardStats = async () => {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);

  return response.json();
};

export const getStudents = async (search = "") => {
  const response = await fetch(`${BASE_URL}?search=${search}`);

  return response.json();
};

export const getStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  return response.json();
};

export const createStudent = async (studentData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return response.json();
};

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
};
