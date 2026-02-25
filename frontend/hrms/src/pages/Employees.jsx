import { useEffect, useState } from "react";
import API from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("employees/");
      setEmployees(res.data);
      setError("");
    } catch {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`employees/${editingId}/`, form);
      } else {
        await API.post("employees/", form);
      }

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;
        const firstError =
          data.employee_id?.[0] ||
          data.email?.[0] ||
          data.full_name?.[0] ||
          data.department?.[0] ||
          "Operation failed";
        setError(firstError);
      } else {
        setError("Server error");
      }
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({
      employee_id: emp.employee_id,
      full_name: emp.full_name,
      email: emp.email,
      department: emp.department,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`employees/${id}/`);
      fetchEmployees();
    } catch {
      setError("Error deleting employee");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Employee Management</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            required
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
            style={styles.input}
          />

          <input
            required
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            style={styles.input}
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
          />

          <input
            required
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            style={styles.input}
          />

          <button type="submit" style={styles.primaryBtn}>
            {editingId ? "Update Employee" : "Add Employee"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  employee_id: "",
                  full_name: "",
                  email: "",
                  department: "",
                });
              }}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div style={styles.tableCard}>
        <h3 style={{ marginBottom: "15px" }}>Employee List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  style={
                    editingId === emp.id
                      ? { backgroundColor: "#f3f4f6" }
                      : {}
                  }
                >
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(emp)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  tableCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  primaryBtn: {
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editBtn: {
    padding: "6px 10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};