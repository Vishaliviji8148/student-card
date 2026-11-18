import { useState } from "react";
import "./styles/App.css";

function App() {
  const [students, setStudents] = useState([
    {
      name: "sumathi",
      role: "Student",
      id: "STU2026001",
      department: "Computer Science",
      year: "2nd Year",
      email: "sumathi@gmail.com",
      photo: ""
    },
    {
      name: "vinothini",
      role: "Student",
      id: "STU2026002",
      department: "Information Technology",
      year: "2nd Year",
      email: "vino@gmail.com",
      photo: ""
    },
    {
      name: "Theresha",
      role: "Student",
      id: "STU2026003",
      department: "Electronics",
      year: "3rd Year",
      email: "theresha@gmail.com",
      photo: ""
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: "",
    department: "",
    year: "",
    email: ""
  });

 function addStudent(event) {
  event.preventDefault();

  if (editIndex !== null) {
    setStudents(previous =>
      previous.map((student, index) =>
        index === editIndex
          ? { ...student, ...newStudent }
          : student
      )
    );

    setEditIndex(null);
  } else {
    const student = {
      ...newStudent,
      role: "Student",
      id: "STU" + Date.now(),
      photo: ""
    };

    setStudents(previous => [...previous, student]);
  }

  setNewStudent({
    name: "",
    department: "",
    year: "",
    email: ""
  });

  setShowForm(false);
}

  function uploadPhoto(index, event) {
    const file = event.target.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setStudents(previous =>
      previous.map((student, i) =>
        i === index
          ? { ...student, photo: imageURL }
          : student
      )
    );
  }

  function deleteStudent(index) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="app">

      <h1 className="main-title">
        STUDENT ID CARD MANAGEMENT
      </h1>

      <button
        className="add-button"
        onClick={() => setShowForm(!showForm)}
      >
        + Add Student
      </button>

      {showForm && (
        <form className="student-form" onSubmit={addStudent}>

        <h2>{editIndex !== null ? "Edit Student" : "Add New Student"}</h2>

          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={e =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            required
          />
          <input
  type="text"
  placeholder="Student ID"
  value={newStudent.id || ""}
  onChange={e =>
    setNewStudent({ ...newStudent, id: e.target.value })
  }
  required
/>

          <input
            type="text"
            placeholder="Department"
            value={newStudent.department}
            onChange={e =>
              setNewStudent({ ...newStudent, department: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Academic Year"
            value={newStudent.year}
            onChange={e =>
              setNewStudent({ ...newStudent, year: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={newStudent.email}
            onChange={e =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />

          <button type="submit" className="save-button">
           {editIndex !== null ? "Update Student" : "Save Student"}
          </button>

        </form>
      )}

      <div className="card-container">

        {students.map((student, index) => (

          <div className="student-card" key={student.id}>

            <div className="card-header">
              STUDENT ID CARD
            </div>

            <div className="card-body">

              <label className="photo-upload">

                {student.photo ? (
                  <img src={student.photo} alt={student.name} />
                ) : (
                  <span>Upload Photo</span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={e => uploadPhoto(index, e)}
                />

              </label>

              <h2>{student.name}</h2>

              <h3>{student.role}</h3>

              <div className="student-details">

                <p><strong>ID:</strong> {student.id}</p>

                <p>
                  <strong>Department:</strong> {student.department}
                </p>

                <p><strong>Year:</strong> {student.year}</p>

                <p><strong>Email:</strong> {student.email}</p>

              </div>

             <div className="card-actions">

  <button
    className="edit-button"
    onClick={() => editStudent(index)}
  >
    Edit Student
  </button>

  <button
    className="delete-button"
    onClick={() => deleteStudent(index)}
  >
    Delete Student
  </button>

</div>

            </div>

            <div className="card-footer">
              STUDENT DASHBOARD
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;