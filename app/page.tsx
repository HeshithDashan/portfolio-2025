import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";

async function getGithubData() {
  const username = "HeshithDashan";
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res.json();

  } catch (error) {
    console.log("⚠️ Using Offline Data (Matching GitHub Screenshot)...");
    
    return {
      avatar_url: "https://avatars.githubusercontent.com/u/98698759?v=4", 
      name: "Heshith Dashan",
      bio: "Code. Learn. Build. Repeat. Software Engineer ⚙️ | Open Source Contributor 🌎 | Always curious 🧘‍♂️",
      location: "Gampaha",
      public_repos: 14,
      followers: 6,
      html_url: "https://github.com/HeshithDashan"
    };
  }
}

export default async function Home() {
  const data = await getGithubData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 relative overflow-hidden">
      <Hero data={data} />
      
      <div className="mt-12 z-20">
         <GodModeToggle />
      </div>
    </main>
  );
}