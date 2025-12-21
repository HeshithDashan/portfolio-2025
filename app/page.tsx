import Hero from "../components/Hero";
import Skills from "../components/Skills"; // අලුත් කෑල්ල Import කරා

export default function Home() {
  return (
    <main className="min-h-screen">
       <Hero />
       
       {/* Skills Section එක මෙතනට දැම්මා */}
       <Skills /> 
    </main>
  );
}