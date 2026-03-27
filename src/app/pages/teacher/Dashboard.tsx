import Layout from '../../components/Layout';
import { getCurrentUser, getCurrentSchool, getClassesByTeacher, getNotifications } from '../../lib/data';
import { BookOpen, Calendar, Users, Bell, Clock, CheckCircle2 } from 'lucide-react';

export default function TeacherDashboard() {
  const user = getCurrentUser();
  const school = getCurrentSchool();
  if (!user || !school) return null;

  const myClasses = getClassesByTeacher(user.id);
  const notifications = getNotifications(user.id);

  const todaySchedule = [
    { time: '09:00', class: 'Mathematics - Grade 10A', room: 'Room 101', status: 'upcoming' },
    { time: '10:30', class: 'Mathematics - Grade 10B', room: 'Room 101', status: 'upcoming' },
    { time: '13:00', class: 'Mathematics - Grade 11A', room: 'Room 101', status: 'upcoming' },
  ];

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening with your classes today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <BookOpen className="w-6 h-6 text-[#4f6ef7] mb-3" />
            <div className="text-2xl font-bold mb-1">{myClasses.length}</div>
            <div className="text-xs text-muted-foreground">My Classes</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <Users className="w-6 h-6 text-[#22d3ee] mb-3" />
            <div className="text-2xl font-bold mb-1">
              {myClasses.reduce((sum, cls) => sum + cls.studentIds.length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Students</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <Calendar className="w-6 h-6 text-[#22c55e] mb-3" />
            <div className="text-2xl font-bold mb-1">{todaySchedule.length}</div>
            <div className="text-xs text-muted-foreground">Classes Today</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <Bell className="w-6 h-6 text-[#f59e0b] mb-3" />
            <div className="text-2xl font-bold mb-1">{notifications.filter(n => !n.read).length}</div>
            <div className="text-xs text-muted-foreground">New Notifications</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Today's Schedule</h3>
              <p className="text-xs text-muted-foreground mt-1">Your classes for today</p>
            </div>
            <div className="p-4 space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex gap-3 items-center p-3 bg-muted rounded-xl">
                  <div className="font-mono text-xs text-muted-foreground w-12">
                    {item.time}
                  </div>
                  <div className="w-1 h-10 bg-[#4f6ef7] rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.class}</div>
                    <div className="text-xs text-muted-foreground font-mono">{item.room}</div>
                  </div>
                  {index === 0 && (
                    <span className="text-xs px-3 py-1 bg-[rgba(79,110,247,0.2)] text-[#4f6ef7] rounded-full font-semibold">
                      Next
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-xs text-muted-foreground mt-1">Recent updates and alerts</p>
            </div>
            <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex gap-3 items-start p-3 bg-muted rounded-xl">
                  <Bell className="w-4 h-4 text-[#4f6ef7] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{notif.title}</div>
                    <div className="text-xs text-muted-foreground">{notif.message}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-2">
                      {new Date(notif.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Classes */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">My Classes</h3>
              <p className="text-xs text-muted-foreground mt-1">All your assigned classes</p>
            </div>
            <div className="p-4 grid md:grid-cols-2 gap-4">
              {myClasses.map((classItem, index) => (
                <div
                  key={classItem.id}
                  className="bg-muted rounded-xl p-4 border border-border hover:border-[#4f6ef7] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">{classItem.name}</h4>
                      <p className="text-xs text-muted-foreground">{classItem.room}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Users className="w-3.5 h-3.5" />
                    <span>{classItem.studentIds.length} students</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 bg-card rounded-lg text-xs font-medium hover:bg-secondary transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1.5 bg-[rgba(79,110,247,0.1)] text-[#4f6ef7] rounded-lg text-xs font-medium hover:bg-[rgba(79,110,247,0.2)] transition-colors">
                      Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: CheckCircle2, label: 'Mark Attendance', color: '#22c55e' },
            { icon: Users, label: 'View Students', color: '#4f6ef7' },
            { icon: Bell, label: 'Send Notice', color: '#22d3ee' },
            { icon: Calendar, label: 'Schedule', color: '#f59e0b' },
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
