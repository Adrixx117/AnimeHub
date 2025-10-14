// components/PanelDashboard.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";

interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface PanelDashboardProps {
  user: User;
}

interface Series {
  id: number;
  title: string;
  description: string;
  image?: string;
  userId: number;
}

interface Character {
  id: number;
  name: string;
  series: string;
  image?: string;
  userId: number;
}

export default function PanelDashboard({ user }: PanelDashboardProps) {
  const [view, setView] = useState<"series" | "characters" | null>(null);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [newSerie, setNewSerie] = useState({ title: "", description: "", image: "" });
  const [newCharacter, setNewCharacter] = useState({ name: "", series: "", image: "" });

  useEffect(() => {
    if (user && view === "series") fetchSeries();
    if (user && view === "characters") fetchCharacters();
  }, [view]);

  const fetchSeries = async () => {
    const res = await fetch("/api/series");
    const data = await res.json();
    setSeriesList(data.filter((s: Series) => s.userId === user.id));
  };

  const fetchCharacters = async () => {
    const res = await fetch("/api/characters");
    const data = await res.json();
    setCharactersList(data.filter((c: Character) => c.userId === user.id));
  };

  const handleAddSerie = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/series", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newSerie, userId: user.id }),
    });
    if (res.ok) {
      setNewSerie({ title: "", description: "", image: "" });
      fetchSeries();
    }
  };

  const handleAddCharacter = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCharacter, userId: user.id }),
    });
    if (res.ok) {
      setNewCharacter({ name: "", series: "", image: "" });
      fetchCharacters();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Panel lateral */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-green-600">Panel</h2>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded hover:bg-green-100 ${
              view === "series" ? "bg-green-100 font-semibold text-black" : "text-black"
            }`}
            onClick={() => setView("series")}
          >
            Series
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded hover:bg-green-100 ${
              view === "characters" ? "bg-green-100 font-semibold text-black" : "text-black"
            }`}
            onClick={() => setView("characters")}
          >
            Personajes
          </button>
        </div>
        <LogoutButton />
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black">
            Bienvenido, <span className="text-green-600">{user.name || "Invitado"}</span> 🌱
          </h1>

          {view === null && (
            <p className="text-gray-700 text-lg">Selecciona una opción en el panel izquierdo para empezar.</p>
          )}

          {/* Sección Series */}
          {view === "series" && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-black">Añadir Serie</h2>
                <form className="flex flex-col gap-4" onSubmit={handleAddSerie}>
                  <input
                    type="text"
                    placeholder="Nombre de la serie"
                    className="border p-2 rounded w-full text-black"
                    value={newSerie.title}
                    onChange={(e) => setNewSerie({ ...newSerie, title: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Descripción"
                    className="border p-2 rounded w-full text-black"
                    value={newSerie.description}
                    onChange={(e) => setNewSerie({ ...newSerie, description: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    className="border p-2 rounded w-full text-black"
                    value={newSerie.image}
                    onChange={(e) => setNewSerie({ ...newSerie, image: e.target.value })}
                  />
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Añadir Serie
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-black">Tus Series</h3>
                <ul className="space-y-3">
                  {seriesList.map((s) => (
                    <li key={s.id} className="flex items-center gap-4 p-3 border rounded hover:shadow-sm bg-gray-50">
                      {s.image && (
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={64}
                          height={64}
                          className="object-cover rounded"
                        />
                      )}
                      <div>
                        <strong className="text-black text-lg">{s.title}</strong>
                        <p className="text-black text-sm">{s.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Sección Personajes */}
          {view === "characters" && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-black">Añadir Personaje</h2>
                <form className="flex flex-col gap-4" onSubmit={handleAddCharacter}>
                  <input
                    type="text"
                    placeholder="Nombre del personaje"
                    className="border p-2 rounded w-full text-black"
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Serie a la que pertenece"
                    className="border p-2 rounded w-full text-black"
                    value={newCharacter.series}
                    onChange={(e) => setNewCharacter({ ...newCharacter, series: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    className="border p-2 rounded w-full text-black"
                    value={newCharacter.image}
                    onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })}
                  />
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Añadir Personaje
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-black">Tus Personajes</h3>
                <ul className="space-y-3">
                  {charactersList.map((c) => (
                    <li key={c.id} className="flex items-center gap-4 p-3 border rounded hover:shadow-sm bg-gray-50">
                      {c.image && (
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={64}
                          height={64}
                          className="object-cover rounded"
                        />
                      )}
                      <div>
                        <strong className="text-black text-lg">{c.name}</strong>
                        <p className="text-black text-sm">Serie: {c.series}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
