// components/FilterContent.tsx
"use client"

import { useState } from "react"

export function FilterContent() {
  const [filtro, setFiltro] = useState<"personajes" | "series">("personajes")

  return (
    <div>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setFiltro("personajes")}
            className={`w-full text-left px-2 py-1 rounded ${
              filtro === "personajes" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            Personajes
          </button>
        </li>
        <li>
          <button
            onClick={() => setFiltro("series")}
            className={`w-full text-left px-2 py-1 rounded ${
              filtro === "series" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            Series
          </button>
        </li>
      </ul>

      <div className="mt-4">
        {filtro === "personajes" ? (
          <div>
            <h3 className="font-bold mb-2">Personajes</h3>
            <p>Aquí iría la lista o formulario de personajes</p>
          </div>
        ) : (
          <div>
            <h3 className="font-bold mb-2">Series</h3>
            <p>Aquí iría la lista o formulario de series</p>
          </div>
        )}
      </div>
    </div>
  )
}
