import Layout from '../../components/Layout';
import { Award, TrendingUp } from 'lucide-react';

export default function StudentGrades() {
  const grades = [
    { subject: 'Mathematics', grade: 'A', score: 92, teacher: 'Mr. Anderson' },
    { subject: 'English', grade: 'A-', score: 88, teacher: 'Ms. Thomas' },
    { subject: 'Science', grade: 'B+', score: 85, teacher: 'Dr. Taylor' },
    { subject: 'History', grade: 'A', score: 91, teacher: 'Mr. Moore' },
    { subject: 'Physics', grade: 'B', score: 82, teacher: 'Dr. Jackson' },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#22c55e';
    if (grade.startsWith('B')) return '#22d3ee';
    if (grade.startsWith('C')) return '#f59e0b';
    return '#8b90a8';
  };

  return (
    <Layout currentPage="grades">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Grades</h1>
          <p className="text-sm text-muted-foreground">View your academic performance</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <Award className="w-6 h-6 text-[#22c55e] mb-3" />
            <div className="text-2xl font-bold mb-1">A-</div>
            <div className="text-xs text-muted-foreground">Overall Average</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <TrendingUp className="w-6 h-6 text-[#4f6ef7] mb-3" />
            <div className="text-2xl font-bold mb-1">12th</div>
            <div className="text-xs text-muted-foreground">Class Rank</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold">Subject Grades</h3>
            <p className="text-xs text-muted-foreground mt-1">Current semester performance</p>
          </div>
          <div className="p-4 space-y-3">
            {grades.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ 
                    backgroundColor: `${getGradeColor(item.grade)}20`,
                    color: getGradeColor(item.grade)
                  }}
                >
                  {item.grade}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">{item.subject}</div>
                  <div className="text-xs text-muted-foreground">{item.teacher}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{item.score}%</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
