"use client"

import { useState } from "react"
import { EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SpoilerText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [revealed, setRevealed] = useState(false)

  if (revealed) {
    return <>{children}</>
  }

  return (
    <div className={cn("relative", className)}>
      <div className="blur-sm select-none pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/40 backdrop-blur-xs">
        <Button
          variant="outline"
          onClick={() => setRevealed(true)}
          className="gap-2 cursor-pointer"
        >
          <EyeOffIcon className="size-4" />
          Mostrar spoiler
        </Button>
      </div>
    </div>
  )
}
