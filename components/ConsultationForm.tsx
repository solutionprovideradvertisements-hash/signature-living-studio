'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '@/components/EventTracking';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    budget_direction: '',
    timeline: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showModal, setShowModal] = useState(false);

  const [validation, setValidation] = useState({
    name: { error: '', touched: false, valid: false },
    email: { error: '', touched: false, valid: false },
    phone: { error: '', touched: false, valid: false, operator: '' },
    message: { error: '', touched: false, valid: false },
    project: { error: '', touched: false, valid: false },
    budget: { error: '', touched: false, valid: false },
  });

  const SOFT_LIMIT = 500;
  const HARD_LIMIT = 550;
  const WARN_PCT = 0.90;

  const NAME_MIN = 2;
  const NAME_MAX = 60;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/;
  const BD_PHONE_REGEX = /^01[3-9]\\d{8}$/;

  const validateName = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === '') return 'Please enter your full name.';
    if (trimmed.length < NAME_MIN) return `Name must be at least ${NAME_MIN} characters.`;
    if (trimmed.length > NAME_MAX) return `Name cannot exceed ${NAME_MAX} characters.`;
    if (!/^[\\p{L}\\s'\\-\\.]+$/u.test(trimmed)) return 'Name should only contain letters, spaces, or hyphens.';
    return '';
  };

  const validateEmail = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed === '') return ''; // Optional but good to validate if provided
    if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address (e.g. name@domain.com).';
    const domain = trimmed.split('@')[1] || '';
    if (!domain.includes('.') || domain.endsWith('.')) return 'Email domain looks incomplete. Please double-check.';
    return '';
  };

  const validatePhone = (value: string) => {
    const digits = value.replace(/\\D/g, '');
    if (digits === '') return 'Please enter your phone number.';
    if (!digits.startsWith('01')) return 'Must start with 01 followed by 3–9 (e.g. 01714442288).';
    if (digits.length < 11) return 'Phone number must be 11 digits (e.g. 01314442288).';
    if (digits.length > 11) return 'Phone number cannot exceed 11 digits.';
    if (!BD_PHONE_REGEX.test(digits)) return 'Enter a valid Bangladeshi mobile number.';
    return '';
  };

  const validateProject = (value: string) => {
    if (value === '') return 'Please select a project type.';
    return '';
  };

  const validateBudget = (value: string) => {
    if (value === '') return 'Please select a budget direction.';
    return '';
  };

  const validateMessage = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length > SOFT_LIMIT) {
      const excess = trimmed.length - SOFT_LIMIT;
      return `${excess} character${excess === 1 ? '' : 's'} over the limit. Please shorten your message.`;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    // First focus tracking
    if (!validation[id as keyof typeof validation]?.touched) {
      const hasFocus = Object.values(validation).some(v => v.touched);
      if (!hasFocus && id === 'contact_name') {
        trackEvent('form_start');
      }
    }

    if (id === 'contact_phone') {
      let digits = value.replace(/\\D/g, '');
      if (digits.startsWith('880') && digits.length > 11) {
        digits = '0' + digits.slice(3);
      }
      if (digits.length > 11) digits = digits.slice(0, 11);
      setFormData(prev => ({ ...prev, phone: digits }));
      const err = validatePhone(digits);
      setValidation(prev => ({
        ...prev, phone: { error: err, touched: true, valid: err === '' && digits.length === 11, operator: '' }
      }));
    } else if (id === 'contact_name') {
      setFormData(prev => ({ ...prev, name: value }));
      const err = validateName(value);
      setValidation(prev => ({ ...prev, name: { error: err, touched: value.length > 0, valid: err === '' && value.length > 0 } }));
    } else if (id === 'contact_email') {
      setFormData(prev => ({ ...prev, email: value }));
      const err = validateEmail(value);
      setValidation(prev => ({ ...prev, email: { error: err, touched: value.length > 0, valid: err === '' } }));
    } else if (id === 'contact_message') {
      if (value.length > HARD_LIMIT) return;
      setFormData(prev => ({ ...prev, message: value }));
      const err = validateMessage(value);
      setValidation(prev => ({ ...prev, message: { error: err, touched: true, valid: err === '' } }));
    }
  };

  const isFormReady = 
    validation.name.valid && 
    validation.phone.valid && 
    validation.project.valid && 
    validation.budget.valid &&
    (!formData.email || validation.email.valid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormReady) return;

    setStatus('loading');
    trackEvent('form_submit', { project_type: formData.project_type, budget_direction: formData.budget_direction });
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      trackEvent('form_success', { project_type: formData.project_type, budget_direction: formData.budget_direction });
      setTimeout(() => {
        setShowModal(true);
      }, 800);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form bg-[#121212] p-6 lg:p-10 rounded-xl max-w-4xl w-full mx-auto" noValidate>
        <div className="mb-8 border-b border-white/10 pb-6 text-center">
          <h3 className="text-3xl font-serif text-[#C9A24D] mb-2">Start With a Private Consultation</h3>
          <p className="text-sm text-[#D8C3A5]">Share a few details. Our team will review your scope and contact you with the next step.</p>
        </div>

        {/* Row 1: Name + Phone */}
        <div className={`form-group field-name ${validation.name.touched ? (validation.name.valid ? 'is-valid' : 'is-invalid') : ''}`}>
          <label htmlFor="contact_name">
            Full Name <span className="required-star" aria-hidden="true">*</span>
          </label>
          <input type="text" id="contact_name" value={formData.name} onChange={handleChange} required placeholder="e.g. Rahim Hossain" />
        </div>

        <div className={`form-group field-phone ${validation.phone.touched ? (validation.phone.valid ? 'is-valid' : 'is-invalid') : ''}`}>
          <label htmlFor="contact_phone">
            Phone Number (WhatsApp) <span className="required-star" aria-hidden="true">*</span>
          </label>
          <input type="tel" id="contact_phone" value={formData.phone} onChange={handleChange} required placeholder="01XXX-XXXXXX" inputMode="numeric" />
        </div>

        {/* Row 2: Email + Location */}
        <div className={`form-group field-email ${validation.email.touched ? (validation.email.valid ? 'is-valid' : 'is-invalid') : ''}`}>
          <label htmlFor="contact_email">Email Address</label>
          <input type="email" id="contact_email" value={formData.email} onChange={handleChange} placeholder="e.g. rahim@example.com" />
        </div>

        <div className="form-group field-project">
          <label htmlFor="project_type">Project Type <span className="required-star" aria-hidden="true">*</span></label>
          <select id="project_type" required value={formData.project_type} onChange={(e) => {
            setFormData(prev => ({ ...prev, project_type: e.target.value }));
            setValidation(prev => ({ ...prev, project: { error: '', touched: true, valid: true } }));
          }}>
            <option value="" disabled>Select Project Type</option>
            <option value="apartment_interior">Apartment Interior</option>
            <option value="villa_interior">Villa / Duplex Interior</option>
            <option value="kitchen_design">Kitchen Design</option>
            <option value="wardrobe_storage">Wardrobe / Storage</option>
            <option value="full_home_turnkey">Full Home Turnkey</option>
            <option value="office_commercial">Office / Commercial</option>
            <option value="restaurant_retail">Restaurant / Retail Fit-Out</option>
            <option value="nri_remote">NRI / Remote Project</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Row 3: Budget + Timeline */}
        <div className="form-group field-budget">
          <label htmlFor="budget_direction">Budget Direction <span className="required-star" aria-hidden="true">*</span></label>
          <select id="budget_direction" required value={formData.budget_direction} onChange={(e) => {
            setFormData(prev => ({ ...prev, budget_direction: e.target.value }));
            setValidation(prev => ({ ...prev, budget: { error: '', touched: true, valid: true } }));
          }}>
            <option value="" disabled>Select Budget Direction</option>
            <option value="below_5l">Below ৳5L</option>
            <option value="5l_to_10l">৳5L–৳10L</option>
            <option value="10l_to_20l">৳10L–৳20L</option>
            <option value="20l_to_40l">৳20L–৳40L</option>
            <option value="40l_plus">৳40L+</option>
          </select>
        </div>

        <div className="form-group field-timeline">
          <label htmlFor="timeline">Timeline</label>
          <select id="timeline" value={formData.timeline} onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}>
            <option value="" disabled>Select Timeline</option>
            <option value="urgent">Urgent</option>
            <option value="within_1_month">Within 1 month</option>
            <option value="1_to_3_months">1–3 months</option>
            <option value="3_to_6_months">3–6 months</option>
            <option value="still_planning">Still planning</option>
          </select>
        </div>

        <div className="form-group field-message col-span-1 md:col-span-2">
          <label htmlFor="contact_message">Project Brief</label>
          <div className="textarea-wrapper">
            <textarea id="contact_message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your space, rooms, location, timeline or specific requirements."></textarea>
          </div>
        </div>

        <div className="field-submit col-span-1 md:col-span-2 mt-4 text-center items-center justify-center pt-6 border-t border-white/10">
          <button type="submit" disabled={!isFormReady || status !== 'idle'}
            className={`w-full md:w-auto bg-[#C9A24D] text-[#050505] font-bold py-4 px-12 rounded hover:bg-[#E4C878] transition-colors uppercase tracking-widest text-sm`}
          >
            {status === 'idle' ? 'Request Private Consultation' : status === 'loading' ? 'Sending...' : 'Request Sent'}
          </button>
          <p className="text-xs text-center text-[#8A8379] mt-3">We usually respond within 24 hours. No obligation.</p>
        </div>
      </form>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}>
              <div className="modal-header">
                <div className="modal-icon-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F7D5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h2 id="modal-title" className="text-2xl font-serif text-[#C9A24D]">Request Received!</h2>
              </div>
              <div className="modal-body text-white/80">
                <p className="mb-4">Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your project request has been successfully sent.</p>
                <p>We will contact you within 24 hours to understand your space, timeline and scope.</p>
              </div>
              <div className="modal-footer mt-8">
                <button onClick={() => setShowModal(false)} className="w-full bg-[#1A1410] border border-[#C9A24D] text-[#C9A24D] py-3 rounded hover:bg-[#C9A24D] hover:text-[#050505] transition-colors">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
