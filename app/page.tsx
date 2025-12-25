import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";

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
      // 👇 🔥 මෙන්න මෙතන වෙනස් කළා! (Local Image එක දැම්මා)
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
      
      <Hero data={correctedData} />
      
      <div className="w-full max-w-4xl mt-12 mb-12">
        <TechStack />
      </div>

      <Projects />

      <div className="z-20 mt-12">
         <GodModeToggle />
      </div>

    </main>
  );
}