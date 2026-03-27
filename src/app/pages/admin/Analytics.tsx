import Layout from '../../components/Layout';
import { getCurrentSchool, getEnrollmentTrend, getAttendanceStats } from '../../lib/data';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Calendar, BookOpen } from 'lucide-react';

export default function Analytics() {
  const school = getCurrentSchool();
  if (!school) return null;

  const enrollmentTrend = getEnrollmentTrend(school.id);
  const attendanceStats = getAttendanceStats(school.id);

  const gradeDistribution = [
    { grade: 'Grade 9', students: 125, color: '#4f6ef7' },
    { grade: 'Grade 10', students: 118, color: '#22d3ee' },
    { grade: 'Grade 11', students: 110, color: '#22c55e' },
    { grade: 'Grade 12', students: 97, color: '#f59e0b' },
  ];

  const performanceData = [
    { subject: 'Math', average: 82 },
    { subject: 'English', average: 88 },
    { subject: 'Science', average: 85 },
    { subject: 'History', average: 79 },
    { subject: 'Physics', average: 76 },
  ];

  const attendancePieData = [
    { name: 'Present', value: attendanceStats.present, color: '#22c55e' },
    { name: 'Absent', value: attendanceStats.absent, color: '#ef4444' },
    { name: 'Late', value: attendanceStats.late, color: '#f59e0b' },
  ];

  return (
    <Layout currentPage="analytics">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive insights into school performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg Attendance', value: `${attendanceStats.attendanceRate.toFixed(1)}%`, icon: Calendar, color: '#4f6ef7' },
            { label: 'Total Enrollment', value: '450', icon: Users, color: '#22d3ee' },
            { label: 'Active Classes', value: '24', icon: BookOpen, color: '#22c55e' },
            { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: '#f59e0b' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-xl p-5">
                <Icon className="w-6 h-6 mb-3" style={{ color: stat.color }} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Enrollment Trend</h3>
              <p className="text-xs text-muted-foreground mt-1">Student count over 12 months</p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#8b90a8" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#8b90a8" style={{ fontSize: '11px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1d28',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="students" fill="#4f6ef7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Today's Attendance Distribution</h3>
              <p className="text-xs text-muted-foreground mt-1">Current attendance breakdown</p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={attendancePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1d28',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Grade Distribution</h3>
              <p className="text-xs text-muted-foreground mt-1">Students per grade level</p>
            </div>
            <div className="p-5 space-y-4">
              {gradeDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.grade}</span>
                    <span className="font-semibold">{item.students} students</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(item.students / 125) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Subject Performance</h3>
              <p className="text-xs text-muted-foreground mt-1">Average scores by subject</p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="#8b90a8" style={{ fontSize: '11px' }} domain={[0, 100]} />
                  <YAxis dataKey="subject" type="category" stroke="#8b90a8" style={{ fontSize: '11px' }} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1d28',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="average" fill="#22d3ee" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
