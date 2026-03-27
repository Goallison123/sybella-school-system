// Mock data store for the school management system
// In production, this would be replaced with Supabase backend

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  principal: string;
  email: string;
  phone: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface User {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  avatar?: string;
}

export interface Student {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  studentId: string;
  classId: string;
  grade: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Teacher {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  teacherId: string;
  email: string;
  phone: string;
  subject: string;
  classIds: string[];
  hireDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  subject: string;
  room: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  studentIds: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Communication {
  id: string;
  schoolId: string;
  from: string;
  to: string[];
  type: 'announcement' | 'message' | 'alert' | 'parent-notice';
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'class' | 'attendance' | 'grade' | 'message' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Current user session
let currentUser: User | null = null;
let currentSchool: School | null = null;

// Mock schools
const schools: School[] = [
  {
    id: 'school-1',
    name: 'Riverside High School',
    code: 'RHS',
    address: '123 Education Ave, Springfield',
    principal: 'Dr. Sarah Johnson',
    email: 'admin@riverside.edu',
    phone: '+1 555-0100',
    logo: 'RH',
    primaryColor: '#4f6ef7',
    secondaryColor: '#22d3ee',
  },
  {
    id: 'school-2',
    name: 'Mountain View Academy',
    code: 'MVA',
    address: '456 Learning Blvd, Greenville',
    principal: 'Prof. Michael Chen',
    email: 'admin@mountainview.edu',
    phone: '+1 555-0200',
    logo: 'MV',
    primaryColor: '#22c55e',
    secondaryColor: '#7c5cfc',
  },
];

// Mock students
const students: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: `student-${i + 1}`,
  schoolId: 'school-1',
  firstName: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William'][i % 10],
  lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][Math.floor(i / 5) % 10],
  studentId: `STU${String(1000 + i).padStart(4, '0')}`,
  classId: `class-${(i % 5) + 1}`,
  grade: ['9', '10', '11', '12'][i % 4],
  dateOfBirth: `200${5 + (i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
  gender: i % 2 === 0 ? 'Female' : 'Male',
  email: `student${i + 1}@riverside.edu`,
  phone: `+1 555-${String(1000 + i).padStart(4, '0')}`,
  parentName: `Parent of Student ${i + 1}`,
  parentEmail: `parent${i + 1}@email.com`,
  parentPhone: `+1 555-${String(2000 + i).padStart(4, '0')}`,
  address: `${100 + i} Student Street, Springfield`,
  enrollmentDate: `202${2 + (i % 3)}-09-01`,
  status: 'active',
}));

// Mock teachers
const teachers: Teacher[] = Array.from({ length: 15 }, (_, i) => ({
  id: `teacher-${i + 1}`,
  schoolId: 'school-1',
  firstName: ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Jennifer', 'James', 'Maria'][i % 10],
  lastName: ['Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Walker', 'Hall', 'Allen'][i % 10],
  teacherId: `TCH${String(100 + i).padStart(3, '0')}`,
  email: `teacher${i + 1}@riverside.edu`,
  phone: `+1 555-${String(3000 + i).padStart(4, '0')}`,
  subject: ['Mathematics', 'English', 'Science', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music'][i % 10],
  classIds: [`class-${i + 1}`],
  hireDate: `201${5 + (i % 5)}-08-15`,
  status: 'active',
}));

// Mock classes
const classes: Class[] = Array.from({ length: 10 }, (_, i) => ({
  id: `class-${i + 1}`,
  schoolId: 'school-1',
  name: `${['Mathematics', 'English', 'Science', 'History', 'Physics'][i % 5]} - Grade ${9 + (i % 4)}`,
  grade: String(9 + (i % 4)),
  section: ['A', 'B', 'C'][i % 3],
  teacherId: `teacher-${(i % 15) + 1}`,
  subject: ['Mathematics', 'English', 'Science', 'History', 'Physics'][i % 5],
  room: `Room ${101 + i}`,
  schedule: [
    { day: 'Monday', startTime: '09:00', endTime: '10:30' },
    { day: 'Wednesday', startTime: '09:00', endTime: '10:30' },
    { day: 'Friday', startTime: '09:00', endTime: '10:30' },
  ],
  studentIds: students.filter(s => s.classId === `class-${i + 1}`).map(s => s.id),
}));

// Mock attendance records
const attendanceRecords: AttendanceRecord[] = [];
const today = new Date();
for (let i = 0; i < 30; i++) {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  const dateStr = date.toISOString().split('T')[0];
  
  students.slice(0, 20).forEach(student => {
    const rand = Math.random();
    attendanceRecords.push({
      id: `attendance-${student.id}-${dateStr}`,
      studentId: student.id,
      classId: student.classId,
      date: dateStr,
      status: rand > 0.9 ? 'absent' : rand > 0.85 ? 'late' : 'present',
    });
  });
}

// Mock communications
const communications: Communication[] = [
  {
    id: 'comm-1',
    schoolId: 'school-1',
    from: 'admin',
    to: ['all-parents'],
    type: 'announcement',
    subject: 'Parent-Teacher Meeting Next Week',
    message: 'Dear Parents, we are conducting parent-teacher meetings next week. Please check your schedule.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'comm-2',
    schoolId: 'school-1',
    from: 'admin',
    to: ['all-teachers'],
    type: 'alert',
    subject: 'Staff Meeting Tomorrow',
    message: 'Reminder: Staff meeting tomorrow at 3:00 PM in the conference room.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
];

// Mock notifications
const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'teacher-1',
    type: 'class',
    title: 'Next Class Starting Soon',
    message: 'Mathematics - Grade 10A starts in 15 minutes (Room 101)',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/teacher/classes',
  },
  {
    id: 'notif-2',
    userId: 'teacher-1',
    type: 'attendance',
    title: 'Attendance Reminder',
    message: 'Please mark attendance for today\'s classes',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/teacher/attendance',
  },
];

// Auth functions
export const login = (email: string, password: string, schoolId: string): { user: User; school: School } | null => {
  // Mock login - in production, this would call Supabase auth
  const school = schools.find(s => s.id === schoolId);
  if (!school) return null;

  let user: User | null = null;

  if (email.includes('admin')) {
    user = {
      id: 'user-admin-1',
      schoolId,
      name: school.principal,
      email,
      role: 'admin',
    };
  } else if (email.includes('teacher')) {
    const teacher = teachers[0];
    user = {
      id: teacher.id,
      schoolId,
      name: `${teacher.firstName} ${teacher.lastName}`,
      email,
      role: 'teacher',
    };
  } else if (email.includes('student')) {
    const student = students[0];
    user = {
      id: student.id,
      schoolId,
      name: `${student.firstName} ${student.lastName}`,
      email,
      role: 'student',
    };
  }

  if (user) {
    currentUser = user;
    currentSchool = school;
    return { user, school };
  }

  return null;
};

export const logout = () => {
  currentUser = null;
  currentSchool = null;
};

export const getCurrentUser = () => currentUser;
export const getCurrentSchool = () => currentSchool;

// Data access functions
export const getSchools = () => schools;
export const getSchoolById = (id: string) => schools.find(s => s.id === id);

export const getStudents = (schoolId: string) => students.filter(s => s.schoolId === schoolId);
export const getStudentById = (id: string) => students.find(s => s.id === id);
export const addStudent = (student: Omit<Student, 'id'>) => {
  const newStudent = { ...student, id: `student-${students.length + 1}` };
  students.push(newStudent);
  return newStudent;
};
export const updateStudent = (id: string, data: Partial<Student>) => {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...data };
    return students[index];
  }
  return null;
};
export const deleteStudent = (id: string) => {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    return true;
  }
  return false;
};

export const getTeachers = (schoolId: string) => teachers.filter(t => t.schoolId === schoolId);
export const getTeacherById = (id: string) => teachers.find(t => t.id === id);

export const getClasses = (schoolId: string) => classes.filter(c => c.schoolId === schoolId);
export const getClassById = (id: string) => classes.find(c => c.id === id);
export const getClassesByTeacher = (teacherId: string) => classes.filter(c => c.teacherId === teacherId);
export const getClassesByStudent = (studentId: string) => {
  const student = students.find(s => s.id === studentId);
  return student ? classes.filter(c => c.id === student.classId) : [];
};

export const getAttendance = (filters: { studentId?: string; classId?: string; date?: string }) => {
  return attendanceRecords.filter(record => {
    if (filters.studentId && record.studentId !== filters.studentId) return false;
    if (filters.classId && record.classId !== filters.classId) return false;
    if (filters.date && record.date !== filters.date) return false;
    return true;
  });
};

export const markAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
  const newRecord = { ...record, id: `attendance-${record.studentId}-${record.date}` };
  const existingIndex = attendanceRecords.findIndex(
    r => r.studentId === record.studentId && r.date === record.date
  );
  if (existingIndex !== -1) {
    attendanceRecords[existingIndex] = newRecord;
  } else {
    attendanceRecords.push(newRecord);
  }
  return newRecord;
};

export const getCommunications = (schoolId: string) => communications.filter(c => c.schoolId === schoolId);
export const sendCommunication = (comm: Omit<Communication, 'id'>) => {
  const newComm = { ...comm, id: `comm-${communications.length + 1}` };
  communications.push(newComm);
  return newComm;
};

export const getNotifications = (userId: string) => notifications.filter(n => n.userId === userId);
export const markNotificationRead = (id: string) => {
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

// Analytics functions
export const getAttendanceStats = (schoolId: string) => {
  const schoolStudents = students.filter(s => s.schoolId === schoolId);
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.filter(r => r.date === today);
  
  const present = todayAttendance.filter(r => r.status === 'present').length;
  const absent = todayAttendance.filter(r => r.status === 'absent').length;
  const late = todayAttendance.filter(r => r.status === 'late').length;
  const total = schoolStudents.length;
  
  return {
    total,
    present,
    absent,
    late,
    attendanceRate: total > 0 ? (present / total) * 100 : 0,
  };
};

export const getEnrollmentTrend = (schoolId: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    students: 450 + Math.floor(Math.random() * 50),
  }));
};
