import Layout from '../../components/Layout';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

export default function StudentAttendance() {
  const attendanceData = [
    { date: '2026-03-27', status: 'present' },
    { date: '2026-03-26', status: 'present' },
    { date: '2026-03-25', status: 'present' },
    { date: '2026-03-24', status: 'late' },
    { date: '2026-03-23', status: 'present' },
  ];

  return (
    <Layout currentPage="attendance">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Attendance</h1>
          <p className="text-sm text-muted-foreground">Track your attendance record</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1 text-[#22c55e]">96%</div>
            <div className="text-xs text-muted-foreground">Attendance Rate</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">142</div>
            <div className="text-xs text-muted-foreground">Days Present</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold mb-1">6</div>
            <div className="text-xs text-muted-foreground">Days Absent</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Recent Attendance</h3>
          <div className="space-y-3">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <CheckCircle2 
                  className={`w-5 h-5 ${
                    record.status === 'present' ? 'text-[#22c55e]' : 'text-[#f59e0b]'
                  }`} 
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  record.status === 'present' 
                    ? 'bg-[rgba(34,197,94,0.2)] text-[#22c55e]' 
                    : 'bg-[rgba(245,158,11,0.2)] text-[#f59e0b]'
                }`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
