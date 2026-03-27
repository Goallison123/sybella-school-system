import Layout from '../../components/Layout';
import { MessageSquare } from 'lucide-react';

export default function TeacherCommunications() {
  return (
    <Layout currentPage="communications">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Messages</h1>
          <p className="text-sm text-muted-foreground">Communicate with students and parents</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No messages yet</p>
        </div>
      </div>
    </Layout>
  );
}
