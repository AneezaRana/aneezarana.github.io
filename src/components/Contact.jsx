import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { personalInfo, serviceOptions } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', idea: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: personalInfo.web3formsKey,
          subject: `New portfolio message from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.idea,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', service: '', idea: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section min-h-screen">
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#1CD8D2] to-[#302b63] opacity-10 blur-[140px]" />
      </div>

      <div className="section-inner relative z-10 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center h-full"
        >
          <img
            src="/developer-workspace.png"
            alt="Developer working at a desk with code and dashboards"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="mb-2">
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-400 mt-4 text-base">
              Have a project in mind or just want to say hi? Fill out the form and I&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#1cd8d2] transition"
            >
              <HiMail className="text-lg text-[#1cd8d2]" />
              {personalInfo.email}
            </a>
          </div>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Name *
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#1cd8d2] focus:outline-none transition"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Email *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#1cd8d2] focus:outline-none transition"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Service Needed *
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#1cd8d2] focus:outline-none transition"
            >
              <option value="" disabled>Something in mind?</option>
              {serviceOptions.slice(1).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Idea *
            <textarea
              name="idea"
              value={form.idea}
              onChange={handleChange}
              placeholder="Enter your idea"
              rows={5}
              required
              className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-[#1cd8d2] focus:outline-none transition resize-y"
            />
          </label>

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
            whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
            className="w-full px-8 py-3.5 rounded-full gradient-btn text-white font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm text-center"
            >
              Thanks! Your message has been sent.
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              Something went wrong. Please try again or email me directly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
