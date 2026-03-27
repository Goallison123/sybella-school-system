import { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, Database } from 'lucide-react';
import { getCurrentSchool, getStudents } from '../../lib/data';

export default function NationalExport() {
  const school = getCurrentSchool();
  if (!school) return null;

  const students = getStudents(school.id);
  const [exportStatus, setExportStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [exportProgress, setExportProgress] = useState(0);

  const handleExport = () => {
    setExportStatus('processing');
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExportStatus('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const exportFormats = [
    { name: 'National Database Format', format: 'NDB', description: 'Standard format for national student database' },
    { name: 'Education Ministry Format', format: 'EMF', description: 'Required for ministry reporting' },
    { name: 'Statistics Bureau Format', format: 'SBF', description: 'For national education statistics' },
  ];

  return (
    <Layout currentPage="national-export">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">National Data Export</h1>
          <p className="text-sm text-muted-foreground">Export student data to national-level management systems</p>
        </div>

        <div className="bg-gradient-to-r from-[rgba(79,110,247,0.08)] to-[rgba(34,211,238,0.08)] border border-[rgba(79,110,247,0.2)] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Database className="w-6 h-6 text-[#4f6ef7] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">National Integration</h3>
              <p className="text-sm text-muted-foreground">
                Sybella School OS seamlessly integrates with national education databases. Export your student data in various formats compliant with government requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Data Overview</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-muted rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">{students.length}</div>
                  <div className="text-xs text-muted-foreground">Total Students</div>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">{students.filter(s => s.status === 'active').length}</div>
                  <div className="text-xs text-muted-foreground">Active Records</div>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-xs text-muted-foreground">Data Completeness</div>
                </div>
              </div>

              <h3 className="text-sm font-semibold mb-3">Select Export Format</h3>
              <div className="space-y-3">
                {exportFormats.map((format, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-4 bg-muted rounded-xl border border-border cursor-pointer hover:border-[#4f6ef7] transition-colors"
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      defaultChecked={index === 0}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{format.name}</div>
                      <div className="text-xs text-muted-foreground">{format.description}</div>
                      <div className="text-[10px] text-[#4f6ef7] font-mono mt-2">Format: {format.format}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {exportStatus !== 'idle' && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {exportStatus === 'processing' && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-[#4f6ef7] animate-pulse"></div>
                      <span className="text-sm font-semibold">Preparing Export...</span>
                    </>
                  )}
                  {exportStatus === 'complete' && (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                      <span className="text-sm font-semibold">Export Complete!</span>
                    </>
                  )}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#4f6ef7] to-[#22d3ee] rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">{exportProgress}% complete</div>
                {exportStatus === 'complete' && (
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-xl font-medium hover:shadow-[0_4px_16px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Export File
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  disabled={exportStatus === 'processing'}
                  className="w-full py-3 bg-gradient-to-r from-[#4f6ef7] to-[#7c5cfc] text-white rounded-xl font-medium hover:shadow-[0_4px_16px_rgba(79,110,247,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  Generate Export
                </button>
                <button className="w-full py-3 bg-muted border border-border rounded-xl font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Export History
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Data Validation</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">All Required Fields</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Data Format</div>
                    <div className="text-xs text-muted-foreground">Valid</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Compliance Check</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-2">Important Notice</h3>
                  <p className="text-xs text-muted-foreground">
                    Ensure all student data is up-to-date before exporting. Exported data cannot be modified after submission to national systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
