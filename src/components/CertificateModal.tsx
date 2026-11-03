import React from 'react';
import { Certificate } from '../types';
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white dark:bg-[#14213D] rounded-3xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Frame */}
        <div className="p-8 sm:p-10 border-4 border-double border-[#7057D9]/30 rounded-2xl bg-gradient-to-b from-[#F8F9FC] to-white dark:from-[#14213D] dark:to-slate-900 text-center relative">
          {/* Watermark / Seal Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#14213D] to-[#7057D9] flex items-center justify-center text-white shadow-lg shadow-[#7057D9]/20 mb-6">
            <Award className="w-8 h-8 text-[#35B8A0]" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-[#7057D9] dark:text-[#a89af0] mb-2">
            SkillUp Academy Verified Credential
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight mb-4">
            Certificate of Achievement
          </h2>

          <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mb-6">
            This certifies that
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#7057D9] dark:text-[#a89af0] border-b-2 border-[#E5E8F0] dark:border-slate-700 pb-2 max-w-md mx-auto mb-6">
            {certificate.userName}
          </h3>

          <p className="text-xs sm:text-sm text-[#20263A] dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
            has successfully completed all required modules, assessments, and practical exercises for
          </p>

          <p className="text-base sm:text-lg font-bold text-[#14213D] dark:text-white mb-6">
            {certificate.courseTitle}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4 border-t border-[#E5E8F0] dark:border-slate-800 text-left text-xs mb-8">
            <div>
              <p className="text-[#737B90] dark:text-slate-400">Date Issued</p>
              <p className="font-semibold text-[#14213D] dark:text-white">
                {new Date(certificate.issuedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-[#737B90] dark:text-slate-400">Instructor Verification</p>
              <p className="font-semibold text-[#14213D] dark:text-white">{certificate.instructorName}</p>
            </div>
          </div>

          {/* Verification Code Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8F9FC] dark:bg-slate-800/80 p-3 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs text-[#737B90] dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#35B8A0]" />
              ID: {certificate.verificationCode}
            </span>
            <span className="flex items-center gap-1 text-[#35B8A0] font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Criteria Fully Verified
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E5E8F0] dark:border-slate-700 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 text-[#20263A] dark:text-white flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Certificate
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f46c6] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
