import { DashboardPage } from "./(dashboard)/page";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col ">
        <DashboardPage />
      </main>
    </div>
  );
}