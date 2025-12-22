import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects"; 

export default function Home() {
  return (
    <main className="min-h-screen pb-20"> 
       <Hero />
       
       <Skills /> 

       <Projects /> 
    </main>
  );
}