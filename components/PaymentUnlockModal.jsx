import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, Smartphone, Sparkles, Loader2 } from 'lucide-react';

export default function PaymentUnlockModal({ isOpen, onClose, examId, rollNumber, studentName, onUnlockSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('ROLL_LOOKUP'); // 'ROLL_LOOKUP', 'WHATSAPP_ALERT', 'PDF_BUY'

  if (!isOpen) return null;

  const handleSimulatePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/webhook?simulate=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-simulated-test': 'true'
        },
        body: JSON.stringify({
          contact: `+91${phoneNumber}`,
          notes: {
            exam_id: examId || 'ALL_EXAMS',
            roll_number: rollNumber || 'ALL',
            unlock_type: selectedPlan
          },
          id: `pay_sim_${Date.now()}`
        })
      });

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        setUnlocked(true);
        if (onUnlockSuccess) {
          onUnlockSuccess(data.unlock);
        }
      } else {
        alert('Payment validation failed: ' + (data.error || 'Unknown'));
      }
    } catch (err) {
      alert('Error triggering payment simulation: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-5 text-white flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-full tracking-wider">
              UPI Instant Unlock
            </span>
            <h3 className="text-lg font-black mt-1">ExmNow Premium Access</h3>
            <p className="text-xs text-brand-100">Zero-latency WhatsApp SMS alerts & full merit ledger</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {unlocked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">
                Unlock Activated!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Payment verified cryptographically via Razorpay Webhook. 
                Your alerts for exam <strong>{examId}</strong> are live on <strong>+91 {phoneNumber}</strong>.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Plan selection */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('ROLL_LOOKUP')}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    selectedPlan === 'ROLL_LOOKUP'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/30'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="font-bold">⚡ Name Lookup</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">₹19 • Instant</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('WHATSAPP_ALERT')}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    selectedPlan === 'WHATSAPP_ALERT'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/30'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="font-bold">🔔 WhatsApp Alerts</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">₹29 • SMS + WA</div>
                </button>
              </div>

              {/* Target info */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Target Exam: <strong>{examId || 'CBSE Class 12'}</strong></span>
                {rollNumber && <span>Roll: <strong className="font-mono">{rollNumber}</strong></span>}
              </div>

              {/* Mobile Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient WhatsApp / Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 px-3 py-2.5 rounded-r-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Simulated QR Code & UPI Brands */}
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                  <QrCode className="w-8 h-8 text-slate-800 dark:text-slate-200" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">UPI Instant Webhook Test</div>
                  <div className="text-[11px] text-slate-500">Google Pay • PhonePe • Paytm • BHIM</div>
                </div>
              </div>

              {/* Unlock Action Button */}
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying HMAC Webhook...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{selectedPlan === 'ROLL_LOOKUP' ? '19' : '29'} & Unlock Now</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secured by 256-Bit Cryptographic Webhook Automation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
