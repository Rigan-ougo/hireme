import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./App.scss";

const skills = [
  { name: "PHP", icon: "🐘", pct: 92, desc: "Backends, APIs, CMS" },
  { name: "JavaScript", icon: "⚡", pct: 88, desc: "ES6+, DOM, async" },
  { name: "React", icon: "⚛️", pct: 84, desc: "Hooks, SPA, state" },
  { name: "HTML/CSS", icon: "🎨", pct: 95, desc: "Responsive, animations" },
  { name: "MySQL", icon: "🗄️", pct: 80, desc: "Schemas, queries" },
  { name: "Laravel", icon: "🔴", pct: 78, desc: "MVC, Eloquent" },
  { name: "Node.js", icon: "🟢", pct: 72, desc: "Express APIs" },
  { name: "Git", icon: "🔀", pct: 85, desc: "Version control" },
];

const projects = [
  {
    title: "EduTrack Platform",
    desc: "School management system with grades and attendance.",
    tags: ["PHP", "Laravel", "MySQL"],
    year: "2024",
  },
  {
    title: "ShopEase Commerce",
    desc: "E-commerce system with M-Pesa integration.",
    tags: ["PHP", "JS", "API"],
    year: "2024",
  },
  {
    title: "HealthPulse Dashboard",
    desc: "Analytics dashboard with charts and booking system.",
    tags: ["React", "Node"],
    year: "2023",
  },
];

const navItems = ["Home", "Skills", "Projects", "Contact"];

const contacts = [
  { icon: <FaEnvelope />, name: "Email", sub: "riganougo@email.com" },
  { icon: <FaLinkedin />, name: "LinkedIn", sub: "linkedin.com/in/rigan-ougo" },
  { icon: <FaGithub />, name: "GitHub", sub: "https://github.com/Rigan-ougo" },
  { icon: <FaWhatsapp />, name: "WhatsApp", sub: "+254 111330050" },
];

export default function App() {
  const [active, setActive] = useState("Home");
  const [blink, setBlink] = useState(true);
  const [hoverSkill, setHoverSkill] = useState(null);
  const [hoverProject, setHoverProject] = useState(null);
  const [hoverContact, setHoverContact] = useState(null);

  // 🌙 THEME
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "dark" || saved === "light") ? saved : "dark";
  });

  // 📊 SCROLL PROGRESS
  const [scrollProgress, setScrollProgress] = useState(0);

  // blinking dot
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  // scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app">

      {/* 📊 SCROLL BAR */}
      <div
        className="scroll-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          R<span>.</span>OUGO
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-btn ${active === item ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* 🌙 THEME TOGGLE */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <button className="nav-cta" onClick={() => scrollTo("Contact")}>
          Hire Me
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="section">
        <div className="hero-tag">
          <span className={`dot ${blink ? "on" : ""}`}></span>
          Available for work
        </div>

        <h1 className="hero-name">
          Rigan <span>Ougo</span>
        </h1>

        <p>// Full-Stack Developer</p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("Projects")}>
            View Work
          </button>

          <button className="btn-secondary" onClick={() => scrollTo("Contact")}>
            Contact
          </button>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2>Skills</h2>

        <div className="skills-grid">
          {skills.map((s, i) => (
            <div
              key={i}
              className={`skill-card ${hoverSkill === i ? "active" : ""}`}
              onMouseEnter={() => setHoverSkill(i)}
              onMouseLeave={() => setHoverSkill(null)}
            >
              <div>{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>

              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`project-card ${hoverProject === i ? "active" : ""}`}
              onMouseEnter={() => setHoverProject(i)}
              onMouseLeave={() => setHoverProject(null)}
            >
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>

                <div>
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>{p.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Contact</h2>

        <div className="contact-grid">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={
                c.name === "Email"
                  ? `mailto:${c.sub}`
                  : c.name === "LinkedIn"
                  ? `https://${c.sub}`
                  : c.name === "GitHub"
                  ? c.sub
                  : c.name === "WhatsApp"
                  ? `https://wa.me/${c.sub.replace(/\D/g, "")}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
              className={`contact-card ${hoverContact === i ? "active" : ""}`}
              onMouseEnter={() => setHoverContact(i)}
              onMouseLeave={() => setHoverContact(null)}
            >
              <div>{c.icon}</div>
              <div>
                <h4>{c.name}</h4>
                <p>{c.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2026 Rigan Ougo — Frontend Developer
      </footer>
    </div>
  );
}