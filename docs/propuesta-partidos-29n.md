# Propuesta: partido político por anime (29N 2026)

Documento de revisión. Nada de esto está implementado todavía.

Contexto: elecciones generales del 29 de noviembre de 2026. Partidos con presencia estatal y
territorial relevante confirmados en prensa (RTVE, 22/10/2026): PP, PSOE, VOX, Frente Amplio
(Sumar + Más Madrid + IU + comuns, candidata Ada Colau), Podemos (Irene Montero), ERC, Junts,
EH Bildu, PNV, BNG y Coalición Canaria.

Aviso: esto es sátira. El bloque debe llevar un pie que lo diga y no usar logos oficiales.

## Modelo de datos

Colección nueva `partidos` (`src/content/partidos/<slug>.json`):

```json
{
  "nombre": "Partido Popular",
  "siglas": "PP",
  "color": "#1D4E9B",
  "ideologia": "Conservadurismo liberal",
  "descripcion": "Una línea satírica sobre el partido."
}
```

Campos nuevos en `animes`:

```yaml
partido: "pp"                     # slug de la colección partidos
justificacionPartido: "Texto..."  # 2 frases, tono seco
```

Cambios derivados: `src/content.config.ts` y `.pages.yml` en el mismo commit.
UI: bloque en la ficha bajo Nolan (barra de color, siglas, nombre, ideología, justificación),
chip en la tarjeta, filtro "Partido" en el panel. Página `/partidos` opcional.

## Reparto

| Partido | Animes |
|---|---|
| PP (11) | Bleach, Blue Lock, Cowboy Bebop, Dragon Ball, Hajime no Ippo, Hunter x Hunter, JoJo, Kaguya-sama, LOTGH, Lupin III, Re:Zero |
| PSOE (7) | El viaje de Chihiro, Evangelion, FMAB, Gundam 00, Monster, Psycho-Pass, Spy x Family |
| VOX (7) | Attack on Titan, Chainsaw Man, Death Note, Kimetsu no Yaiba, Naruto, Saint Seiya, Steins;Gate |
| Frente Amplio (4) | After The Rain, Koe no Katachi, Serial Experiments Lain, Vinland Saga |
| Podemos (5) | Darling in the Franxx, GTO, Kaiji, Lovely★Complex, Mob Psycho 100 |
| Junts (2) | Code Geass, Katekyou Hitman Reborn |
| ERC (1) | One Piece |
| PNV (1) | Jibaku Shounen Hanako-kun |
| EH Bildu (1) | Gachiakuta |
| BNG (1) | Sousou no Frieren |
| Coalición Canaria (1) | Pokémon |

Total: 41 animes.

## Justificaciones

### PP (11)

- **Bleach** — Cuatro mil años de burocracia, nobleza con apellido y un puesto de capitán que se
  hereda. Si funciona desde hace mil años, ¿para qué tocarlo?
- **Blue Lock** — El egoísmo como proyecto de país y el mérito como coartada. Es un programa de
  autónomos: 300 candidatos, un contrato y cero cotizaciones.
- **Cowboy Bebop** — Autónomo, sin nómina y con dos trabajos para pagar el combustible. La gig
  economy explicada a quien todavía cree que era una aventura espacial.
- **Dragon Ball** — Vives en una montaña, pagas lo justo y resuelves todo a puñetazos. Liberalismo
  de verdad: sin Estado, sin impuestos y con un amigo que revive a los muertos.
- **Hajime no Ippo** — Jerarquía, respeto al maestro y levantarse a las cinco. El esfuerzo como
  doctrina y el gimnasio como unidad mínima de convivencia.
- **Hunter x Hunter** — Un examen que solo aprueban los listos y una licencia que te da inmunidad.
  Reglas para quien no puede pagarse un abogado.
- **JoJo's Bizarre Adventure** — Tu cuerpo, tu Stand, tu propiedad privada. El PP si el PP tuviera
  poses y un árbol genealógico verificado.
- **Kaguya-sama: Love is War** — Protocolo, apariencias y una guerra fría por ver quién cede primero. Nadie
  confiesa, todos negocian.
- **La Leyenda de los Héroes Galácticos** — Pides un dictador ilustrado que baje los impuestos y
  gestione bien el PIB. El rubio guapo que arregla el país y luego se va a llorar a un palacio.
- **Lupin III** — Lujo, americana y un respeto muy selectivo por la propiedad ajena. Ladrón, pero
  con buenos modales y asesor fiscal.
- **Re:Zero** — Mueres, reapareces y asumes que la culpa es tuya. Nadie va a salvarte y el Estado
  solo pasa a cobrar el IBI.

### PSOE (7)

- **El viaje de Chihiro** — Empiezas en un contrato basura, te cambian el nombre y acabas salvando
  la empresa. Con una inspección de trabajo, Yubaba reparte beneficios.
- **Evangelion** — Comités, subcomités y un proyecto que nadie entiende pero todos financian. El
  mundo se acaba, pero la reunión de coordinación sigue en pie.
- **Fullmetal Alchemist: Brotherhood** — Auditar al ejército, reconstruir el país y asumir la culpa
  colectiva. Todo se arregla con un plan de choque y responsabilidad fiscal.
- **Gundam 00** — Paz mundial garantizada por una fuerza armada superior y un consejo que decide
  por ti. Intervenimos, pero con mandato de la ONU.
- **Monster** — Un cirujano salva al niño equivocado y descubre que el sistema prefiere al alcalde.
  Sanidad pública, culpabilidad y un asesino que da mejores discursos que el portavoz.
- **Psycho-Pass** — Una inteligencia artificial decide quién es delincuente y todos lo aceptan por
  seguridad. El Estado te lee el aura y luego te manda a un curso.
- **Spy x Family** — Familia falsa, guerra fría y una hija que lee la mente. La diversidad como
  fachada y nadie dice la verdad en la cena de Navidad.

### VOX (7)

- **Attack on Titan** — Murallas, enemigos fuera y una ley marcial que apruebas sin leer. Votarías
  el muro y luego te sorprendería que el muro cobre alquiler.
- **Chainsaw Man** — Pides a gritos que alguien tome todas las decisiones por ti, y rápido.
  Demonios, motosierras y una cadena de mando que no admite sugerencias.
- **Death Note** — El sistema judicial es lento, tú tienes buena caligrafía y una lista de gente que
  sobra. Mano dura sin pasar por el trámite parlamentario.
- **Kimetsu no Yaiba** — Linaje, espada y abuelos que no se tocan. La tradición no se discute, se
  hereda.
- **Naruto** — Nepotismo de linaje, aldea fuerte y un Hokage que se hereda como un apellido. La
  nación primero, el clan después y el becario del equipo siete al final.
- **Saint Seiya** — Jóvenes con armaduras juran lealtad a una diosa y mueren por el orden
  establecido. Cruzada, sacrificio y un enemigo exterior nuevo cada temporada.
- **Steins;Gate** — Una organización secreta controla el mundo y tú lo sabes porque leíste un foro.
  La sospecha permanente como programa y el microondas como arma.

### Frente Amplio (4)

- **After The Rain** — Amor, lluvia y una diferencia de edad que la dirección prefiere llamar
  "vivienda emocional". Regular el mercado del sentimiento, aunque las competencias sean
  autonómicas.
- **Koe no Katachi** — Acosador rehabilitado, bullying como problema estructural y una redención de
  dos horas. La escuela se arregla con más orientación y menos notas.
- **Serial Experiments Lain** — Tu cuerpo es un estorbo y la red es la verdadera comunidad. El
  individuo se disuelve en el colectivo y nadie sabe quién modera el grupo.
- **Vinland Saga** — Dejas las hachas y te vas a construir una aldea sin esclavitud ni reyes.
  Pacifismo, utopía y una tierra prometida que no sale en el mapa.

### Podemos (5)

- **Darling in the Franxx** — Revolución hormonal con comité de igualdad y guion de educación
  afectiva. El amor es político y alguien tiene que decirlo en el Congreso.
- **Great Teacher Onizuka** — Exdelincuente con moto y un plan pedagógico basado en la provocación.
  Entra al sistema gritando que el sistema es una basura y acaba en un despacho con moqueta.
- **Kaiji: Ultimate Survivor** — Deudas, casas de apuestas y un sistema diseñado para que pierdas. La meritocracia es
  un timo y el único que gana es el que reparte las cartas.
- **Lovely★Complex** — Una chica alta, un chico bajo y 24 episodios contra los roles de género. La
  diversidad corporal como programa y el amor como reivindicación.
- **Mob Psycho 100** — Un charlatán con gabardina explota a un niño con poderes y lo llama
  formación. El culto al líder carismático con excusa de pedagogía.

### Junts (2)

- **Code Geass** — Un príncipe exiliado, una rebelión desde fuera y un plan que solo entiende él. La
  diferencia es que Lelouch al menos reconoce que lleva una máscara.
- **Katekyou Hitman Reborn!** — Un heredero sin méritos, una familia con apellido y un consejo que
  negocia con todos. La sangre da derecho de negociación y el jefe se elige en un despacho.

### ERC (1)

- **One Piece** — Un capitán que no acepta órdenes, una república pirata y un Gobierno Mundial que
  cobra impuestos. Independencia, bandera propia y un viaje que empieza con un "no".

### PNV (1)

- **Jibaku Shounen Hanako-kun** — Fronteras claras entre vivos y muertos, fueros propios y un
  colegio que funciona desde hace siglos. Cada fantasma tiene su concierto económico.

### EH Bildu (1)

- **Gachiakuta** — Te tiran al abismo y montas una comuna con lo que la ciudad descarta. El Estado
  te trata como basura, así que la autogestión y la trinchera te suenan a programa.

### BNG (1)

- **Sousou no Frieren** — Una elfa vuelve a la aldea cien años después y descubre que todo ha
  cambiado. Memoria, tierra y una reclamación pendiente que se hereda entre generaciones.

### Coalición Canaria (1)

- **Pokémon** — Islas, especies endémicas y un niño de diez años sin tutor legal. Turismo,
  insularidad y criaturas protegidas que no pagan impuestos.

## Decisiones que faltan

1. Colores exactos de cada partido (los de arriba son provisionales).
2. ¿Un anime sin partido se queda sin bloque, o lleva "independiente"?
3. ¿Chip de partido también en la tarjeta del catálogo, o solo en la ficha?
4. ¿Página `/partidos` con el listado, o el filtro es suficiente?
5. ¿Se retira el módulo después del 29N o se queda como contenido permanente?
6. ¿Añadimos aviso de sátira en el bloque, en `/partidos` o en ambos?
