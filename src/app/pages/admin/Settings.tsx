import Layout from '../../components/Layout';
import { getCurrentSchool } from '../../lib/data';
import { School, Palette, Bell, Lock, Globe } from 'lucide-react';

export default function Settings() {
  const school = getCurrentSchool();
  if (!school) return null;

  return (
    <Layout currentPage="settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">School Settings</h1>
          <p className="text-sm text-muted-foreground">Customize your school's Sybella platform</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <School className="w-5 h-5 text-[#4f6ef7]" />
              <h2 className="font-semibold">School Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2">School Name</label>
                <input
                  type="text"
                  defaultValue={school.name}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Principal</label>
                <input
                  type="text"
                  defaultValue={school.principal}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={school.email}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={school.phone}
                  className="w-full px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-[#22d3ee]" />
              <h2 className="font-semibold">Branding & Theme</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Primary Color</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    defaultValue={school.primaryColor}
                    className="w-16 h-10 rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    defaultValue={school.primaryColor}
                    className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Secondary Color</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    defaultValue={school.secondaryColor}
                    className="w-16 h-10 rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    defaultValue={school.secondaryColor}
                    className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-xl focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 transition-all outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">School Logo</label>
                <div className="flex gap-3 items-center">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${school.primaryColor}, ${school.secondaryColor})` }}
                  >
                    {school.logo}
                  </div>
                  <button className="px-4 py-2.5 bg-muted border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
                    Upload Logo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-[#22c55e]" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                'Email notifications for new student enrollments',
                'SMS alerts for attendance issues',
                'Parent communication notifications',
                'Grade update notifications',
                'System maintenance alerts',
              ].map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl cursor-pointer hover:bg-secondary transition-colors">
                  <input type="checkbox" defaultChecked={index < 3} className="w-4 h-4" />
                  <span className="text-sm flex-1">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-[#f59e0b]" />
              <h2 className="font-semibold">Security & Privacy</h2>
            </div>
            <div className="space-y-3">
              {[
                'Two-factor authentication',
                'Require password change every 90 days',
                'Session timeout after 30 minutes',
                'Enable audit logging',
              ].map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl cursor-pointer hover:bg-secondary transition-colors">
                  <input type="checkbox" defaultChecked={index === 0 || index === 3} className="w-4 h-4" />
                  <span className="text-sm flex-1">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-3 bg-muted border border-border rounded-xl font-medium hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
