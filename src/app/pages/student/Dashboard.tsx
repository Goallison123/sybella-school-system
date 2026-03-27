import Layout from '../../components/Layout';
import { getCurrentUser, getCurrentSchool, getClassesByStudent } from '../../lib/data';
import { BookOpen, Calendar, Award, TrendingUp } from 'lucide-react';

export default function StudentDashboard() {
  const user = getCurrentUser();
  const school = getCurrentSchool();
  if (!user || !school) return null;

  const myClasses = getClassesByStudent(user.id);

  const stats = [
    { label: 'My Classes', value: myClasses.length, icon: BookOpen, color: '#4f6ef7' },
    { label: 'Attendance', value: '96%', icon: Calendar, color: '#22c55e' },
    { label: 'Average Grade', value: 'A-', icon: Award, color: '#22d3ee' },
    { label: 'Rank', value: '12th', icon: TrendingUp, color: '#f59e0b' },
  ];

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="text-sm text-muted-foreground">Your academic overview</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
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
              <h3 className="font-semibold">My Classes</h3>
              <p className="text-xs text-muted-foreground mt-1">Enrolled courses</p>
            </div>
            <div className="p-4 space-y-3">
              {myClasses.map((classItem) => (
                <div key={classItem.id} className="flex gap-3 items-center p-3 bg-muted rounded-xl">
                  <BookOpen className="w-5 h-5 text-[#4f6ef7]" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{classItem.name}</div>
                    <div className="text-xs text-muted-foreground">{classItem.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold">Upcoming Assignments</h3>
              <p className="text-xs text-muted-foreground mt-1">Due this week</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-3 items-center p-3 bg-muted rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Math Assignment 5</div>
                  <div className="text-xs text-muted-foreground">Due tomorrow</div>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 bg-muted rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Science Project</div>
                  <div className="text-xs text-muted-foreground">Due in 3 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
