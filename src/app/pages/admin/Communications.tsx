import { useState } from 'react';
import Layout from '../../components/Layout';
import { Send, MessageSquare, Mail, Users, AlertCircle } from 'lucide-react';
import { getCurrentSchool, sendCommunication, getCommunications } from '../../lib/data';

export default function Communications() {
  const school = getCurrentSchool();
  if (!school) return null;

  const [communications] = useState(getCommunications(school.id));
  const [recipient, setRecipient] = useState('all-parents');
  const [type, setType] = useState<'announcement' | 'message' | 'alert' | 'parent-notice'>('announcement');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!subject || !message) return;
    
    sendCommunication({
      schoolId: school.id,
      from: 'admin',
      to: [recipient],
      type,
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    });

    setSubject('');
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <Layout currentPage="communications">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Communications</h1>
          <p className="text-sm text-muted-foreground">Send messages to parents, teachers, and students</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Send New Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipients</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                >
                  <option value="all-parents">All Parents</option>
                  <option value="all-teachers">All Teachers</option>
                  <option value="all-students">All Students</option>
                  <option value="grade-9">Grade 9 Parents</option>
                  <option value="grade-10">Grade 10 Parents</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                >
                  <option value="announcement">Announcement</option>
                  <option value="message">General Message</option>
                  <option value="alert">Alert/Urgent</option>
                  <option value="parent-notice">Parent Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter message subject..."
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSend}
                className="w-full py-3 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {communications.map((comm) => (
                <div key={comm.id} className="bg-muted rounded-xl p-4 border border-border">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      comm.type === 'alert' ? 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]' :
                      comm.type === 'announcement' ? 'bg-[rgba(79,110,247,0.2)] text-[#4f6ef7]' :
                      'bg-[rgba(34,197,94,0.2)] text-[#22c55e]'
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{comm.subject}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          comm.type === 'alert' ? 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]' :
                          comm.type === 'announcement' ? 'bg-[rgba(79,110,247,0.2)] text-[#4f6ef7]' :
                          'bg-[rgba(34,197,94,0.2)] text-[#22c55e]'
                        }`}>
                          {comm.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{comm.message}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-2">
                        {new Date(comm.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
