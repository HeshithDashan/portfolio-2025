import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";

async function getGithubData() {
  const username = "HesithDashan"; 

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res.json();

  } catch (error) {
    console.log("⚠️ Using Offline Data...");
    
    return {
      avatar_url: "/profile.png", 
      name: "Heshith Dashan",
      bio: "Code. Learn. Build. Repeat. Software Engineer ⚙️ | Open Source Contributor 🌎 | Always curious 🧘‍♂️",
      location: "Gampaha",
      public_repos: 14,
      followers: 6,
      html_url: "https://github.com/HesithDashan"
    };
  }
}

export default async function Home() {
  const data = await getGithubData();

  const correctedData = {
    ...data,
    name: "Heshith Dashan"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* 👇 වෙනස්කම: God Mode Button එක උඩටම (Top-Right) ගත්තා */}
      <div className="absolute top-6 right-6 z-50">
         <GodModeToggle />
      </div>
      
      {/* Hero Section */}
      <Hero data={correctedData} />
      
      {/* Tech Stack */}
      <div className="w-full max-w-4xl mt-12 mb-12">
        <TechStack />
      </div>

      {/* Projects Showcase */}
      <Projects />

      {/* Timeline (System Logs) */}
      <Timeline />

      {/* Footer එකට පොඩි ඉඩක් තියන්න */}
      <div className="pb-20"></div>

    </main>
  );
}