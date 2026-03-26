'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'info',
    message: ''
  });
  const [thankYou, setThankYou] = useState(false);

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((type: ToastState['type'], message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, type, message });
    toastTimeoutRef.current = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'Ad zorunludur';
        if (value.trim().length < 2 || value.trim().length > 50) return 'Ad 2-50 karakter arasında olmalıdır';
        if (!/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/.test(value.trim())) return 'Ad sadece harflerden oluşmalıdır';
        return undefined;
      case 'lastName':
        if (!value.trim()) return 'Soyad zorunludur';
        if (value.trim().length < 2 || value.trim().length > 50) return 'Soyad 2-50 karakter arasında olmalıdır';
        if (!/^[a-zA-ZÇçĞğİıÖöŞşÜü\s]+$/.test(value.trim())) return 'Soyad sadece harflerden oluşmalıdır';
        return undefined;
      case 'email':
        if (!value.trim()) return 'E-posta zorunludur';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Geçerli bir e-posta adresi giriniz';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Konu zorunludur';
        if (value.trim().length < 5 || value.trim().length > 200) return 'Konu 5-200 karakter arasında olmalıdır';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Mesaj zorunludur';
        if (value.trim().length < 20 || value.trim().length > 2000) return 'Mesaj 20-2000 karakter arasında olmalıdır';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData] || '');
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    (['firstName', 'lastName', 'email', 'subject', 'message'] as const).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        subject: true,
        message: true
      });
      showToast('error', 'Lütfen form hatalarını düzeltin');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        showToast('success', 'Mesajınız başarıyla gönderildi!');
        resetForm();
        setThankYou(true);
      } else {
        if (data.error?.details) {
          setErrors(data.error.details);
          setTouched({
            firstName: true,
            lastName: true,
            email: true,
            subject: true,
            message: true
          });
        }
        showToast('error', data.error?.message || 'Bir hata oluştu');
      }
    } catch (error) {
      showToast('error', 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full bg-[#1b1b20] border-none focus:ring-1 text-[#e4e1e9] font-mono p-4 transition-all duration-300 placeholder:opacity-20 outline-none";
  const inputErrorClass = "ring-1 ring-[#ef4444]";
  const labelClass = "font-mono text-xs text-[#bbcabf] uppercase tracking-widest block mb-2";
  const errorClass = "text-[#ef4444] text-xs font-mono mt-1";

  return (
    <div className="min-h-screen bg-[#131318] text-[#e4e1e9]">
      {/* Scanline effect */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-b from-transparent via-[rgba(78,222,163,0.03)] to-transparent pointer-events-none z-[100]" />
      <div className="fixed inset-0 pointer-events-none z-[60]" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))' }} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#131318]/80 backdrop-blur-xl border-none">
        <nav className="flex justify-between items-center px-8 py-4 w-full">
          <div className="text-xl font-black text-[#4edea3] tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            HG_CONSOLE
          </div>
          <div className="hidden md:flex items-center gap-8 uppercase tracking-tighter font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Link className="text-slate-400 hover:text-[#4edea3] transition-colors" href="/">Home</Link>
            <Link className="text-slate-400 hover:text-[#4edea3] transition-colors" href="/projects">Projects</Link>
            <Link className="text-slate-400 hover:text-[#4edea3] transition-colors" href="/blog">Stack</Link>
            <Link className="text-slate-400 hover:text-[#4edea3] transition-colors" href="/blog">Logs</Link>
            <span className="text-[#4edea3] border-b-2 border-[#4edea3] pb-1">Contact</span>
          </div>
          <button className="bg-[#4edea3] text-[#003824] px-4 py-1.5 rounded-sm font-mono text-sm font-bold uppercase hover:bg-[#6ffbbe] active:scale-95 duration-100 transition-all">
            // TERMINAL_LOGIN
          </button>
        </nav>
      </header>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-24 right-4 z-[200] p-4 rounded-lg shadow-2xl max-w-md font-mono text-sm animate-pulse ${
          toast.type === 'success' ? 'bg-[#22c55e]/20 border border-[#22c55e] text-[#22c55e]' :
          toast.type === 'error' ? 'bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]' :
          toast.type === 'warning' ? 'bg-[#f59e0b]/20 border border-[#f59e0b] text-[#f59e0b]' :
          'bg-[#3b82f6]/20 border border-[#3b82f6] text-[#3b82f6]'
        }`}>
          {toast.message}
        </div>
      )}

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb / Header */}
        <div className="mb-16">
          <div className="font-mono text-[#4edea3] text-xs mb-2 opacity-80 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            [SYSTEM://ACCESS_GRANTED] / ROOT / CONTACT
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ESTABLISH<br/><span className="text-[#4edea3] drop-shadow-[0_0_15px_rgba(78,222,163,0.3)]">CONNECTION</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#1f1f25] p-1 rounded-xl shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4edea3]/10 to-transparent pointer-events-none" />
            <div className="relative bg-[#131318] p-8 md:p-10 rounded-lg">
              <div className="flex items-center gap-3 mb-8 border-b border-[#3c4a42]/20 pb-4">
                <span className="font-mono text-[#4edea3] text-sm tracking-tighter">SEND_MESSAGE_PROTOCOL</span>
                <div className="h-px flex-1 bg-[#3c4a42]/10" />
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>settings_ethernet</span>
              </div>

              {thankYou ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#4edea3]/20 flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-[#4edea3]">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mesajınız Alındı!</h3>
                  <p className="text-[#bbcabf] mb-8">En kısa sürede size dönüş yapacağım. Teşekkürler!</p>
                  <button
                    onClick={() => setThankYou(false)}
                    className="bg-[#4edea3] text-[#003824] px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#6ffbbe] transition-all"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="firstName">&gt;_FIRST_NAME</label>
                      <input
                        className={`${inputBaseClass} ${touched.firstName && errors.firstName ? inputErrorClass : ''}`}
                        id="firstName"
                        placeholder="NULL"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        onBlur={() => handleBlur('firstName')}
                        disabled={isSubmitting}
                      />
                      {touched.firstName && errors.firstName && (
                        <div className={errorClass}>{errors.firstName}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="lastName">&gt;_LAST_NAME</label>
                      <input
                        className={`${inputBaseClass} ${touched.lastName && errors.lastName ? inputErrorClass : ''}`}
                        id="lastName"
                        placeholder="NULL"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        onBlur={() => handleBlur('lastName')}
                        disabled={isSubmitting}
                      />
                      {touched.lastName && errors.lastName && (
                        <div className={errorClass}>{errors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="email">&gt;_EMAIL_ADDRESS</label>
                    <input
                      className={`${inputBaseClass} ${touched.email && errors.email ? inputErrorClass : ''}`}
                      id="email"
                      placeholder="USER@DOMAIN.COM"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      disabled={isSubmitting}
                    />
                    {touched.email && errors.email && (
                      <div className={errorClass}>{errors.email}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="subject">&gt;_SUBJECT_HEADER</label>
                    <input
                      className={`${inputBaseClass} ${touched.subject && errors.subject ? inputErrorClass : ''}`}
                      id="subject"
                      placeholder="PROJECT_ENQUIRY"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      disabled={isSubmitting}
                    />
                    {touched.subject && errors.subject && (
                      <div className={errorClass}>{errors.subject}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="message">&gt;_TRANSMISSION_BODY</label>
                    <textarea
                      className={`${inputBaseClass} resize-none ${touched.message && errors.message ? inputErrorClass : ''}`}
                      id="message"
                      placeholder="ENTER_DATA..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      disabled={isSubmitting}
                    />
                    {touched.message && errors.message && (
                      <div className={errorClass}>{errors.message}</div>
                    )}
                    <div className="text-xs text-[#6b7280] font-mono mt-1">
                      {formData.message.length}/2000 karakter
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-[#4edea3] text-[#003824] font-black py-5 tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all hover:bg-[#6ffbbe] shadow-[0_0_30px_rgba(78,222,163,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin material-symbols-outlined">progress_activity</span>
                        <span>GÖNDERİLİYOR...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT_MESSAGE</span>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">send</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Status Card */}
            <div className="bg-[#1f1f25] p-6 rounded-xl border-l-4 border-[#4edea3]">
              <div className="flex items-center gap-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4edea3]"></span>
                </div>
                <span className="font-mono text-sm tracking-tighter font-bold text-[#4edea3]">SYSTEM_READY // AVAILABLE_FOR_NEW_PROJECTS</span>
              </div>
            </div>

            {/* Contact Grid */}
            <div className="space-y-6">
              <h3 className="font-mono text-xs text-[#86948a] uppercase tracking-[0.3em] font-bold">CONTACT_METADATA</h3>
              <a className="block group bg-[#1b1b20] hover:bg-[#1f1f25] transition-all p-6 rounded-lg" href="mailto:hikmet@hgconsole.dev">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#86948a] font-mono uppercase">Email</div>
                      <div className="font-mono text-[#e4e1e9] group-hover:text-[#4edea3] transition-colors">hikmet@hgconsole.dev</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#86948a] group-hover:text-[#4edea3] transition-all">north_east</span>
                </div>
              </a>
              <div className="block group bg-[#1b1b20] p-6 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-[#c0c1ff]/10 flex items-center justify-center text-[#c0c1ff]">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#86948a] font-mono uppercase">Location</div>
                    <div className="font-mono text-[#e4e1e9]">Türkiye (UTC+3)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6 pt-4">
              <h3 className="font-mono text-xs text-[#86948a] uppercase tracking-[0.3em] font-bold">EXTERNAL_NODES</h3>
              <div className="grid grid-cols-3 gap-4">
                <a className="bg-[#1b1b20] hover:bg-[#4edea3]/20 aspect-square flex items-center justify-center rounded-lg transition-all group" href="https://github.com/hikmetgulsesli" target="_blank" rel="noopener noreferrer">
                  <svg className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a className="bg-[#1b1b20] hover:bg-[#4edea3]/20 aspect-square flex items-center justify-center rounded-lg transition-all group" href="https://linkedin.com/in/hikmetgulsesli" target="_blank" rel="noopener noreferrer">
                  <svg className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a className="bg-[#1b1b20] hover:bg-[#4edea3]/20 aspect-square flex items-center justify-center rounded-lg transition-all group" href="https://twitter.com/hikmetgulsesli" target="_blank" rel="noopener noreferrer">
                  <svg className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Decorative Terminal Card */}
            <div className="bg-[#0e0e13] p-6 rounded-lg font-mono text-[10px] border border-[#3c4a42]/5">
              <div className="flex gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#ffb4ab]/40"></div>
                <div className="w-2 h-2 rounded-full bg-[#ffb3af]/40"></div>
                <div className="w-2 h-2 rounded-full bg-[#4edea3]/40"></div>
              </div>
              <div className="space-y-1 text-[#bbcabf]">
                <div className="flex gap-2"><span className="text-[#4edea3]">&gt;</span> npm install passion@latest</div>
                <div className="flex gap-2"><span className="text-[#4edea3]">&gt;</span> checking connectivity...</div>
                <div className="flex gap-2"><span className="text-[#4edea3]">&gt;</span> signal strength: 100%</div>
                <div className="flex gap-2 text-[#4edea3]/80"><span className="text-[#4edea3]">&gt;</span> ready for communication <span className="inline-block w-[10px] h-[1.2em] bg-[#4edea3] ml-1 animate-pulse"></span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-[#1b1b20] bg-[#131318]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <div className="flex flex-col gap-2">
            <div className="text-[#4edea3] font-black tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>HG_CONSOLE</div>
            <div className="font-mono text-xs opacity-50 text-slate-600">
              © 2024 HG_CONSOLE // TERMINAL_ACCESS_GRANTED
            </div>
          </div>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-slate-600">
            <a className="hover:text-[#4edea3] transition-colors underline-offset-4 hover:underline" href="#">Privacy</a>
            <a className="hover:text-[#4edea3] transition-colors underline-offset-4 hover:underline" href="#">Security</a>
            <a className="hover:text-[#4edea3] transition-colors underline-offset-4 hover:underline" href="#">Status</a>
          </div>
          <div className="flex items-center gap-3 bg-[#1b1b20] px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]"></div>
            <span className="font-mono text-[10px] text-[#bbcabf] uppercase">All Systems Nominal</span>
          </div>
        </div>
      </footer>

      {/* Bottom NavBar (Mobile only) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center p-2 pb-6 bg-[#131318]/90 backdrop-blur-lg border-t border-[#4edea3]/10 shadow-2xl md:hidden z-50">
        <Link className="flex flex-col items-center justify-center text-slate-500 p-2 font-mono text-[10px] uppercase" href="/">
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-slate-500 p-2 font-mono text-[10px] uppercase" href="/projects">
          <span className="material-symbols-outlined">terminal</span>
          <span>Projects</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-slate-500 p-2 font-mono text-[10px] uppercase" href="/blog">
          <span className="material-symbols-outlined">layers</span>
          <span>Stack</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#4edea3] bg-[#4edea3]/10 rounded-lg p-2 font-mono text-[10px] uppercase" href="/contact">
          <span className="material-symbols-outlined">alternate_email</span>
          <span>Contact</span>
        </Link>
      </nav>
    </div>
  );
}
