'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
interface SearchBarProps {
  busqueda: string;
  alCambiar: (valor: string) => void;
}

export default function SearchBar({ busqueda, alCambiar }: SearchBarProps) {
  return (
    <div className="sticky top-6 z-10 w-full max-w-2xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Buscar por título o alias (ej: SNK)..."
        value={busqueda}
        onChange={(e) => alCambiar(e.target.value)}
        className="h-12 pl-4 pr-10 text-lg bg-white shadow-lg shadow-white/40 dark:bg-gray-800 dark:shadow-black/40"
      />
      <Search className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
}
