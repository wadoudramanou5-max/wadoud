import { useEffect, useRef, useState } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hero from './assets/jj.jpeg';
import project1 from './assets/projet.png';
import project2 from './assets/blog.png';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Données statiques
const technologies = [
  { name: 'HTML', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg' },
  { name: 'PHP', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React Native', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Flutter', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' },
  { name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg' },
];

const services = [
  { name: 'Application web', description: 'Conception et développement d\'applications web modernes pour digitaliser votre entreprise. Je vous permet de quitter le papier et de passer au numérique.' },
  { name: 'Développement mobile', description: 'Applications mobiles pour iOS et Android.' },
  { name: 'UI/UX Design', description: 'Conception d\'interfaces utilisateur intuitives.' },
  { name: 'SEO', description: 'Optimisation pour les moteurs de recherche.' },
];

const testimonials = [
  { quote: 'Wadoud est un développeur exceptionnel. Son travail a transformé notre entreprise.', author: 'John Doe', position: 'CEO, TechCorp' },
  { quote: 'Grâce à Wadoud, notre application est devenue un succès. Son expertise est inestimable.', author: 'Jane Smith', position: 'CTO, Innovatech' },
  { quote: 'Wadoud a dépassé nos attentes. Son professionnalisme et sa créativité sont remarquables.', author: 'Alice Johnson', position: 'Product Manager, WebSolutions' },
];

const projects = [
  {
    name: 'Beauty-shop',
    description: 'Beauty Shop — Boutique en ligne conçue pour aider un petit commerce de cosmétiques à exister sur le web et à toucher des clients au-delà de sa boutique physique. Elle résout le problème du manque de visibilité et de la difficulté de contact pour les petits vendeurs, en offrant une vitrine simple où les clients peuvent découvrir les produits et commander directement, sans démarche compliquée.',
    image: project1,
    link: 'https://beauty-shop-mauve.vercel.app'
  },
  {
    name: 'BlogSphere',
    description: 'BlogSphere — Plateforme de blog en ligne qui répond au besoin de partager facilement des idées et des connaissances avec une communauté, sans avoir à gérer soi-même un site complexe. Elle permet à n\'importe quel utilisateur de créer un compte, de rédiger et publier ses propres articles, et de s\'interagir avec d\'autres blogueurs — offrant ainsi un espace d\'expression accessible à tous, du débutant au blogueur confirmé.',
    image: project2,
    link: 'https://blog-a0yr.onrender.com/'
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs pour les animations GSAP
  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroImageRef = useRef(null);
  const navbarRef = useRef(null);

  // 🔹 Préchargement réel des images + progression fluide
  useEffect(() => {
    const imagesToPreload = [hero, project1, project2];
    const totalSteps = imagesToPreload.length + 2; // +2 pour les fonts / rendu
    let completed = 0;

    const updateProgress = () => {
      completed++;
      const percent = Math.min((completed / totalSteps) * 100, 100);
      setProgress(percent);
      if (completed >= totalSteps) {
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => setLoading(false), 900);
      }
    };

    // Précharger les images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Délais artificiels pour un rendu fluide (fonts, DOM)
    setTimeout(updateProgress, 400);
    setTimeout(updateProgress, 800);

    // Sécurité : forcer la fin après 4s max
    const safety = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 4000);

    return () => clearTimeout(safety);
  }, []);

  // 🔹 Empêcher le scroll pendant le chargement ou quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = (loading || menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading, menuOpen]);

  // 🔹 Fermer le menu mobile automatiquement si on repasse en desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔹 Animation d'entrée GSAP (navbar + hero) au chargement de la page
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(navbarRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          heroTitleRef.current,
          { y: 40, opacity: 0, duration: 0.8 },
          '-=0.3'
        )
        .from(
          heroTextRef.current,
          { y: 30, opacity: 0, duration: 0.7 },
          '-=0.5'
        )
        .from(
          heroButtonsRef.current,
          { y: 20, opacity: 0, duration: 0.6 },
          '-=0.4'
        )
        .from(
          heroImageRef.current,
          { scale: 0.85, opacity: 0, duration: 0.9, ease: 'back.out(1.4)' },
          '-=0.7'
        );
    });

    return () => ctx.revert();
  }, [loading]);

  // 🔹 Animations au scroll avec GSAP ScrollTrigger (remplace l'IntersectionObserver)
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Titres de section : fondu + légère montée
      gsap.utils.toArray('.container h2').forEach((title) => {
        gsap.from(title, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Cartes (compétences, services, témoignages) : effet cascade
      gsap.utils
        .toArray('#competences, #services, #temoignages')
        .forEach((section) => {
          const cards = section.querySelectorAll('.card');
          if (!cards.length) return;
          gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });

      // Projets : présentation premium — voile qui se lève, image en parallax, contenu en cascade
      gsap.utils.toArray('.project-card').forEach((card) => {
        const wipe = card.querySelector('.project-media-wipe');
        const img = card.querySelector('.project-media img');
        const index = card.querySelector('.project-index');
        const content = card.querySelectorAll('.project-content > *');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(wipe, { scaleX: 0, duration: 1, ease: 'power4.inOut' })
          .from(img, { scale: 1.3, duration: 1.3, ease: 'power3.out' }, 0)
          .from(index, { opacity: 0, x: -12, duration: 0.5, ease: 'power2.out' }, 0.25)
          .from(
            content,
            { y: 28, opacity: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out' },
            0.4
          );

        // Léger parallax de l'image pendant le scroll
        gsap.to(img, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Section Contact : fondu global
      gsap.from('#contact > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Ancres de navigation en scroll fluide
    const handleAnchorClick = (e) => {
      const link = e.currentTarget;
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => link.addEventListener('click', handleAnchorClick));

    return () => {
      anchorLinks.forEach((link) => link.removeEventListener('click', handleAnchorClick));
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading]);

  // 🔹 ÉCRAN DE CHARGEMENT
  if (loading) {
    return (
      <div className={`loader-screen ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loader-content">
          <div className="loader-logo">
            Wadoud<span>.Dev</span>
          </div>

          <div className="loader-bar">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="loader-percent">{Math.round(progress)}%</div>

          <div className="loader-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`} ref={navbarRef}>
        <span className="logo">Wadoud.Dev</span>

        <div className="nav-links">
          <a href="#accueil">Accueil</a>
          <a href="#competences">Compétences</a>
          <a href="#services">Services</a>
          <a href="#projets">Projets</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="mobile-menu" aria-hidden={!menuOpen}>
          <a href="#accueil" onClick={() => setMenuOpen(false)}>Accueil</a>
          <a href="#competences" onClick={() => setMenuOpen(false)}>Compétences</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#projets" onClick={() => setMenuOpen(false)}>Projets</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Accueil */}
      <section id="accueil" className="container">
        <div className="left-column">
          <h1 ref={heroTitleRef}>Développeur <br /> fullstack</h1>
          <p ref={heroTextRef}>
            Je conçois des applications <em>web</em> élégantes et fonctionnelles pour lancer votre entreprise.
          </p>
          <p>Développeur fullstack passionné par la création d'expériences numériques exceptionnelles.</p>
          <div className="button-container" ref={heroButtonsRef}>
            <a href="#projets">Voir mes projets</a>
            <a href="#contact">Me contacter</a>
          </div>
        </div>
        <div className="right" ref={heroImageRef}>
          <img src={hero} alt="Photo de Wadoud" />
        </div>
      </section>

      {/* Compétences */}
      <section id="competences" className="container">
        <h2>Langages et outils</h2>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...technologies, ...technologies].map((tech, index) => (
              <div className="card" key={index}>
                <img src={tech.image} alt={tech.name} />
                <p>{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container">
        <h2>Services</h2>
        <div className="services">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="container">
        <h2>Ce qu'ils disent de moi</h2>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div className="card" key={index}>
              <p>"{testimonial.quote}"</p>
              <p>- {testimonial.author}</p>
              <p>{testimonial.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="container">
        <div className="projects-heading">
          <span className="section-label">Travaux sélectionnés</span>
          <h2>Projets déjà réalisés</h2>
        </div>
        <div className="project-image">
          {projects.map((project, index) => (
            <div className="card project-card" key={index}>
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="project-media">
                <div className="project-media-wipe"></div>
                <img src={project.image} alt={project.name} />
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>Voir le projet</span>
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container">
        <h2>Parlons de votre projet</h2>
        <p>
          Que vous ayez besoin d'une application web ou d'un site internet, je suis là pour vous aider à concrétiser votre idée.
          Contactez-moi et je vous répondrai sous 24 heures.
        </p>
        <div className="contact-links">
          <a href="mailto:wadoudramanou5@gmail.com">wadoudramanou5@gmail.com</a>
          <a href="https://wa.me/0197249886" target="_blank" rel="noopener noreferrer">
            Me contacter sur WhatsApp
          </a>
        </div>
        <hr />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Wadoud.Dev. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default App;