import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>HRMS</h2>

      <div>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(location.pathname === "/" ? styles.active : {})
          }}
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          style={{
            ...styles.link,
            ...(location.pathname === "/attendance" ? styles.active : {})
          }}
        >
          Attendance
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={styles.page}>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#1f2937",
    color: "white",
    borderRadius: "7px",

  },
  logo: {
    margin: 0,
  },
  link: {
    marginLeft: "20px",
    textDecoration: "none",
    color: "#d1d5db",
    fontWeight: "500",
  },
  active: {
    color: "white",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "3px",
  },
  page: {
    padding: "20px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
};