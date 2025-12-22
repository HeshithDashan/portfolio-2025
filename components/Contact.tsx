"use client"
import React, { useState } from 'react';
import { useDevMode } from './DevModeContext';

export default function Contact() {
  const { isDevMode } = useDevMode();
  
  // Form එකේ ඩේටා තියාගන්න
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // බොරුවට යවනවා වගේ පෙන්නන්න (Simulation)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // තත්පර 3කින් මැසේජ් එක අයින් කරන්න
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-20 px-5 max-w-4xl mx-auto mb-20">
      
      {/* ----------------- GOD MODE (Terminal Input) ----------------- */}
      {isDevMode ? (
        <div className="border-2 border-green-800 bg-black p-8 font-mono shadow-[0_0_30px_rgba(0,255,0,0.15)] relative overflow-hidden">
           {/* Matrix Background Effect (Optional decorative element) */}
           <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
              <p>ENCRYPTION: AES-256</p>
              <p>PORT: 443 (SECURE)</p>
           </div>

           <h3 className="text-green-500 text-xl mb-6">
             &gt; INITIATE_COMMUNICATION_PROTOCOL<span className="animate-pulse">_</span>
           </h3>

           {showSuccess ? (
             <div className="text-green-400 border border-green-500 p-4 bg-green-900/20">
               <p>&gt; MESSAGE_PACKET_SENT_SUCCESSFULLY</p>
               <p>&gt; STATUS_CODE: 200 OK</p>
               <p>&gt; RESETTING_CONNECTION...</p>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-green-700 text-xs mb-1">USER.NAME</label>
                 <div className="flex bg-black border-b border-green-800 focus-within:border-green-400">
                   <span className="text-green-600 mr-2">$</span>
                   <input 
                     type="text" 
                     className="bg-transparent w-full outline-none text-green-400 placeholder-green-900"
                     placeholder="enter_your_name"
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-green-700 text-xs mb-1">USER.EMAIL</label>
                 <div className="flex bg-black border-b border-green-800 focus-within:border-green-400">
                   <span className="text-green-600 mr-2">$</span>
                   <input 
                     type="email" 
                     className="bg-transparent w-full outline-none text-green-400 placeholder-green-900"
                     placeholder="enter_email_address"
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-green-700 text-xs mb-1">PAYLOAD.MESSAGE</label>
                 <div className="flex bg-black border-b border-green-800 focus-within:border-green-400">
                   <span className="text-green-600 mr-2">&gt;</span>
                   <textarea 
                     rows={3}
                     className="bg-transparent w-full outline-none text-green-400 placeholder-green-900 resize-none"
                     placeholder="type_message_content..."
                     required
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                   />
                 </div>
               </div>

               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="mt-4 px-6 py-2 bg-green-900/30 text-green-400 border border-green-600 hover:bg-green-600 hover:text-black transition-all uppercase tracking-widest text-sm w-full sm:w-auto"
               >
                 {isSubmitting ? "TRANSMITTING DATA..." : "[ EXECUTE_SEND ]"}
               </button>
             </form>
           )}
        </div>
      ) : (

      /* ----------------- NORMAL MODE (Clean Form) ----------------- */
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Get In Touch</h2>
            <p className="text-gray-500">Have a project in mind or just want to say hi?</p>
          </div>

          {showSuccess ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center animate-fade-in">
              Thanks! I'll get back to you soon. 👋
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <textarea 
                rows={4}
                placeholder="Message"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition transform hover:scale-[1.02]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      )}

    </section>
  );
}