'use client';

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
interface SearchBarProps {
  busqueda: string;
  alCambiar: (valor: string) => void;
}

export default function SearchBar({ busqueda, alCambiar }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasText = busqueda.trim().length > 0;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="sticky top-6 z-10 w-full max-w-2xl mx-auto mb-8">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar por título o alias (ej: SNK)..."
        value={busqueda}
        onChange={(e) => alCambiar(e.target.value)}
        className="h-12 pl-4 pr-28 text-lg bg-white shadow-lg shadow-white/40 dark:bg-gray-800 dark:shadow-black/40"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
        <div className="relative size-5">
          <Search
            className={cn(
              "absolute inset-0 h-5 w-5 transition-all duration-200 ease-out",
              hasText && "scale-50 opacity-0 rotate-90"
            )}
          />
          <button
            type="button"
            onClick={() => alCambiar("")}
            className={cn(
              "absolute inset-0 rounded-md cursor-pointer transition-all duration-200 ease-out hover:text-foreground",
              hasText
                ? "scale-100 opacity-100 rotate-0"
                : "scale-50 opacity-0 -rotate-90 pointer-events-none"
            )}
            aria-label="Borrar búsqueda"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <Kbd>Ctrl</Kbd>
          <span className="text-xs">+</span>
          <Kbd>K</Kbd>
        </div>
      </div>
    </div>
  );
}
