// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import PanelDashboard from "@/components/PanelDashboard";
import { LoginButton } from "@/components/LoginButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la App 🌱</h1>
        <LoginButton />
      </main>
    );
  }

  const userWithId = {
    id: Number((session.user as any).id) || 0,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return <PanelDashboard user={userWithId} />;
}
