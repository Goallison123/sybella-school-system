import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Plus, Search, Filter, Download, Upload, Edit2, Trash2, 
  Eye, Mail, Phone, Calendar, MapPin, GraduationCap
} from 'lucide-react';
import { getCurrentSchool, getStudents, Student, addStudent, updateStudent, deleteStudent } from '../../lib/data';

export default function Students() {
  const school = getCurrentSchool();
  if (!school) return null;

  const [students, setStudents] = useState(getStudents(school.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName} ${student.studentId}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleAddStudent = () => {
    // In production, this would open a proper form modal
    const newStudent: Omit<Student, 'id'> = {
      schoolId: school.id,
      firstName: 'New',
      lastName: 'Student',
      studentId: `STU${Date.now()}`,
      classId: 'class-1',
      grade: '9',
      dateOfBirth: '2008-01-01',
      gender: 'Male',
      email: 'new.student@school.edu',
      phone: '+1 555-0000',
      parentName: 'Parent Name',
      parentEmail: 'parent@email.com',
      parentPhone: '+1 555-0001',
      address: '123 Street',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    const added = addStudent(newStudent);
    setStudents([...students, added]);
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = ['#4f6ef7', '#22d3ee', '#22c55e', '#f59e0b', '#7c5cfc', '#ec4899'];
    return colors[index % colors.length];
  };

  return (
    <Layout currentPage="students">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Student Management</h1>
            <p className="text-sm text-muted-foreground">Manage and track all student information</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button 
              onClick={handleAddStudent}
              className="px-4 py-2 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{students.length}</div>
            <div className="text-xs text-muted-foreground">Total Students</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{students.filter(s => s.status === 'active').length}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{new Set(students.map(s => s.grade)).size}</div>
            <div className="text-xs text-muted-foreground">Grades</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">{new Set(students.map(s => s.classId)).size}</div>
            <div className="text-xs text-muted-foreground">Classes</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or student ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Grades</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.map((student, index) => (
            <div
              key={student.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setViewingStudent(student)}
            >
              <div className="text-center mb-4">
                <div 
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: getAvatarColor(index) }}
                >
                  {getInitials(student.firstName, student.lastName)}
                </div>
                <h3 className="text-sm font-semibold mb-1">{student.firstName} {student.lastName}</h3>
                <p className="text-xs text-muted-foreground font-mono">{student.studentId}</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Grade {student.grade}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{student.email}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingStudent(student);
                  }}
                  className="flex-1 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStudent(student.id);
                  }}
                  className="px-3 py-1.5 bg-[rgba(239,68,68,0.1)] text-[#ef4444] rounded-lg text-xs font-medium hover:bg-[rgba(239,68,68,0.2)] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No students found</p>
          </div>
        )}
      </div>

      {/* View Student Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setViewingStudent(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: getAvatarColor(students.indexOf(viewingStudent)) }}
                >
                  {getInitials(viewingStudent.firstName, viewingStudent.lastName)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{viewingStudent.firstName} {viewingStudent.lastName}</h2>
                  <p className="text-sm text-muted-foreground font-mono">{viewingStudent.studentId}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingStudent(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Date of Birth</label>
                    <p className="text-sm">{new Date(viewingStudent.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Gender</label>
                    <p className="text-sm">{viewingStudent.gender}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Grade</label>
                    <p className="text-sm">Grade {viewingStudent.grade}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Enrollment Date</label>
                    <p className="text-sm">{new Date(viewingStudent.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <p className="text-sm">{viewingStudent.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Phone</label>
                    <p className="text-sm">{viewingStudent.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Address</label>
                    <p className="text-sm">{viewingStudent.address}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold mb-3">Parent/Guardian Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Name</label>
                    <p className="text-sm">{viewingStudent.parentName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <p className="text-sm">{viewingStudent.parentEmail}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Phone</label>
                    <p className="text-sm">{viewingStudent.parentPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Student
              </button>
              <button 
                onClick={() => {
                  handleDeleteStudent(viewingStudent.id);
                  setViewingStudent(null);
                }}
                className="px-4 py-2 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] rounded-xl text-sm font-medium hover:bg-[rgba(239,68,68,0.2)] transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}