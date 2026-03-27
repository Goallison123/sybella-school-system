import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Classes from "./pages/admin/Classes";
import Attendance from "./pages/admin/Attendance";
import Communications from "./pages/admin/Communications";
import Analytics from "./pages/admin/Analytics";
import NationalExport from "./pages/admin/NationalExport";
import Settings from "./pages/admin/Settings";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherCommunications from "./pages/teacher/Communications";
import StudentClasses from "./pages/student/Classes";
import StudentAttendance from "./pages/student/Attendance";
import StudentGrades from "./pages/student/Grades";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/students",
    Component: Students,
  },
  {
    path: "/admin/teachers",
    Component: Teachers,
  },
  {
    path: "/admin/classes",
    Component: Classes,
  },
  {
    path: "/admin/attendance",
    Component: Attendance,
  },
  {
    path: "/admin/communications",
    Component: Communications,
  },
  {
    path: "/admin/analytics",
    Component: Analytics,
  },
  {
    path: "/admin/national-export",
    Component: NationalExport,
  },
  {
    path: "/admin/settings",
    Component: Settings,
  },
  {
    path: "/teacher/dashboard",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/classes",
    Component: TeacherClasses,
  },
  {
    path: "/teacher/attendance",
    Component: TeacherAttendance,
  },
  {
    path: "/teacher/communications",
    Component: TeacherCommunications,
  },
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/classes",
    Component: StudentClasses,
  },
  {
    path: "/student/attendance",
    Component: StudentAttendance,
  },
  {
    path: "/student/grades",
    Component: StudentGrades,
  },
]);
