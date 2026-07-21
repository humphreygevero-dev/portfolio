import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar';
import SectionDivider from './components/SectionDivider';
import Hero from './sections/Hero';
import About from './sections/About';
import TechMarquee from './sections/TechMarquee';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Background />
      <ChatWidget />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <SectionDivider />
          <About />
          <SectionDivider flip />
          <Experience />
          <SectionDivider />
          <Skills />
          <SectionDivider flip />
          <Projects />
          <SectionDivider />
          <Testimonials />
          <SectionDivider flip />
          <Blog />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
