import Navbar from "@/components/Navbar";
import HomeHelper from "@/components/HomeHelper";

export default function Home() {
  return (
     <div className="flex min-h-screen flex-col bg-[#020617]">
      <Navbar />

      <main className="flex-1 pt-20 px-4">
        <HomeHelper />
      </main>

    </div>
  );
}
