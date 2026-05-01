interface Props {
  eco?: number;
  pers?: number;
  className?: string;
}

function calcularPosicion(eco: number, pers: number) {
  const x = (eco - pers + 4) * 12.5;
  const y = 100 - (eco + pers - 2) * 12.5;
  return { x, y };
}

export function DiagramaNolanIcon({ eco = 3, pers = 3, className }: Props) {
  const { x: dotX, y: dotY } = calcularPosicion(eco, pers);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className ?? "w-24 h-24 drop-shadow-sm"}
      role="img"
      aria-label={`Gráfico de Nolan: Económica ${eco}, Personal ${pers}`}
    >
      <polygon points="50,0 75,25 50,50 25,25" fill="#22c55e" />
      <polygon points="0,50 25,25 50,50 25,75" fill="#ef4444" />
      <polygon points="100,50 75,25 50,50 75,75" fill="#3b82f6" />
      <polygon points="50,100 75,75 50,50 25,75" fill="#ffff00" />
      <polygon
        points="50,35 65,50 50,65 35,50"
        fill="white"
        stroke="black"
        strokeWidth="0.5"
      />
      <polygon
        points="50,0 100,50 50,100 0,50"
        fill="none"
        stroke="black"
        strokeWidth="1"
      />
      <circle
        cx={dotX}
        cy={dotY}
        r="4"
        fill="black"
      />
    </svg>
  );
}
