import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Lock, Mail, Building2 } from 'lucide-react';
import { login, getSchools } from '../lib/data';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [error, setError] = useState('');
  const schools = getSchools();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !schoolId) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password, schoolId);
    if (result) {
      const { user } = result;
      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (user.role === 'student') {
        navigate('/student/dashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const quickLogin = (role: 'admin' | 'teacher' | 'student') => {
    const emails = {
      admin: 'admin@riverside.edu',
      teacher: 'teacher1@riverside.edu',
      student: 'student1@riverside.edu',
    };
    setEmail(emails[role]);
    setPassword('demo123');
    setSchoolId('school-1');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#08090e] via-[#0e1018] to-[#13151f] p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4f6ef7] rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22d3ee] rounded-full blur-[128px] opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f6ef7] via-[#7c5cfc] to-[#22d3ee] mb-4 shadow-[0_0_40px_rgba(79,110,247,0.4)]">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sybella School OS</h1>
          <p className="text-[#8b90a8] text-sm">Advanced School Data Management System</p>
          <p className="text-[#555a75] text-xs mt-1">© 2026 Sybella Systems. All rights reserved.</p>
        </div>

        {/* Login form */}
        <div className="bg-[#1a1d28] border border-[rgba(255,255,255,0.07)] rounded-2xl p-8 shadow-[0_8px_48px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* School selection */}
            <div>
              <label className="block text-sm font-medium text-[#8b90a8] mb-2">
                Select School
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555a75]" />
                <select
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-xl text-white focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                >
                  <option value="">Choose your school...</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#8b90a8] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555a75]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@school.edu"
                  className="w-full pl-11 pr-4 py-3 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-xl text-white placeholder:text-[#555a75] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#8b90a8] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555a75]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-xl text-white placeholder:text-[#555a75] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-xl p-3 text-sm text-[#ef4444]">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white font-semibold rounded-xl hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.07)]">
            <p className="text-xs text-[#555a75] mb-3 text-center">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('admin')}
                className="px-3 py-2 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-lg text-xs text-[#8b90a8] hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all"
              >
                Admin
              </button>
              <button
                onClick={() => quickLogin('teacher')}
                className="px-3 py-2 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-lg text-xs text-[#8b90a8] hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all"
              >
                Teacher
              </button>
              <button
                onClick={() => quickLogin('student')}
                className="px-3 py-2 bg-[#13151f] border border-[rgba(255,255,255,0.07)] rounded-lg text-xs text-[#8b90a8] hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all"
              >
                Student
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">🎓</div>
            <p className="text-xs text-[#8b90a8]">Student Management</p>
          </div>
          <div>
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-[#8b90a8]">Analytics & Reports</p>
          </div>
          <div>
            <div className="text-2xl mb-1">💬</div>
            <p className="text-xs text-[#8b90a8]">Parent Communications</p>
          </div>
        </div>
      </div>
    </div>
  );
}
