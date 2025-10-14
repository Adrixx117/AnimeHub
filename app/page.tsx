// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import PanelDashboard from "@/components/PanelDashboard";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la App 🌱</h1>
        <LoginButton />
      </main>
    );
  }

  // Nos aseguramos de que user tenga un id
  const userWithId = {
    id: session.user.id || 0, // reemplaza con el id real de tu DB si es necesario
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return <PanelDashboard user={userWithId} />;
}
