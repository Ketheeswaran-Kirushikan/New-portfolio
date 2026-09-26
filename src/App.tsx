import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Certificates } from "./components/Certificates";
import { Passions } from "./components/Passions";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Backdrop, Marquee } from "./components/ui";
import { MotionPreferences } from "./components/MotionPreferences";

export default function App() {
  return (
    <MotionPreferences>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Marquee
          items={[
            "React",
            "Next.js",
            "Node.js",
            "MongoDB",
            "AWS",
            "Figma",
            "Tailwind CSS",
            "Express",
          ]}
        />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Certificates />
        <Passions />
        <Contact />
      </main>
      <Footer />
    </MotionPreferences>
  );
}
