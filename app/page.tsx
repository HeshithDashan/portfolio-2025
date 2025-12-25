import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";
import About from "@/components/About";
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
      created_at: "2023-10-23T00:00:00Z", // Backup එකටත් ඔයාගේ ඇත්ත දිනය දැම්මා
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
      
      {/* Top Right God Mode Button */}
      <div className="absolute top-6 right-6 z-50">
         <GodModeToggle />
      </div>
      
      <Hero data={correctedData} />
      
      {/* 👇 වෙනස්කම මෙතනයි: */}
      {/* අපි GitHub දිනය නොගෙන, ඔයා වැඩ පටන් ගත්ත ඇත්ත දිනය (2023 Oct 23) මෙතනට දැම්මා */}
      <About 
        repoCount={correctedData.public_repos} 
        joinDate="2023-10-23" 
      />
      
      <div className="w-full max-w-4xl mt-12 mb-12">
        <TechStack />
      </div>

      <Projects />

      <Timeline />

      <div className="pb-20"></div>

    </main>
  );
}