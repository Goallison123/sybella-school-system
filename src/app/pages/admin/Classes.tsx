import Layout from '../../components/Layout';
import { getCurrentSchool, getClasses, getTeacherById } from '../../lib/data';
import { BookOpen, Users, MapPin, Clock } from 'lucide-react';

export default function Classes() {
  const school = getCurrentSchool();
  if (!school) return null;

  const classes = getClasses(school.id);

  const getClassColor = (index: number) => {
    const colors = ['#4f6ef7', '#22d3ee', '#22c55e', '#f59e0b', '#7c5cfc', '#ec4899'];
    return colors[index % colors.length];
  };

  return (
    <Layout currentPage="classes">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Class Management</h1>
          <p className="text-sm text-muted-foreground">Manage classes, schedules, and assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classItem, index) => {
            const teacher = getTeacherById(classItem.teacherId);
            return (
              <div
                key={classItem.id}
                className="bg-card border border-border rounded-2xl p-5 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div 
                  className="w-full h-2 rounded-t-xl mb-4"
                  style={{ background: getClassColor(index) }}
                ></div>
                <h3 className="text-lg font-bold mb-2">{classItem.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{classItem.studentIds.length} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'No teacher'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{classItem.room}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Schedule</div>
                  <div className="space-y-1">
                    {classItem.schedule.map((schedule, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{schedule.day}: {schedule.startTime} - {schedule.endTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
