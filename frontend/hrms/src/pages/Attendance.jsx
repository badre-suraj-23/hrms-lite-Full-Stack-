import { useEffect, useState } from "react";
import API from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  const [filterEmployee, setFilterEmployee] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      let url = "attendance/";
      if (filterEmployee) {
        url += `?employee=${filterEmployee}`;
      }
      const res = await API.get(url);
      setAttendance(res.data);
      setError("");
    } catch {
      setError("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [filterEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("attendance/", form);
      setForm({
        employee: "",
        date: "",
        status: "Present",
      });
      fetchAttendance();
    } catch (err) {
      setError(
        err.response?.data?.non_field_errors?.[0] ||
        "Error marking attendance"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Attendance Management</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            required
            value={form.employee}
            onChange={(e) =>
              setForm({ ...form, employee: e.target.value })
            }
            style={styles.input}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            required
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            style={styles.input}
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            style={styles.input}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit" style={styles.primaryBtn}>
            Mark Attendance
          </button>
        </form>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.filterRow}>
          <label style={{ fontWeight: "bold" }}>
            Filter by Employee:
          </label>

          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : attendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.employee_name}</td>
                  <td>{a.date}</td>
                  <td>
                    <span
                      style={
                        a.status === "Present"
                          ? styles.present
                          : styles.absent
                      }
                    >
                      {a.status}
                    </span>
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
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  filterSelect: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  present: {
    background: "#dcfce7",
    color: "#166534",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  absent: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};