import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects"; // 1. අලුත් කෑල්ල මෙතනින් ගත්තා

export default function Home() {
  return (
    <main className="min-h-screen pb-20"> {/* 2. යටින් පොඩි ඉඩක් තිබ්බා (pb-20) */}
       <Hero />
       
       <Skills /> 

       {/* 3. Projects එක මෙතනට දැම්මා */}
       <Projects /> 
    </main>
  );
}