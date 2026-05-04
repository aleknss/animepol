"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { AnimeCrudSection } from "@/components/dashboard/AnimeCrudSection"
import { SugerenciaSection } from "@/components/dashboard/SugerenciaSection"

type Tab = "animes" | "sugerencias"

export default function DashboardPage() {
  const { data: session, isPending: sessionLoading } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("animes")

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login")
    }
  }, [session, sessionLoading, router])

  if (sessionLoading || !session) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {session.user?.email}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => signOut()}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        <Button
          variant={tab === "animes" ? "default" : "ghost"}
          size="sm"
          onClick={() => setTab("animes")}
        >
          Gestor de Animes
        </Button>
        <Button
          variant={tab === "sugerencias" ? "default" : "ghost"}
          size="sm"
          onClick={() => setTab("sugerencias")}
        >
          Gestor de Sugerencias
        </Button>
      </div>

      <Separator className="mb-6" />

      {tab === "animes" ? <AnimeCrudSection /> : <SugerenciaSection />}
    </div>
  )
}
