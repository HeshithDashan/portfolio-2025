import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";
import TechStack from "@/components/TechStack"; // 👈 1. අලුතින් එකතු කරා

async function getGithubData() {
  const username = "HesithDashan"; // ඔයාගේ GitHub Username එක
  
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
      avatar_url: "https://avatars.githubusercontent.com/u/98698759?v=4", 
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

  // 🔥 2. නම අනිවාර්යයෙන්ම "Heshith Dashan" විදියට Force කරනවා
  // (API එකෙන් පරණ නම ආවත් මේකෙන් ඒක හරි යනවා)
  const correctedData = {
    ...data,
    name: "Heshith Dashan"
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Hero Section */}
      <Hero data={correctedData} />
      
      {/* 👇 3. Tech Stack එක මෙතනට දැම්මා */}
      <div className="w-full max-w-4xl mt-12 mb-12">
        <TechStack />
      </div>

      {/* God Mode Button */}
      <div className="z-20">
         <GodModeToggle />
      </div>

    </main>
  );
}