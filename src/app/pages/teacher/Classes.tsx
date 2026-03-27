import Layout from '../../components/Layout';
import { getCurrentUser, getClassesByTeacher } from '../../lib/data';
import { BookOpen, Users, MapPin, Clock } from 'lucide-react';

export default function TeacherClasses() {
  const user = getCurrentUser();
  if (!user) return null;

  const myClasses = getClassesByTeacher(user.id);

  return (
    <Layout currentPage="classes">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Classes</h1>
          <p className="text-sm text-muted-foreground">Manage your assigned classes and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myClasses.map((classItem, index) => (
            <div
              key={classItem.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full h-2 bg-[#4f6ef7] rounded-t-xl mb-4"></div>
              <h3 className="text-lg font-bold mb-3">{classItem.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{classItem.studentIds.length} Students</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{classItem.room}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">{classItem.schedule.length} sessions/week</span>
                </div>
              </div>
              <button className="w-full py-2.5 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl text-sm font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
