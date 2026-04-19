/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Layout, 
  Server, 
  Smartphone,
  Menu,
  X,
  Send
} from 'lucide-react';

// --- Types ---

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
}

// --- Components ---

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = useMemo(() => [
    { name: 'Home', href: '#home', icon: Layout },
    { name: 'About', href: '#about', icon: Code2 },
    { name: 'Projects', href: '#projects', icon: Server },
    { name: 'Contact', href: '#contact', icon: Mail },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Attach scroll to main container
    const main = document.getElementById('main-viewport');
    if (main) {
      main.addEventListener('scroll', handleScroll);
      return () => main.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className="w-24 bg-white border-r border-brand-border hidden md:flex flex-col items-center py-8 justify-between sticky top-0 h-screen shrink-0">
      <div className="text-brand-primary font-bold text-3xl tracking-tighter">R.</div>
      
      <div className="flex flex-col gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            title={link.name}
            className={`p-3 rounded-xl transition-all ${
              activeSection === link.href.slice(1) 
                ? 'text-brand-primary bg-blue-50 shadow-sm' 
                : 'text-slate-400 hover:text-brand-primary hover:bg-slate-50'
            }`}
          >
            <link.icon size={24} strokeWidth={2} />
          </a>
        ))}
      </div>

      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary text-[10px] font-bold ring-2 ring-white">
        ID
      </div>
    </nav>
  );
};

// Update Mobile Nav as well for consistency
const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-full border border-slate-100 px-6 py-4 flex justify-between items-center">
      <a href="#home" className="text-xl font-bold text-brand-primary">R.</a>
      <div className="flex gap-6">
        <a href="#home" className="text-slate-400 hover:text-brand-primary"><Layout size={20} /></a>
        <a href="#about" className="text-slate-400 hover:text-brand-primary"><Code2 size={20} /></a>
        <a href="#projects" className="text-slate-400 hover:text-brand-primary"><Server size={20} /></a>
        <a href="#contact" className="text-slate-400 hover:text-brand-primary"><Mail size={20} /></a>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-[600px] flex items-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-12 shadow-sm relative overflow-hidden"
      >
        <div className="flex-1 z-10">
          <span className="text-brand-primary font-bold tracking-widest text-[10px] uppercase bg-blue-50 px-3 py-1 rounded-full mb-6 inline-block">
            Sedia untuk Bekerja
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mt-2 mb-6 leading-tight">
            Halo, saya <span className="text-brand-primary underline decoration-blue-200 underline-offset-8">Rafa</span>.
          </h1>
          <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed font-medium">
            Web Developer pemula yang antusias menciptakan pengalaman digital yang bersih, responsif, dan fungsional dari Indonesia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-brand-primary text-white rounded-full font-semibold shadow-xl shadow-blue-200 hover:bg-brand-primary/90 transition-all"
            >
              Hubungi Saya
            </a>
            <a 
              href="#projects" 
              className="px-8 py-4 bg-white border border-brand-border text-slate-700 rounded-full font-semibold hover:bg-slate-50 transition-all"
            >
              Lihat Proyek
            </a>
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col items-center justify-center relative w-80 h-80 shrink-0">
          <div className="absolute inset-0 bg-blue-50 rounded-full -mb-12 border border-blue-100/50" />
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800" 
            alt="Profil" 
            className="w-64 h-64 rounded-full object-cover shadow-2xl relative z-10 ring-8 ring-white"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const skills = [
    { name: 'HTML', desc: 'Semantic Markup', color: 'text-blue-400' },
    { name: 'CSS', desc: 'Flex/Grid Layout', color: 'text-indigo-400' },
    { name: 'JS', desc: 'ES6+ Interactions', color: 'text-cyan-400' },
    { name: 'UI', desc: 'Clean Designs', color: 'text-brand-accent' },
  ];

  return (
    <section id="about" className="py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-4 bg-brand-dark rounded-[32px] p-8 text-white relative shadow-2xl overflow-hidden min-h-[400px] flex flex-col"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full" />
          <h3 className="text-2xl font-bold mb-8">Keahlian & Teknologi</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {skills.map((skill) => (
              <div key={skill.name} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className={`${skill.color} font-bold text-xl mb-1`}>{skill.name}</div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{skill.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Berfokus pada pembangunan situs web yang pixel-perfect untuk membantu bisnis tumbuh."
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
          className="lg:col-span-8 bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm"
        >
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-6">Tentang Saya</h2>
          <h3 className="text-4xl font-bold text-brand-dark mb-8 leading-tight">
            Menciptakan Solusi Digital dengan <br /> <span className="text-brand-primary italic">Ketelitian & Semangat.</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <p className="text-slate-500 leading-relaxed font-medium">
                  Saya adalah seorang pembelajar cepat dan peminat teknologi yang berbasis di Indonesia. Sebagai Web Developer pemula, saya fokus menguasai fundamental web modern untuk membangun solusi yang bermanfaat.
                </p>
             </div>
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-50 rounded-xl text-brand-primary"><Layout size={20} /></div>
                  <div>
                    <h5 className="font-bold text-brand-dark">Frontend Focused</h5>
                    <p className="text-sm text-slate-500">Menciptakan antarmuka yang intuitif.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Smartphone size={20} /></div>
                  <div>
                    <h5 className="font-bold text-brand-dark">Mobile First</h5>
                    <p className="text-sm text-slate-500">Desain responsif untuk semua perangkat.</p>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Eco-Store UI",
      description: "Complete frontend for an e-commerce template with modern aesthetics.",
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
      tags: ["React", "UI/UX"],
      link: "#",
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      iconColor: 'text-blue-300'
    },
    {
      id: 2,
      title: "Task Manager",
      description: "Vanilla JS application for professional workflow tracking and tasks.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      tags: ["JavaScript", "Workflow"],
      link: "#",
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      iconColor: 'text-indigo-300'
    },
    {
      id: 3,
      title: "Weather App",
      description: "API-driven real-time forecast dashboard with dynamic components.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tags: ["API", "Real-time"],
      link: "#",
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-100',
      iconColor: 'text-cyan-300'
    }
  ];

  return (
    <section id="projects" className="py-12 px-4 md:px-8">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-4">Portofolio</h2>
          <h3 className="text-4xl font-bold text-brand-dark">Proyek Terpilih</h3>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors">
          Lihat Semua <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className={`w-full h-32 ${(project as any).bgColor} rounded-2xl mb-6 border ${(project as any).borderColor} flex items-center justify-center ${(project as any).iconColor} transition-colors overflow-hidden relative`}>
              <img 
                src={project.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" 
                referrerPolicy="no-referrer"
              />
              <ExternalLink size={32} />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{project.description}</p>
            </div>
            <a href={project.link} className="text-brand-primary text-xs font-bold flex items-center gap-1">
              Lihat Live <ChevronRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-12 px-4 md:px-8 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-6">Kontak</h2>
              <h3 className="text-4xl font-bold text-brand-dark mb-8 leading-tight">Mulai Projek <br /> <span className="text-brand-primary italic">Baru?</span></h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-500">
                  <Mail size={20} className="text-brand-primary" />
                  <span className="font-medium">hello@rafa.dev</span>
                </div>
                <div className="flex items-center gap-4 text-slate-500">
                  <Github size={20} className="text-brand-primary" />
                  <span className="font-medium">github.com/rafa-dev</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Nama Lengkap" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 bg-brand-light border border-brand-border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
              />
              <input 
                type="email" 
                placeholder="Alamat Email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-4 bg-brand-light border border-brand-border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 transition-all font-medium"
              />
              <textarea 
                placeholder="Apa yang bisa saya bantu?" 
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 bg-brand-light border border-brand-border rounded-2xl outline-none focus:ring-4 focus:ring-blue-100/50 transition-all font-medium resize-none"
              />
              <button className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold hover:shadow-xl transition-all shadow-lg active:scale-95 disabled:opacity-50">
                Kirim Pesan
              </button>
              {isSubmitted && <p className="text-green-600 text-sm font-bold text-center mt-2">Terima kasih! Pesan terkirim.</p>}
            </form>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
          className="lg:col-span-4 bg-brand-primary rounded-[32px] p-8 text-white flex flex-col justify-between shadow-xl"
        >
          <div>
            <h4 className="text-xl font-bold mb-4">Tersedia untuk Kolaborasi</h4>
            <p className="text-blue-100 leading-relaxed text-sm">
              Ingin mendiskusikan peluang kerja atau sekadar menyapa? Saluran saya selalu terbuka.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest">Waktu Respons</span>
              <span className="text-xs font-bold bg-white text-brand-primary px-2 py-0.5 rounded">{"< 24 Jam"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-32 right-8 hidden lg:flex justify-between items-center bg-white/80 backdrop-blur-md py-3 px-8 rounded-full border border-slate-100 shadow-sm z-50">
      <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
        © {new Date().getFullYear()} Rafa Portofolio. Dibangun dengan Ketelitian.
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-brand-primary transition-colors">GitHub</a>
        <a href="#" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-brand-primary transition-colors">LinkedIn</a>
        <a href="#" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-brand-primary transition-colors">Twitter</a>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="flex bg-brand-light min-h-screen overflow-hidden selection:bg-brand-primary selection:text-white">
      <Navbar />
      <MobileNav />
      <main id="main-viewport" className="flex-1 h-screen overflow-y-auto scroll-smooth">
        <div className="max-w-6xl mx-auto w-full pb-32">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

