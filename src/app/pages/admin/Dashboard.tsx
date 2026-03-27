import Layout from '../../components/Layout';
import { 
  Users, GraduationCap, BookOpen, Calendar, 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle2,
  Clock, Bell
} from 'lucide-react';
import { 
  getCurrentSchool, getStudents, getTeachers, getClasses,
  getAttendanceStats, getEnrollmentTrend
} from '../../lib/data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const school = getCurrentSchool();
  if (!school) return null;

  const students = getStudents(school.id);
  const teachers = getTeachers(school.id);
  const classes = getClasses(school.id);
  const attendanceStats = getAttendanceStats(school.id);
  const enrollmentTrend = getEnrollmentTrend(school.id);

  const stats = [
    {
      label: 'Total Students',
      value: students.length,
      change: '+12%',
      trend: 'up',
      icon: GraduationCap,
      color: 'from-[#4f6ef7] to-[#7c5cfc]',
    },
    {
      label: 'Total Teachers',
      value: teachers.length,
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'from-[#22d3ee] to-[#4f6ef7]',
    },
    {
      label: 'Active Classes',
      value: classes.length,
      change: 'Stable',
      trend: 'neutral',
      icon: BookOpen,
      color: 'from-[#22c55e] to-[#16a34a]',
    },
    {
      label: 'Attendance Rate',
      value: `${attendanceStats.attendanceRate.toFixed(1)}%`,
      change: '+2.5%',
      trend: 'up',
      icon: Calendar,
      color: 'from-[#f59e0b] to-[#d97706]',
    },
  ];

  const recentActivities = [
    { text: 'New student enrollment: Emma Johnson (Grade 10)', time: '10 minutes ago', color: '#22d3ee' },
    { text: 'Teacher Sarah Anderson uploaded grades for Mathematics', time: '25 minutes ago', color: '#4f6ef7' },
    { text: 'Parent meeting scheduled for next week', time: '1 hour ago', color: '#22c55e' },
    { text: 'Attendance marked for all Grade 9 classes', time: '2 hours ago', color: '#f59e0b' },
  ];

  const todaySchedule = [
    { time: '09:00', class: 'Mathematics - Grade 10A', room: 'Room 101', color: '#4f6ef7' },
    { time: '10:30', class: 'English - Grade 11B', room: 'Room 203', color: '#22d3ee' },
    { time: '13:00', class: 'Science - Grade 9A', room: 'Lab 1', color: '#22c55e' },
    { time: '14:30', class: 'History - Grade 12A', room: 'Room 305', color: '#7c5cfc' },
  ];

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-[rgba(79,110,247,0.08)] to-[rgba(124,92,252,0.08)] border border-[rgba(79,110,247,0.2)] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#4f6ef7] animate-pulse"></div>
            <h3 className="text-sm font-semibold">AI-Powered Insights</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex gap-3 p-3 bg-card rounded-xl border border-border">
              <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="text-foreground">Attendance is <strong>5% above</strong> last month's average. Great progress!</span>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-card rounded-xl border border-border">
              <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="text-foreground"><strong>3 classes</strong> need attendance updates for today.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-5 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
                <Icon className="w-7 h-7 text-foreground mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium mb-3">{stat.label}</div>
                <div className={`flex items-center gap-1 text-xs ${
                  stat.trend === 'up' ? 'text-[#22c55e]' : stat.trend === 'down' ? 'text-[#ef4444]' : 'text-muted-foreground'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrollment Trend */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Student Enrollment Trend</h3>
              <p className="text-xs text-muted-foreground mt-1">Monthly enrollment over the past year</p>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#8b90a8" 
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis stroke="#8b90a8" style={{ fontSize: '11px' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1a1d28',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="#4f6ef7" 
                    strokeWidth={2}
                    dot={{ fill: '#4f6ef7', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Today's Schedule</h3>
              <p className="text-xs text-muted-foreground mt-1">Upcoming classes</p>
            </div>
            <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex gap-3 items-center border-b border-border pb-3 last:border-0">
                  <div className="font-mono text-xs text-muted-foreground w-12 flex-shrink-0">
                    {item.time}
                  </div>
                  <div 
                    className="w-1 h-9 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.class}</div>
                    <div className="text-xs text-muted-foreground font-mono">{item.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Attendance Overview */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Today's Attendance</h3>
              <p className="text-xs text-muted-foreground mt-1">Real-time attendance tracking</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#22c55e]">{attendanceStats.present}</div>
                  <div className="text-xs text-muted-foreground">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ef4444]">{attendanceStats.absent}</div>
                  <div className="text-xs text-muted-foreground">Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#f59e0b]">{attendanceStats.late}</div>
                  <div className="text-xs text-muted-foreground">Late</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Present</span>
                    <span className="font-medium">{((attendanceStats.present / attendanceStats.total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#22c55e] rounded-full transition-all duration-1000"
                      style={{ width: `${(attendanceStats.present / attendanceStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Absent</span>
                    <span className="font-medium">{((attendanceStats.absent / attendanceStats.total) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ef4444] rounded-full transition-all duration-1000"
                      style={{ width: `${(attendanceStats.absent / attendanceStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Recent Activity</h3>
              <p className="text-xs text-muted-foreground mt-1">Latest updates across the system</p>
            </div>
            <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3 items-start border-b border-border pb-3 last:border-0">
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: activity.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-xs leading-relaxed">{activity.text}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Add Student', color: '#4f6ef7' },
            { icon: GraduationCap, label: 'Add Teacher', color: '#22d3ee' },
            { icon: Bell, label: 'Send Notice', color: '#22c55e' },
            { icon: Clock, label: 'Mark Attendance', color: '#f59e0b' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="bg-card border border-border rounded-xl p-4 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: action.color }} />
                <div className="text-xs font-semibold text-muted-foreground">{action.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
