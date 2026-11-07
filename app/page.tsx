'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  BarChart3, Code2, Database, Download, Fingerprint,
  Layers3, Mail, Menu, ShieldCheck, Umbrella, X,
  Linkedin, Cpu, Palette, Landmark, ChevronLeft,
  ChevronRight, ChartLine,
} from 'lucide-react';

const nav = [
  { label: 'Home', id: 0 }, { label: 'About', id: 1 }, { label: 'Projects', id: 2 },
  { label: 'Beyond QA', id: 3 },
];

const projects = [
  { title: 'Finance Services', desc: 'Testing financial service processes and transaction flows.', icon: Landmark, art: 'art-finance' },
  { title: 'Tax Calculation', desc: 'Validating tax rules, formulas, and calculation accuracy.', icon: BarChart3, art: 'art-tax' },
  { title: 'Database Validation', desc: 'Ensuring data integrity, consistency, and accurate mapping.', icon: Database, art: 'art-data' },
  { title: 'Banking Screening', desc: 'Testing customer screening (KYC) and risk assessment processes.', icon: ShieldCheck, art: 'art-bank' },
  { title: 'Insurance Product', desc: 'Validating insurance product configuration, policy, and business rules.', icon: Umbrella, art: 'art-insurance' },
  { title: 'AML System', desc: 'Testing transaction monitoring, alert rules, and regulatory compliance.', icon: Fingerprint, art: 'art-aml' },
];

const interests = [
  { title: 'AI Enthusiast', desc: 'Exploring AI tools, automation, and real-world use cases to boost productivity.', icon: Cpu, art: 'wave' },
  { title: 'Crypto Trading', desc: 'Analyzing crypto markets, market structure, liquidity, and trading opportunities.', icon: ChartLine, art: 'candles' },
  { title: 'Stock Market & Investing', desc: 'Following market trends, fundamental and technical analysis, and long-term investing.', icon: BarChart3, art: 'market' },
  { title: 'Design & Creativity', desc: 'Exploring visual design, UI/UX, branding, typography, and digital content.', icon: Palette, art: 'type' },
];

const experience = [
  { role: 'UAT Tester', company: 'Sun Life Indonesia', period: 'Mar 2025 — Present' },
  { role: 'QA Analyst', company: 'AXA Mandiri', period: 'Apr 2024 — Feb 2025' },
  { role: 'QA / QC', company: 'Asuransi Astra Buana', period: 'Jun 2022 — Mar 2024' },
  { role: 'BA Implementer', company: 'PT Dopay Aplikasi Indonesia', period: 'May 2020 — Dec 2020' },
];

const slideVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 70 : -70, filter: 'blur(5px)' }),
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: .72, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -55 : 55, filter: 'blur(4px)', transition: { duration: .38, ease: [0.4, 0, 1, 1] } }),
};

function Brand() {
  return <a className="brand" href="#home" aria-label="OJ Portfolio"><span className="brand-symbol">OJ<span>.</span></span><b>PORTFOLIO</b></a>;
}

function SlideCount({ index }: { index: number }) {
  return <div className="slide-count"><span>0{index + 1}</span><i>/</i>05 <div className="count-track"><span style={{ width: `${(index + 1) * 20}%` }} /></div></div>;
}

function Portrait({ className = '' }: { className?: string }) {
  return <div className={`portrait-wrap ${className}`}><img src="/images/portrait-cutout.png" alt="Portrait of Oktavianus Jeffry" /></div>;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const lastWheel = useRef(0);

  const goTo = useCallback((next: number) => {
    const target = Math.max(0, Math.min(4, next));
    if (target === active) return;
    setDirection(target > active ? 1 : -1);
    setActive(target);
    setMenuOpen(false);
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goTo(active + 1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goTo(active - 1); }
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)').matches;
    if (!desktop || paused) return;
    const timer = window.setInterval(() => setActive((current) => { setDirection(1); return (current + 1) % 5; }), 9000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (window.matchMedia('(max-width: 760px)').matches) return;
      if (Math.abs(event.deltaY) < 18) return;
      const now = Date.now();
      if (now - lastWheel.current < 1050) return;
      lastWheel.current = now;
      goTo(active + (event.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [active, goTo]);

  const handleTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 65) goTo(active + (delta > 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <main className="portfolio" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <header className="topbar">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => <button key={item.id} className={active === item.id ? 'nav-link active' : 'nav-link'} onClick={() => goTo(item.id)}>{item.label}</button>)}
        </nav>
        <button className="contact-pill" onClick={() => goTo(4)}>Get in Touch <ArrowUpRight size={13} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      {menuOpen && <div className="mobile-nav">{nav.map((item) => <button key={item.id} onClick={() => goTo(item.id)}>{item.label}<ArrowUpRight size={14}/></button>)}<button onClick={() => goTo(4)}>Get in Touch<ArrowUpRight size={14}/></button></div>}

      <div className="stage" aria-live="polite">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section key={active} className={`slide slide-${active + 1}`} custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit">
            {active === 0 && <>
              <div className="hero-kicker"><span className="white-rule"/> SOFTWARE TESTING &amp; QUALITY ENGINEERING</div>
              <div className="hero-title" aria-label="Quality Assurance"><span>QUALITY</span><span>ASSURANCE</span></div>
              <Portrait className="hero-portrait" />
              <div className="hero-bottom-name"><strong>OKTAVIANUS<br/>JEFFRY</strong><i/></div>
              <div className="hero-specialties">{['TESTING','AUTOMATION','FINANCE','INSURANCE','BANKING'].map(x => <span key={x}>{x}</span>)}<i/></div>
              <div className="hero-mark">OJ<span>.</span></div>
              <div className="hero-role-label">SOFTWARE QUALITY<br/>ASSURANCE ENGINEER</div>
              <div className="hero-scroll" onClick={() => goTo(1)}>SCROLL DOWN <ArrowDown size={16}/></div>
            </>}

            {active === 1 && <>
              <div className="slide-eyebrow"><b>/ 02</b></div>
              <div className="about-layout">
                <h1 className="display-heading">ABOUT<br/>ME</h1>
                <div className="about-copy">
                  <div className="about-name"><h2>OKTAVIANUS<br/>JEFFRY</h2><i/><span>SOFTWARE QUALITY<br/>ASSURANCE ENGINEER</span></div>
                  <p className="about-description">A detail-oriented QA professional with <b>5+ years</b> of experience in software testing, specializing in banking, financial services, and insurance systems. I ensure product quality through structured testing, problem analysis, and collaboration with cross-functional teams.</p>
                  <div className="stats-row">
                    <div><BriefcaseBusiness/><strong>5+</strong><span>Years of<br/>Experience</span></div>
                    <div><Layers3/><strong>4</strong><span>Companies<br/>Insurance, Banking,<br/>Software House</span></div>
                    <div><Code2/><strong>6</strong><span>Major Project<br/>Domains</span></div>
                  </div>
                  <div className="why-card"><h3>WHY <em>QA?</em></h3><p>I enjoy making sure systems work reliably, are user-friendly, and deliver real value. For me, QA is not just about finding bugs, but about building trust and quality in every release.</p></div>
                </div>
              </div>
              <Portrait className="about-portrait" />
            </>}

            {active === 2 && <>
              <div className="slide-eyebrow"><b>/ 03</b></div>
              <div className="section-intro"><h1 className="display-heading">SELECTED<br/>PROJECTS</h1><p>A collection of key project domains I&apos;ve worked on across banking, finance, insurance, and complex systems.</p></div>
              <div className="project-grid">{projects.map((project, i) => { const Icon = project.icon; return <motion.article className="project-tile" key={project.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .07, duration: .5 }}><div className={`tile-art ${project.art}`}><div className="art-grid"/><Icon size={29}/></div><div className="tile-content"><h3>{project.title}</h3><p>{project.desc}</p><ArrowUpRight size={17}/></div></motion.article>; })}</div>
            </>}

            {active === 3 && <>
              <div className="slide-eyebrow"><b>/ 04</b></div>
              <div className="beyond-layout"><h1 className="display-heading">BEYOND<br/>QA</h1><div className="beyond-content"><p className="beyond-intro">The things I&apos;m passionate about beyond software testing.</p><div className="interest-list">{interests.map((item, i) => { const Icon = item.icon; return <motion.article className="interest-card" key={item.title} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + i * .09 }}><div className={`interest-art ${item.art}`}><Icon size={27}/></div><div><h3>{item.title}</h3><p>{item.desc}</p></div><ArrowRight size={17}/></motion.article>; })}</div></div></div>
            </>}

            {active === 4 && <>
              <div className="slide-eyebrow"><b>/ 05</b></div>
              <div className="contact-layout"><h1 className="display-heading">GET IN<br/>TOUCH</h1><div className="contact-content"><h2>Interested in collaboration,<br/>opportunities, or just want to say hi?</h2><p>Feel free to reach out!</p><div className="contact-links"><a href="mailto:oktavianusjeffry020@gmail.com"><Mail/><span><b>Email</b><small>oktavianusjeffry020@gmail.com</small></span><ArrowRight/></a><a href="https://linkedin.com/in/oktajeffryp/" target="_blank" rel="noreferrer"><Linkedin/><span><b>LinkedIn</b><small>linkedin.com/in/oktajeffryp/</small></span><ArrowRight/></a><a className="cv-link" href="/files/Oktavianus-Jeffry-Pradhana-CV.pdf" download><Download/><span><b>Download CV</b><small>Oktavianus-Jeffry-Pradhana-CV.pdf</small></span><ArrowDownRight/></a></div></div></div>
              <div className="architecture-art"><div/><div/><div/><div/><div/></div>
            </>}
          </motion.section>
        </AnimatePresence>
      </div>

      <footer className="deck-footer"><SlideCount index={active}/><div className="slide-controls"><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide"><ChevronLeft size={17}/></button><button onClick={() => goTo(active + 1)} disabled={active === 4} aria-label="Next slide"><ChevronRight size={17}/></button></div><span className="footer-note">© 2026 OKTAVIANUS JEFFRY</span></footer>
      <div className="mobile-progress" aria-hidden="true"><span style={{ width: `${(active + 1) * 20}%` }}/></div>
    </main>
  );
}
