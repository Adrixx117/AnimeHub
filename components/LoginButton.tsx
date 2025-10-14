"use client"

import { signIn } from "next-auth/react"

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Iniciar sesión con Google
    </button>
  )
}
