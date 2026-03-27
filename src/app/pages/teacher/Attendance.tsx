import Layout from '../../components/Layout';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function TeacherAttendance() {
  return (
    <Layout currentPage="attendance">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Attendance Management</h1>
          <p className="text-sm text-muted-foreground">Mark and track attendance for your classes</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Select a class to mark attendance</p>
        </div>
      </div>
    </Layout>
  );
}
