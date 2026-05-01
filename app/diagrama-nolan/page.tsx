'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DiagramaNolanIcon } from '@/components/DiagramaNolanIcon';

export default function DiagramaNolanPage() {
  const [eco, setEco] = useState(3);
  const [pers, setPers] = useState(3);

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
        >
          ← Volver al catálogo
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Diagrama de Nolan
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Un modelo político de dos dimensiones
        </p>

        <div className="flex flex-col items-center mb-8">
          <DiagramaNolanIcon eco={eco} pers={pers} className="w-48 h-48 drop-shadow-md" />
          <div className="mt-2 text-sm text-muted-foreground">
            Punto: Económica {eco}, Personal {pers}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-foreground">
              Libertad económica: {eco}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={eco}
              onChange={(e) => setEco(Number(e.target.value))}
              className="w-full mt-1 accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Izquierda (1)</span>
              <span>Derecha (5)</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Libertad personal: {pers}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={pers}
              onChange={(e) => setPers(Number(e.target.value))}
              className="w-full mt-1 accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Autoritario (1)</span>
              <span>Libertario (5)</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-foreground leading-relaxed bg-card rounded-lg p-6 border">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">
              ¿Qué es?
            </h2>
            <p>
              Creado por David Nolan en 1969, este diagrama mide la ideología
              política en <strong>dos ejes</strong> independientes. El eje
              tradicional izquierda-derecha es insuficiente: mezcla economía y
              libertades civiles en una sola línea.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">
              Los dos ejes
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Eje horizontal — Libertad económica:</strong> ¿Cuánto
                controla el Estado la economía? Derecha = libre mercado.
                Izquierda = intervención estatal.
              </li>
              <li>
                <strong>Eje vertical — Libertad personal:</strong> ¿Cuánto
                controla el Estado la vida privada? Arriba = libertades
                individuales. Abajo = control social.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">
              Los cuatro cuadrantes
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 rounded-sm bg-green-500 mt-1 shrink-0" />
                <div>
                  <strong>Libertario (verde):</strong> Alta libertad económica +
                  alta libertad personal. Estado mínimo en ambos ejes.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 rounded-sm bg-red-500 mt-1 shrink-0" />
                <div>
                  <strong>Autoritario (rojo):</strong> Baja libertad económica +
                  baja libertad personal. Estado grande e intrusivo en todo.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 rounded-sm bg-blue-500 mt-1 shrink-0" />
                <div>
                  <strong>Conservador (azul):</strong> Alta libertad económica +
                  baja libertad personal. Libre mercado con control social.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-4 h-4 rounded-sm bg-yellow-400 mt-1 shrink-0" />
                <div>
                  <strong>Progresista (amarillo):</strong> Baja libertad económica
                  + alta libertad personal. Intervención económica con libertad
                  social.
                </div>
              </div>
            </div>
          </section>

          <p className="text-muted-foreground text-sm pt-4 border-t">
            En Animepol, cada anime se posiciona en este diagrama según los
            valores que transmite su trama, personajes y mundo. Mueve los
            sliders arriba para explorar cómo cambia la posición en el gráfico.
          </p>
        </div>
      </div>
    </div>
  );
}
