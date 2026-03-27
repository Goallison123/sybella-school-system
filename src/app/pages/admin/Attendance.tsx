import { useState } from 'react';
import Layout from '../../components/Layout';
import { getCurrentSchool, getStudents, getAttendance, markAttendance } from '../../lib/data';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Download } from 'lucide-react';

export default function Attendance() {
  const school = getCurrentSchool();
  if (!school) return null;

  const students = getStudents(school.id);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendanceRecords, setAttendanceRecords] = useState(getAttendance({ date: selectedDate }));

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const record = markAttendance({
      studentId,
      classId: students.find(s => s.id === studentId)?.classId || '',
      date: selectedDate,
      status,
    });
    setAttendanceRecords([...attendanceRecords.filter(r => r.studentId !== studentId), record]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return '#22c55e';
      case 'absent': return '#ef4444';
      case 'late': return '#f59e0b';
      default: return '#8b90a8';
    }
  };

  return (
    <Layout currentPage="attendance">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Attendance Management</h1>
            <p className="text-sm text-muted-foreground">Track and manage student attendance</p>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setAttendanceRecords(getAttendance({ date: e.target.value }));
              }}
              className="px-4 py-2 bg-muted border border-border rounded-xl text-sm"
            />
            <button className="px-4 py-2 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
              <span className="text-xs text-muted-foreground">Present</span>
            </div>
            <div className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'present').length}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-[#ef4444]" />
              <span className="text-xs text-muted-foreground">Absent</span>
            </div>
            <div className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'absent').length}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#f59e0b]" />
              <span className="text-xs text-muted-foreground">Late</span>
            </div>
            <div className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'late').length}</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Grade</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 20).map((student, index) => {
                  const record = attendanceRecords.find(r => r.studentId === student.id);
                  return (
                    <tr key={student.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: ['#4f6ef7', '#22d3ee', '#22c55e'][index % 3] }}
                          >
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{student.firstName} {student.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{student.studentId}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">Grade {student.grade}</td>
                      <td className="py-3 px-4">
                        {record && (
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ 
                              background: `${getStatusColor(record.status)}20`,
                              color: getStatusColor(record.status)
                            }}
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                            className="px-2 py-1 bg-[rgba(34,197,94,0.1)] text-[#22c55e] rounded text-xs hover:bg-[rgba(34,197,94,0.2)] transition-colors"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                            className="px-2 py-1 bg-[rgba(239,68,68,0.1)] text-[#ef4444] rounded text-xs hover:bg-[rgba(239,68,68,0.2)] transition-colors"
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                            className="px-2 py-1 bg-[rgba(245,158,11,0.1)] text-[#f59e0b] rounded text-xs hover:bg-[rgba(245,158,11,0.2)] transition-colors"
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
