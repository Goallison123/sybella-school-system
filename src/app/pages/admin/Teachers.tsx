import Layout from '../../components/Layout';
import { getCurrentSchool, getTeachers } from '../../lib/data';
import { Users, Mail, Phone, BookOpen, Calendar } from 'lucide-react';

export default function Teachers() {
  const school = getCurrentSchool();
  if (!school) return null;

  const teachers = getTeachers(school.id);

  const getAvatarColor = (index: number) => {
    const colors = ['#4f6ef7', '#22d3ee', '#22c55e', '#f59e0b', '#7c5cfc', '#ec4899'];
    return colors[index % colors.length];
  };

  return (
    <Layout currentPage="teachers">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Teacher Management</h1>
          <p className="text-sm text-muted-foreground">Manage teaching staff and assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: getAvatarColor(index) }}
                >
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{teacher.firstName} {teacher.lastName}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{teacher.teacherId}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{teacher.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{teacher.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
