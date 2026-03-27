import Layout from '../../components/Layout';
import { getCurrentUser, getClassesByStudent } from '../../lib/data';
import { BookOpen, MapPin, Clock } from 'lucide-react';

export default function StudentClasses() {
  const user = getCurrentUser();
  if (!user) return null;

  const myClasses = getClassesByStudent(user.id);

  return (
    <Layout currentPage="classes">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Classes</h1>
          <p className="text-sm text-muted-foreground">View your enrolled classes and schedule</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClasses.map((classItem, index) => (
            <div
              key={classItem.id}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="w-full h-2 bg-[#4f6ef7] rounded-t-xl mb-4"></div>
              <h3 className="text-lg font-bold mb-3">{classItem.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{classItem.room}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Schedule</div>
                  {classItem.schedule.map((schedule, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs mb-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>{schedule.day}: {schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
