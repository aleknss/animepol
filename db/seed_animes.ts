import { db } from "@/lib/db";
import { animes, generos, animesGeneros } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Iniciando la siembra de animes y géneros...");

  const data = [
    {
      titulo: "Sousou no Frieren",
      slug: "sousou-no-frieren",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1553/137254l.webp",
      nombresAlternativos: ["Frieren: Beyond Journey's End", "Frieren"],
      sinopsis:
        "Una maga elfa recorre el mundo para entender a los humanos mientras ignora el paso de los siglos.",
      analisisPolitico: `La estructura política de este mundo se presenta inicialmente como una fantasía clásica descentralizada, donde el poder reside en monarquías locales y casas nobiliarias que gestionan territorios independientes. Sin embargo, el verdadero eje de control global no es una corona, sino la Asociación de Magia Continental (CMA), una entidad supranacional que ejerce una tecnocracia basada en el mérito mágico. Esta organización regula el movimiento de personas y el acceso a la defensa nacional.

(Aviso: Spoiler) El anime plantea una visión del mundo profundamente fundamentada en el esencialismo biológico y el realismo político más crudo. A diferencia de otras obras donde el conflicto se resuelve mediante el diálogo, aquí los demonios son retratados como depredadores naturales que usan el lenguaje únicamente como una herramienta de engaño evolutivo. No hay posibilidad de contrato social ni coexistencia; la única política válida hacia "el otro" es el exterminio total.

Por otro lado, la figura de Serie y la fundación de la Asociación representan un elitismo aristocrático aplicado a la magia. Serie desprecia la democratización del conocimiento mágico y prefiere un sistema donde solo los "dotados" tengan voz, convirtiendo la magia en un recurso estratégico controlado por una élite de "Primer Clase". El mundo de Frieren opera bajo una paz armada y una meritocracia fría donde la libertad individual está subordinada a la capacidad de ser útil en un orden jerárquico.`,
      añoLanzamiento: 2023,
      libertadEconomica: 3,
      libertadPersonal: 2,
      generos: ["Fantasía", "Aventura", "Drama"],
    },
    {
      titulo: "Fullmetal Alchemist: Brotherhood",
      slug: "fmab",
      imagen_url: "https://cdn.myanimelist.net/images/anime/7/74317l.webp",
      nombresAlternativos: ["Hagane no Renkinjutsushi", "FMAB"],
      sinopsis:
        "Dos hermanos buscan recuperar sus cuerpos tras un experimento alquímico fallido...",
      analisisPolitico: `FMAB funciona como un manifiesto del humanismo racionalista y la responsabilidad individual. La "Ley del Intercambio Equivalente" no es solo una regla física, sino una metáfora de la meritocracia existencial: para obtener algo, debes trabajar y sacrificar algo de igual valor. La obra posiciona al individuo como el único arquitecto de su destino a través del estudio y el esfuerzo, rechazando los atajos morales.

(Aviso: Spoiler) El conflicto contra el antagonista, Padre, ilustra el horror de la planificación centralizada y el desprecio por la vida individual. Padre representa la tentación del poder totalitario que busca la perfección eliminando sus "pecados" y tratando a la población como meras unidades de energía para un plan maestro. Frente a este colectivismo deshumanizador, los protagonistas defienden la valía del error, la imperfección y la autonomía de cada alma.

La resolución final, donde Edward Elric renuncia a su "Puerta de la Verdad", es el acto definitivo de soberanía individual. Al sacrificar su capacidad de realizar alquimia, Edward elige ser un humano corriente en lugar de un semidiós. Esta conclusión transmite que el verdadero progreso no nace de la acumulación de poder absoluto, sino de la cooperación voluntaria y el reconocimiento de nuestras propias limitaciones.`,
      añoLanzamiento: 2009,
      libertadEconomica: 4,
      libertadPersonal: 4,
      generos: ["Acción", "Aventura", "Fantasía", "Drama"],
    },
    {
      titulo: "One Piece",
      slug: "one-piece",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1244/138851l.webp",
      nombresAlternativos: ["OP", "Wan Pīsu"],
      sinopsis:
        "Un chico de goma busca el tesoro más grande del mundo para convertirse en el hombre con más libertad...",
      analisisPolitico: `Desde un punto de vista de intención, One Piece es un manifiesto del individualismo vitalista. Representa el romanticismo de la aventura frente a la seguridad del sistema. La obra destila la premisa de que "nadie tiene derecho a decirle a otro cómo debe vivir su vida", siempre que ese otro esté persiguiendo su sueño. Es el triunfo del deseo personal sobre la estabilidad colectiva y el orden estatal.

(Aviso: Spoiler) El núcleo político de la obra reside en la figura de los Tenryuubito, quienes representan una aristocracia estamental que se sitúa literalmente por encima de la humanidad. El Gobierno Mundial opera mediante un sistema de "Tributo Celestial", una forma de fiscalidad extractiva extrema que condena a la miseria a los países que no pueden pagarlo. Es un análisis del Estado no como protector, sino como una estructura de saqueo institucionalizado que protege a una casta parasitaria.

Frente a esto, Luffy actúa como un anarquista individualista. Luffy define al "Rey de los Piratas" no como aquel que gobierna todo, sino como la persona más libre. La introducción de conceptos como "Joy Boy" eleva esta ideología a un plano casi metafísico: la libertad como una fuerza de la naturaleza que trae alegría. La obra propone la política de la auto-propiedad absoluta y la rebelión estética contra cualquier organismo centralizado que decida qué parte de la historia se puede leer.`,
      añoLanzamiento: 1999,
      libertadEconomica: 5,
      libertadPersonal: 5,
      generos: ["Acción", "Aventura", "Fantasía"],
    },
    {
      titulo: "Psycho-Pass",
      slug: "psycho-pass",
      imagen_url: "https://cdn.myanimelist.net/images/anime/5/43399l.webp",
      nombresAlternativos: ["Psycho-Pass", "Saiko Pasu", "PP"],
      sinopsis:
        "Una inteligencia artificial juzga la intención criminal de los ciudadanos...",
      analisisPolitico: `La obra representa la culminación del utilitarismo tecnocrático y el Estado paternalista. Bajo el Sistema Sibyl, la sociedad ha intercambiado su soberanía individual y su capacidad de juicio moral por una seguridad absoluta y una eficiencia algorítmica. La política aquí se convierte en una gestión administrativa de la salud mental; el Estado asume que el individuo es incapaz de gobernarse a sí mismo y que la libertad es una carga.

(Aviso: Spoiler) La revelación de que el Sistema Sibyl es una colmena de cerebros humanos transforma la obra en una crítica a la aristocracia colectivista. No es una máquina objetiva la que gobierna, sino una élite que se ha despojado de su identidad para convertirse en un órgano de control total. Este sistema representa la idea de que la paz social solo es posible si se sacrifica la ética personal en favor de una justicia estadística.

Frente a esto, el antagonista Makishima Shogo actúa como un catalizador del individualismo anárquico. Su rebelión nace del deseo de restaurar la humanidad a través del conflicto y la voluntad propia. La obra plantea un dilema trágico: la libertad social real incluye el derecho a ser "malvado" o a fracasar, mientras que la seguridad total de Sibyl es una "jaula de oro" que convierte a los humanos en ganado doméstico espiritualmente muerto.`,
      añoLanzamiento: 2012,
      libertadEconomica: 1,
      libertadPersonal: 1,
      generos: ["Ciencia Ficción", "Psicológico", "Cyberpunk", "Thriller"],
    },
    {
      titulo: "Attack on Titan",
      slug: "attack-on-titan",
      imagen_url: "https://cdn.myanimelist.net/images/anime/10/47347l.webp",
      nombresAlternativos: ["Shingeki no Kyojin", "AoT", "SNK"],
      sinopsis:
        "La humanidad lucha por no ser devorada por gigantes mientras descubre que las murallas...",
      analisisPolitico: `La obra es una exploración cruda del realismo político y el "estado de excepción". Representa la dialéctica entre seguridad y libertad en un entorno de amenaza existencial. La sociedad inicial dentro de los muros es una alegoría del Estado como leviatán defensivo: un sistema militarizado donde el individuo es secundario frente a la supervivencia de la especie. Sugiere que el miedo es la herramienta de control más efectiva.

(Aviso: Spoiler) Con el avance de la trama, la obra disecciona el nacionalismo identitario y el ciclo del odio. Representa cómo la historia y el trauma transgeneracional son utilizados por los Estados para deshumanizar al enemigo. La narrativa plantea que los conflictos no nacen de una maldad intrínseca, sino de sistemas que obligan a los individuos a elegir entre "ser el martillo o ser el yunque", eliminando cualquier posibilidad de contrato social pacífico.

Finalmente, la figura de Eren Yeager representa el nihilismo libertario llevado a su consecuencia más extrema. Su búsqueda de la libertad no es la construcción de una sociedad justa, sino la eliminación de cualquier obstáculo externo que limite su voluntad. La obra termina siendo una advertencia trágica sobre cómo el deseo de emancipación, cuando se despoja de la ética y se consume por el determinismo histórico, puede desembocar en el horror absoluto y el vacío.`,
      añoLanzamiento: 2013,
      libertadEconomica: 2,
      libertadPersonal: 1,
      generos: ["Acción", "Drama", "Fantasía", "Misterio"],
    },
    {
      titulo: "Monster",
      slug: "monster",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1573/132904l.webp",
      nombresAlternativos: ["Monsutā"],
      sinopsis:
        "Un neurocirujano pierde su prestigio por salvar la vida de un niño...",
      analisisPolitico: `La obra es un tratado sobre el humanismo ético frente al utilitarismo de las instituciones. A través de la decisión del Dr. Tenma, se plantea una premisa radicalmente igualitaria: "todas las vidas valen lo mismo". Esta postura choca frontalmente con la estructura jerárquica del hospital y del Estado, donde el valor de una vida se mide por su utilidad política o económica. Posiciona la conciencia individual como la única brújula válida.

(Aviso: Spoiler) El núcleo del conflicto revela las cicatrices del totalitarismo de la Guerra Fría. A través de Kinderheim 511, la obra disecciona los experimentos de ingeniería social donde el Estado intentaba "borrar" la individualidad para crear soldados perfectos. Johan Liebert es el subproducto de esta deshumanización; representa el vacío absoluto que queda cuando un sistema totalitario destruye la identidad y los vínculos familiares.

En su tramo final, la obra explora el surgimiento de movimientos neofascistas que buscan un nuevo "líder" para llenar el vacío de poder. Sin embargo, Johan rechaza incluso esta posición, situándose en un nihilismo destructivo que busca demostrar que la única igualdad real es la muerte. Frente a esto, la persistencia de Tenma representa la resistencia del liberalismo humanista: la libertad individual y la responsabilidad moral son las únicas defensas contra los monstruos estatales.`,
      añoLanzamiento: 2004,
      libertadEconomica: 3,
      libertadPersonal: 2,
      generos: ["Misterio", "Psicológico", "Thriller", "Drama"],
    },
    {
      titulo: "Steins;Gate",
      slug: "steins-gate",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1935/127974l.webp",
      nombresAlternativos: ["S;G"],
      sinopsis:
        "Un científico loco aficionado descubre cómo enviar mensajes al pasado...",
      analisisPolitico: `La obra se sitúa en la intersección entre el individualismo científico y la paranoia hacia el Estado profundo. Representa la lucha del "innovador de garaje" frente a la corporación multinacional y el centro de investigación estatal (SERN). La narrativa destila una desconfianza inherente hacia las grandes organizaciones que buscan monopolizar el conocimiento disruptivo para consolidar un orden mundial estático y controlado.

(Aviso: Spoiler) El futuro distópico que los protagonistas intentan evitar es la representación definitiva del totalitarismo tecnológico. En la línea de tiempo donde el SERN triunfa, el viaje en el tiempo se utiliza para establecer un sistema de vigilancia y control absoluto, eliminando el libre albedrío a escala global. La resistencia de los protagonistas es una lucha por la soberanía de la línea temporal: el derecho a un futuro incierto y no planificado por comités.

La ética de la obra también explora el peso de la responsabilidad sobre el individuo que posee el monopolio de la información. Al final, la búsqueda de la línea "Steins Gate" representa el ideal de un mundo donde el futuro no está predeterminado por ninguna entidad superior, defendiendo un estado de libertad donde la historia fluye sin la interferencia de ingenieros sociales o dictadores temporales que "hackean" la realidad.`,
      añoLanzamiento: 2011,
      libertadEconomica: 4,
      libertadPersonal: 2,
      generos: ["Ciencia Ficción", "Thriller", "Psicológico"],
    },
    {
      titulo: "Code Geass",
      slug: "code-geass",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1032/135088l.webp",
      nombresAlternativos: ["Code Geass: Hangyaku no Lelouch", "CG"],
      sinopsis:
        "Un príncipe exiliado utiliza un poder ocular sobrenatural para liderar una rebelión...",
      analisisPolitico: `La obra es un tratado sobre el consecuencialismo y el choque entre el imperialismo tradicional y la autodeterminación. El Imperio de Britannia representa el darwinismo social elevado a política de Estado, donde la desigualdad es la base del progreso. El anime explora la legitimidad de la violencia para derrocar un orden injusto, planteando si es posible construir una sociedad ética utilizando métodos puramente maquiavélicos.

(Aviso: Spoiler) El núcleo ideológico se divide entre la revolución radical de Lelouch y el reformismo institucional de Suzaku. La serie subvierte la épica al mostrar cómo Lelouch termina replicando las mismas tácticas autoritarias que jura destruir. El desenlace con el "Zero Requiem" es la representación definitiva de la política del sacrificio: la paz mundial no nace de un proceso democrático, sino de una arquitectura de engaño orquestada por un tirano.

Lelouch aplica una lógica totalitaria para purgar el sistema, centralizando el odio en sí mismo. La obra sugiere que el mundo solo puede ser libre si se destruye el símbolo de la autoridad suprema, aunque paradójicamente esa libertad sea un regalo diseñado desde la cumbre del poder absoluto. Es una visión cínica pero profunda sobre cómo las élites moldean la libertad de las masas.`,
      añoLanzamiento: 2006,
      libertadEconomica: 2,
      libertadPersonal: 1,
      generos: ["Acción", "Mecha", "Ciencia Ficción", "Drama"],
    },
    {
      titulo: "Hunter x Hunter",
      slug: "hunter-x-hunter",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1337/99013l.webp",
      nombresAlternativos: ["HxH"],
      sinopsis:
        "Un niño busca a su padre en un mundo donde obtener una licencia profesional te otorga inmunidad...",
      analisisPolitico: `Hunter x Hunter representa el individualismo meritocrático llevado al extremo. La Asociación de Cazadores otorga a sus miembros un estatus de soberanía individual, situándolos por encima de las leyes nacionales. La obra transmite que la única jerarquía legítima es la del talento y la voluntad; el mundo no se divide en ciudadanos, sino en individuos con la fuerza para imponer su realidad y una masa que sigue las reglas.

(Aviso: Spoiler) Durante el arco de las Hormigas Quimera, se explora el choque entre el individualismo humano y el totalitarismo biológico. Las hormigas representan el colectivismo absoluto donde el individuo solo existe para servir al sistema. El desenlace con la "Rosa de los Pobres" es un comentario sobre el realismo político: la humanidad no gana por superioridad moral, sino por su capacidad tecnológica para el exterminio masivo, demostrando que el Estado siempre tiene el monopolio de la violencia.

En el arco de la Elección, la serie satiriza los procesos democráticos, mostrando cómo una organización nacida del mérito termina enredada en burocracia y marketing político. La figura de Ging Freecss personifica el rechazo total a cualquier contrato social. La obra propone que la verdadera libertad es aterradora y amoral, y que las estructuras políticas son solo muros endebles construidos para ignorar la inmensidad de un universo salvaje e indiferente.`,
      añoLanzamiento: 2011,
      libertadEconomica: 5,
      libertadPersonal: 5,
      generos: ["Acción", "Aventura", "Fantasía"],
    },
    {
      titulo: "Death Note",
      slug: "death-note",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1079/138100l.webp",
      nombresAlternativos: ["DN"],
      sinopsis: "Un estudiante genio encuentra un cuaderno capaz de matar...",
      analisisPolitico: `La obra es la representación del autoritarismo moral absoluto. Kira encarna la figura del "dictador benevolente" que desprecia el Estado de Derecho en favor de una justicia retributiva total. La ideología que destila es la del castigo como único motor de orden social: la creencia de que la humanidad solo puede ser "buena" si vive bajo una vigilancia divina constante y el miedo al exterminio.

(Aviso: Spoiler) El "Nuevo Mundo" de Kira es una distopía utilitarista donde la libertad individual es sacrificada por la seguridad colectiva. Light Yagami utiliza el terror para reducir la criminalidad, argumentando que el fin justifica los medios. Esta visión elimina la presunción de inocencia y convierte a la sociedad en una masa dócil que no actúa por convicción ética, sino por instinto de supervivencia ante un soberano absoluto que no rinde cuentas.

La caída de Light refuerza una tesis institucionalista: el sistema de Kira es inherentemente frágil porque depende de la infalibilidad de un solo hombre. Cuando el poder se desprende de la ley y se basa en el narcisismo de un líder, el "dios" termina convirtiéndose en el mismo mal que juró destruir. La oposición representa la defensa de la justicia como un proceso estructurado frente a la arbitrariedad de una autocracia teocrática que colapsa tras el líder.`,
      añoLanzamiento: 2006,
      libertadEconomica: 3,
      libertadPersonal: 1,
      generos: ["Misterio", "Psicológico", "Sobrenatural", "Thriller"],
    },
    {
      titulo: "Cowboy Bebop",
      slug: "cowboy-bebop",
      imagen_url: "https://cdn.myanimelist.net/images/anime/4/19644l.webp",
      nombresAlternativos: ["Bebop"],
      sinopsis: "Cazadores de recompensas espaciales intentan sobrevivir...",
      analisisPolitico: `La obra respira una atmósfera de libertarismo de frontera y descentralización total. El sistema solar se presenta como un archipiélago de colonias donde el Estado es una entidad débil o corrupta. La política es una nota al pie de página frente a la supervivencia diaria; representa un mundo donde el contrato social se ha roto y ha sido sustituido por un libre mercado de seguridad privada y sindicatos criminales que operan como estados paralelos.

(Aviso: Spoiler) Los sindicatos del crimen, como el Dragón Rojo, encarnan un autoritarismo corporativo que impone su ley mediante la violencia. Frente a esto, la tripulación del Bebop representa el ideal del individualismo errante. Son sujetos que no pertenecen a ninguna nación ni ideología, definidos por sus habilidades. La obra sugiere que en un universo vasto, la única soberanía real es la del individuo que posee su propio medio de transporte y su propia arma.

Finalmente, la serie destila una filosofía de existencialismo apolítico. Los personajes no buscan cambiar el sistema; simplemente navegan por los huecos que este deja. El conflicto de Spike contra Vicious no es por el control, sino un ajuste de cuentas personal. La interpretación política es que el Estado es un cascarón vacío, y que la única libertad auténtica se encuentra en los márgenes y en la capacidad de elegir cómo enfrentar el propio destino.`,
      añoLanzamiento: 1998,
      libertadEconomica: 4,
      libertadPersonal: 4,
      generos: ["Acción", "Ciencia Ficción", "Aventura", "Cyberpunk"],
    },
    {
      titulo: "Evangelion",
      slug: "evangelion",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1314/108941l.webp",
      nombresAlternativos: ["Neon Genesis Evangelion", "Eva"],
      sinopsis: "Adolescentes pilotean robots mientras enfrentan traumas...",
      analisisPolitico: `La obra representa la máxima expresión de la tecnocracia de emergencia. La soberanía nacional ha sido cedida a organizaciones supranacionales como NERV, donde los militares operan sin rendición de cuentas democrática. El individuo es visto únicamente a través de su utilidad funcional para la supervivencia de la especie. Es una crítica a cómo las estructuras de poder utilizan la crisis para despojar al sujeto de su autonomía.

(Aviso: Spoiler) El trasfondo revela a SEELE, una élite globalista que busca el colectivismo metafísico: el Proyecto de Instrumentalización Humana. Su ideología sostiene que el sufrimiento nace de la separación individual, por lo que buscan la disolución de la frontera psíquica entre los seres humanos. Es el totalitarismo absoluto, donde no solo se busca el control de las acciones, sino la fusión de toda la humanidad en una sola conciencia colectiva.

Frente a este horizonte, el clímax se convierte en una defensa radical del individualismo existencial. Al rechazar la Instrumentalización, Shinji elige el dolor de la soledad y el conflicto sobre la paz artificial de la colmena. La obra concluye que la libertad social real solo existe cuando hay individuos separados, capaces de herirse pero también de amarse de forma voluntaria. Es una apuesta por el derecho a poseer un "yo" propio e imperfecto.`,
      añoLanzamiento: 1995,
      libertadEconomica: 2,
      libertadPersonal: 1,
      generos: ["Acción", "Ciencia Ficción", "Psicológico", "Mecha", "Drama"],
    },
    {
      titulo: "Lupin III",
      slug: "lupin-iii",
      imagen_url: "https://cdn.myanimelist.net/images/anime/1926/141488l.webp",
      nombresAlternativos: ["Lupin the Third", "Rupan Sansei", "Lupin Tercero"],
      sinopsis:
        "El nieto de un legendario caballero ladrón recorre el mundo burlando fronteras y leyes para robar tesoros imposibles por pura diversión.",
      analisisPolitico: `La obra es una oda al anarquismo lúdico y al libertarismo individualista. Lupin representa al individuo soberano que no reconoce fronteras, tratados internacionales ni la legitimidad de la propiedad privada cuando esta es protegida por estados corruptos o instituciones esclerosadas. La serie desprende una absoluta desconfianza hacia cualquier autoridad centralizada, celebrando la astucia del "outsider" que vive al margen del contrato social y ve la ley no como un marco moral, sino como un estorbo técnico o un juego de ingenio.

(Aviso: Spoiler) La relación entre Lupin y el Inspector Zenigata es una metáfora de la eterna persecución entre el espíritu libre y el Estado. Zenigata, aunque noble, representa a la Interpol y al orden establecido: el servidor público que sacrifica su vida por una ley que, a menudo, protege intereses geopolíticos oscuros. Lupin actúa como un agente de caos que, por beneficio propio, termina derrocando dictadores de repúblicas bananeras o desenmascarando conspiraciones de la Guerra Fría, demostrando que un individuo libre es más disruptivo que cualquier burocracia.

El personaje de Fujiko Mine añade una capa de amoralidad pragmática y soberanía individual femenina. En el mundo de Lupin, las lealtades son fluidas y se basan en el interés mutuo, nunca en la obediencia ciega a una bandera. La obra sugiere que el mundo es un tablero de juego donde las grandes potencias son solo fachadas para el egoísmo humano, y que la única forma de ser verdaderamente libre es poseer las habilidades para ser autosuficiente y vivir sin raíces, convirtiendo la existencia en una eterna aventura transnacional.`,
      añoLanzamiento: 2012,
      libertadEconomica: 5,
      libertadPersonal: 5,
      generos: ["Acción", "Aventura", "Comedia", "Misterio"],
    },
    {
      titulo: "JoJo's Bizarre Adventure",
      slug: "jojos-bizarre-adventure",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/3/40409l.webp",
      nombresAlternativos: ["JoJo no Kimyou na Bouken", "JJBA", "JoJo"],
      sinopsis:
        "Diferentes generaciones de la familia Joestar enfrentan amenazas sobrenaturales usando el ingenio y la manifestación física de su espíritu.",
      analisisPolitico: `JoJo's representa el individualismo aristocrático y la soberanía del espíritu. El poder en este universo (el Hamon o los Stands) no es una concesión estatal ni una tecnología democratizada, sino una emanación directa de la voluntad y la personalidad individual. La obra sugiere que la historia no la mueven las masas ni las instituciones, sino colisiones entre voluntades extraordinarias que operan al margen de cualquier contrato social o estructura gubernamental. Es una apología de la excelencia personal y la estética como forma de resistencia ante la mediocridad del entorno.

(Aviso: Spoiler) El arco de Vento Aureo ofrece una visión cínica de las instituciones públicas, mostrando un Estado ausente o cómplice, lo que obliga a los individuos a crear órdenes paralelos. Giorno Giovanna no busca destruir la mafia para devolver el poder al Estado, sino para transformarla en una institución privada benévola que proteja a la comunidad donde el gobierno ha fallado. Esta visión posiciona la organización voluntaria y jerárquica —incluso fuera de la ley— como una herramienta más legítima para el orden social que una burocracia estatal inoperante y corrupta.

En Steel Ball Run, el conflicto alcanza su punto político álgido con el presidente Funny Valentine, quien encarna un nacionalismo colectivista mesiánico. Su deseo de obtener el "Cuerpo Santo" para proteger a su nación a costa del resto del mundo representa la idea del Estado como un organismo depredador que busca la prosperidad nacional mediante el sacrificio ajeno. Frente a él, Johnny Joestar representa el egoísmo redentor: su lucha no es por una bandera, sino por su propia sanación y crecimiento. La obra termina validando la búsqueda individual frente al gran relato patriótico, sugiriendo que la "justicia" es una construcción privada que nace de la convicción personal.`,
      añoLanzamiento: 2012,
      libertadEconomica: 4,
      libertadPersonal: 5,
      generos: ["Acción", "Aventura", "Sobrenatural", "Misterio", "Drama"],
    },
    {
      titulo: "Chainsaw Man",
      slug: "chainsaw-man",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/1806/126216l.webp",
      nombresAlternatives: ["Chensō Man", "CSM"],
      sinopsis:
        "Un joven endeudado se fusiona con su perro demonio para cazar monstruos mientras busca una vida normal y comida caliente.",
      analisisPolitico: `Chainsaw Man es una representación visceral de la deshumanización y la alienación en el sistema de explotación laboral moderno. Denji no empieza como un ciudadano, sino como un "activo" de la Yakuza, un cuerpo cuya única función es saldar una deuda heredada. La obra destila una crítica feroz al contrato social cuando este se basa únicamente en la subsistencia básica: el Estado (Seguridad Pública) ofrece comida y techo a cambio de la propiedad absoluta sobre la vida del individuo, convirtiendo a los cazadores de demonios en herramientas prescindibles de una burocracia que monopoliza la violencia.

(Aviso: Spoiler) El personaje de Makima es la encarnación definitiva del autoritarismo benevolente y el control totalitario. Como el Demonio del Control, representa un Estado que no solo desea regular las acciones, sino también los deseos y las memorias de la población. Su objetivo final —utilizar al Chainsaw Man para borrar conceptos "negativos" como la guerra o el hambre de la realidad— es la utopía colectivista definitiva: un mundo perfecto sin sufrimiento, pero alcanzado a través de la eliminación total del libre albedrío y de la capacidad de elección individual.

Frente a la planificación central de Makima, la rebelión de Denji es una defensa del derecho a la mediocridad y la autonomía personal. Denji no lucha por un ideal político elevado, sino por el derecho a decidir sus propios impulsos, por más mundanos o "sucios" que sean. La derrota de Makima sugiere que un paraíso artificial diseñado por una autoridad superior es, en realidad, una cárcel espiritual. La obra termina validando la soberanía del individuo sobre sus propios traumas y deseos, prefiriendo un mundo caótico y doloroso donde uno es dueño de sus errores que un orden perfecto donde uno es simplemente un perro faldero del sistema.`,
      añoLanzamiento: 2022,
      libertadEconomica: 2,
      libertadPersonal: 2,
      generos: ["Acción", "Gore", "Sobrenatural", "Drama", "Psicológico"],
    },
    {
      titulo: "Bleach",
      slug: "bleach",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/3/40451l.webp",
      nombresAlternativos: ["Burīchi", "Bleach: Thousand-Year Blood War"],
      sinopsis:
        "Un estudiante que ve fantasmas hereda poderes de segador de almas para proteger el equilibrio entre el mundo de los vivos y el más allá.",
      analisisPolitico: `Bleach presenta una estructura de poder basada en el militarismo feudal y la aristocracia espiritual. La Sociedad de Almas no es una democracia, sino un sistema estratificado gobernado por el Gotei 13 bajo la tutela de la Central 46, un cuerpo judicial opaco y draconiano. La ideología imperante es la del "Mantenimiento del Equilibrio", un principio conservador que prioriza la estabilidad del sistema cósmico sobre los derechos individuales. Es un orden donde el estatus y la seguridad dependen enteramente de la casta militar a la que pertenezcas y de tu capacidad de ejercer violencia espiritual.

(Aviso: Spoiler) La traición de Sosuke Aizen representa la rebelión del Übermensch (Superhombre) de Nietzsche contra un orden que considera estancado y falso. Aizen desprecia a la Central 46 por su burocracia inútil y al Rey Espíritu por ser un "dios" pasivo y vacío. Su objetivo es una autocracia iluminada: él busca ascender al trono para dictar una nueva realidad, argumentando que los fuertes no deben dejarse limitar por las leyes creadas por los débiles. Es el elitismo llevado a su conclusión lógica, donde el individuo más capaz tiene el deber moral de gobernar sobre aquellos que necesitan un líder para existir.

Por otro lado, el arco de la Guerra Sangrienta de los Mil Años introduce al Wandenreich, que encarna el imperialismo teocrático. Bajo Yhwach, los Quincy buscan unificar la vida y la muerte en un solo estado de existencia sin miedo, lo cual es la forma definitiva de colectivismo totalitario: la absorción de todas las almas en una sola voluntad divina. Frente a estos extremismos, Ichigo Kurosaki actúa como el estabilizador individualista. No lucha por ideologías ni por el control del trono, sino por la protección de su esfera privada y sus vínculos personales, defendiendo el derecho a un mundo imperfecto frente a los visionarios que quieren rediseñar la existencia a la fuerza.`,
      añoLanzamiento: 2004,
      libertadEconomica: 2,
      libertadPersonal: 2,
      generos: ["Acción", "Aventura", "Sobrenatural", "Fantasía"],
    },
    {
      titulo: "Kaguya-sama: Love is War",
      slug: "kaguya-sama",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/1295/106551l.webp",
      nombresAlternativos: ["Kaguya-sama wa Kokurasetai", "Kaguya-sama"],
      sinopsis:
        "Dos genios de la élite escolar se aman pero se niegan a confesarse, usando juegos mentales para forzar la rendición emocional del otro.",
      analisisPolitico: `La obra es un microcosmos de la lucha entre la aristocracia hereditaria y la meritocracia técnica. Ambientada en la Academia Shuchiin, representa un entorno donde el capital social y el linaje definen el valor del individuo. La "guerra" de amor es, en realidad, una aplicación de la teoría de juegos y el realismo político (Realpolitik) a la esfera privada: una lucha por la hegemonía dentro de una relación donde mostrar vulnerabilidad se interpreta como una pérdida de soberanía. Es una sátira sobre cómo las estructuras de clase moldean e inhiben los deseos más humanos.

(Aviso: Spoiler) La familia Shinomiya representa el totalitarismo corporativo de los antiguos Zaibatsu. Kaguya no es vista por su familia como una persona, sino como un "activo" de la corporación, educada bajo una ideología de frialdad absoluta donde el individuo debe ser una herramienta para la expansión del poder del clan. Este sistema de control privado es tan opresivo como cualquier estado policial, utilizando el aislamiento social y la presión económica para asegurar que la heredera no rompa las jerarquías establecidas por el patriarcado empresarial.

Frente a esto, Miyuki Shirogane encarna el ideal del "self-made man" liberal. Su ética de trabajo obsesiva es una forma de rebelión contra un sistema que, por nacimiento, lo sitúa en desventaja. Shirogane busca alcanzar la cima no para integrarse en la aristocracia, sino para demostrar que el mérito individual puede superar al privilegio de sangre. Al final, la obra propone que la verdadera emancipación social ocurre cuando ambos personajes deciden desmantelar sus máscaras de "élite" y rechazar las expectativas de sus estratos sociales para construir una asociación voluntaria basada en la igualdad y la honestidad emocional.`,
      añoLanzamiento: 2019,
      libertadEconomica: 4,
      libertadPersonal: 3,
      generos: ["Comedia", "Romance", "Psicológico", "Slice of Life"],
    },
    {
      titulo: "Koe no Katachi",
      slug: "koe-no-katachi",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/1122/124423l.webp",

      nombresAlternativos: ["A Silent Voice", "The Shape of Voice", "Silencio"],
      sinopsis:
        "Un antiguo acosador busca la redención tras ser condenado al ostracismo por la misma sociedad que una vez alentó su crueldad.",
      analisisPolitico: `La obra explora la tiranía del consenso social y la fragilidad del individuo frente al grupo. Representa el entorno escolar como un microcosmos estatal donde la "armonía" colectiva se valora por encima de la justicia; cualquier elemento que altere esa paz, ya sea una discapacidad o un conflicto moral, es tratado mediante la exclusión sistemática. Es un análisis de cómo las normas sociales no escritas funcionan como leyes coercitivas, creando una cultura de la vergüenza que utiliza el acoso como herramienta para mantener la cohesión del grupo.

(Aviso: Spoiler) El giro narrativo donde el protagonista, Shoya, pasa de acosador a víctima revela el "mecanismo del chivo expiatorio". Cuando la autoridad institucional interviene, el grupo sacrifica a un solo individuo para purgar su culpa colectiva y preservar su estatus de "inocencia". La obra critica duramente esta hipocresía social, sugiriendo que la responsabilidad en estos sistemas no nace de una convicción ética interna, sino de una actuación externa diseñada para satisfacer la presión del entorno y evitar el castigo.

Finalmente, la película propone una filosofía de la empatía radical como único camino hacia la verdadera libertad personal. El proceso de Shoya de "quitarse las X de la cara" de los demás representa la ruptura con el aislamiento impuesto por la sociedad y la recuperación de la soberanía sobre el propio juicio. La obra concluye que una sociedad libre no es aquella que ignora el conflicto mediante el silencio, sino aquella donde los individuos tienen el coraje de reconocer la humanidad del otro, rompiendo las barreras de la incomunicación y el estigma social.`,
      añoLanzamiento: 2016,
      libertadEconomica: 3,
      libertadPersonal: 2,
      generos: ["Drama", "Slice of Life", "Psicológico"],
    },
    {
      titulo: "Re:Zero",
      slug: "re-zero",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/11/79410l.webp",

      nombresAlternativos: [
        "Re:Zero - Starting Life in Another World",
        "Re:Zero kara Hajimeru Isekai Seikatsu",
        "Re Zero",
      ],
      sinopsis:
        "Un joven atrapado en un bucle temporal de muerte y resurrección intenta navegar una crisis de sucesión real mientras su salud mental colapsa.",
      analisisPolitico: `Lugunica es una monarquía en transición que utiliza una competencia ideológica, la Selección Real, para legitimarse tras una tragedia dinástica. El poder no se hereda simplemente, sino que se disputa entre facciones que representan un amplio espectro político: desde el nacionalismo militarista hasta el mercantilismo expansivo. La obra examina cómo la estabilidad de un reino depende de la capacidad de su líder para gestionar no solo las amenazas externas, sino los prejuicios raciales y la desigualdad social de un sistema estamental profundamente arraigado.

(Aviso: Spoiler) La Selección Real funciona como un experimento de filosofía política aplicada. Cada candidata es un avatar ideológico: Priscilla representa la autocracia basada en el derecho divino y el privilegio; Crusch encarna la soberanía nacional y la ruptura de la dependencia con entidades superiores (el Dragón); Anastasia simboliza la eficiencia del mercado y la acumulación de capital como motor de progreso; Felt representa el anarquismo que busca destruir el sistema desde sus cimientos para liberar a los oprimidos; y Emilia personifica el idealismo igualitario que lucha contra el estigma racial.

(Aviso: Spoiler) El "Retorno por la Muerte" de Subaru es la herramienta de planificación central definitiva, pero con un coste individual inasumible. Subaru posee el monopolio absoluto de la información, lo que lo convierte en un estratega que manipula los eventos para alcanzar un resultado óptimo, operando como un soberano secreto del tiempo. Sin embargo, la obra desmantela la fantasía del poder total al mostrar que el control absoluto sobre el destino es incompatible con la salud mental. Al final, la serie sugiere que la verdadera legitimidad no nace del control de las variables, sino de la construcción de vínculos voluntarios en un mundo inherentemente caótico e imperfecto.`,
      añoLanzamiento: 2016,
      libertadEconomica: 4,
      libertadPersonal: 2,
      generos: ["Aventura", "Fantasía", "Drama", "Psicológico", "Thriller"],
    },
    {
      titulo: "Hajime no Ippo",
      slug: "hajime-no-ippo",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/4/8133l.webp",

      nombresAlternativos: [
        "The Fighting!",
        "Fighting Spirit",
        "Espíritu de Lucha",
      ],
      sinopsis:
        "Un adolescente víctima de acoso descubre su fuerza interior a través del brutal y disciplinado mundo del boxeo profesional.",
      analisisPolitico: `Hajime no Ippo es una apología de la meritocracia radical y la ética del esfuerzo individual. En el cuadrilátero, la obra presenta un "estado de naturaleza" puro donde las jerarquías sociales, el origen económico o el estatus externo desaparecen; solo prevalece la capacidad, la disciplina y la voluntad del individuo. Representa una visión del mundo donde la soberanía personal se conquista a través del dominio del propio cuerpo y la aceptación voluntaria del sacrificio. Es un canto a la responsabilidad individual: el éxito o el fracaso recaen enteramente sobre los hombros del sujeto, rechazando cualquier victimismo sistémico.

(Aviso: Spoiler) La relación entre Ippo y el Entrenador Kamogawa ilustra un modelo de autoridad tradicionalista basada en el respeto mutuo y la transmisión de un legado. No es una opresión jerárquica, sino una sumisión voluntaria a un maestro para alcanzar la excelencia. La obra sugiere que la verdadera libertad no consiste en la ausencia de límites, sino en la autodisciplina necesaria para alcanzar un objetivo elevado. Esta filosofía alinea a la serie con un pensamiento conservador-liberal donde la estructura y la tradición (el estilo de boxeo, la historia del gimnasio) proporcionan el marco necesario para que el individuo florezca y supere sus propias limitaciones.

(Aviso: Spoiler) A través de figuras como Takamura o Ricardo Martínez, el anime explora la noción del "Individuo Heroico" que se separa de la masa a través de un talento y una voluntad sobrenaturales. La serie muestra que el camino hacia la cima es intrínsecamente desigual y solitario; no todos pueden llegar, y el sistema (el ranking mundial) solo reconoce la excelencia absoluta. Esta visión es fundamentalmente anti-igualitaria: celebra la diferencia de espíritu y premia a la élite que está dispuesta a sacrificar su salud y su vida privada por un momento de gloria. La "fuerza" que busca Ippo termina siendo una forma de autonomía espiritual que solo se alcanza cuando el individuo se enfrenta cara a cara con su propia mortalidad y resistencia.`,
      añoLanzamiento: 2000,
      libertadEconomica: 5,
      libertadPersonal: 4,
      generos: ["Spokon", "Acción", "Comedia", "Drama"],
    },
    {
      titulo: "Mob Psycho 100",
      slug: "mob-psycho-100",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/8/80356l.webp",

      nombresAlternativos: ["Mobu Saiko Hyaku", "MP100"],
      sinopsis:
        "Un adolescente con poderes psíquicos nivel Dios busca la normalidad mientras trabaja para un charlatán que le enseña que el poder no te hace especial.",
      analisisPolitico: `La obra es un tratado sobre el igualitarismo ético y la responsabilidad del poder. A través de la filosofía de Reigen Arataka, la serie propone una desmitificación del talento: tener poderes psíquicos no te hace superior a los demás, del mismo modo que ser buen músico o deportista no otorga derechos políticos o morales sobre el resto. Es una crítica directa al elitismo y a la idea de que los "superdotados" deben liderar a la masa. El anime defiende que el verdadero valor de un individuo reside en su capacidad de empatía y en su esfuerzo por integrarse en la comunidad como un igual, no en sus capacidades innatas.

(Aviso: Spoiler) La organización "Garra" (Claw) representa la tentación del fascismo basado en la excepcionalidad biológica. Su líder, Toichiro Suzuki, encarna la autocracia del más fuerte, creyendo que el mundo debe reorganizarse en una jerarquía donde los psíquicos sean la élite gobernante. Para Suzuki, la libertad de los "débiles" es irrelevante frente al poder de los "elegidos". El enfrentamiento entre Mob y Suzuki no es solo una batalla física, sino un choque ideológico: el colectivismo opresivo de una élite autoproclamada frente al derecho de Mob a ser simplemente un niño normal que se niega a usar la fuerza para imponer su voluntad.

(Aviso: Spoiler) El arco del "Árbol Divino" y el culto del Casco de Hoyo exploran los peligros del colectivismo religioso y la pérdida de identidad en favor de una paz artificial. La serie muestra cómo la búsqueda de un líder espiritual o una solución mágica a los problemas de la vida anula la autonomía del sujeto. Frente a esto, el Club de Musculación representa el ideal de la mejora personal voluntaria y el apoyo mutuo. Mob elige el camino largo y difícil del ejercicio físico —donde no tiene talento natural— en lugar de apoyarse en sus poderes, reafirmando que la libertad social y la dignidad personal nacen del esfuerzo consciente y la soberanía sobre las propias decisiones.`,
      añoLanzamiento: 2016,
      libertadEconomica: 3,
      libertadPersonal: 5,
      generos: [
        "Acción",
        "Comedia",
        "Sobrenatural",
        "Psicológico",
        "Slice of Life",
      ],
    },
    {
      titulo: "El viaje de Chihiro",
      slug: "el-viaje-de-chihiro",
      imagenUrl: "https://cdn.myanimelist.net/images/anime/6/79597l.webp",

      nombresAlternativos: [
        "Sen to Chihiro no Kamikakushi",
        "Spirited Away",
        "Chihiro",
      ],
      sinopsis:
        "Una niña se pierde en un mundo de espíritus y debe trabajar en un balneario mágico para salvar a sus padres y recuperar su nombre.",
      analisisPolitico: `La obra funciona como una alegoría del corporativismo depredador y la alienación del individuo en el sistema productivo. El balneario de Yubaba es un modelo de Estado-Empresa totalitario donde la identidad es un bien de consumo; al robar los nombres de sus empleados, la autoridad elimina su pasado y su capacidad de autodeterminación, convirtiéndolos en meros activos biológicos destinados al servicio permanente. Representa una sociedad donde el valor de la persona está supeditado exclusivamente a su utilidad laboral y donde la burocracia del "contrato" es la herramienta de opresión definitiva.

(Aviso: Spoiler) El robo del nombre de Chihiro (renombrada como Sen) simboliza la despersonalización del trabajador en las grandes estructuras de poder. Si olvidas quién eres fuera de tu función económica, te conviertes en una propiedad del sistema, perdiendo la soberanía sobre tu propia historia. La resistencia de Chihiro no nace de una rebelión política armada, sino de un acto de conservación de la memoria individual; mantener su nombre es el acto de desobediencia civil más radical posible en un entorno diseñado para la homogeneización y la servidumbre.

(Aviso: Spoiler) La figura de Sin Cara representa el vacío del consumo desenfrenado y la corrupción del mercado. Su capacidad de generar oro falso para "comprar" la voluntad de los trabajadores muestra cómo el deseo material puede desestabilizar incluso las estructuras más rígidas, convirtiendo a los sujetos en seres insaciables que pierden su esencia. Frente a la acumulación y el estrés industrial de Yubaba, la película propone la ética de Zeniba: una vida descentralizada, artesanal y basada en la colaboración voluntaria (tejer juntos). El viaje final de Chihiro representa la transición de una "pieza del engranaje" a un individuo maduro que recupera su autonomía personal tras haber navegado y sobrevivido a las tripas de la maquinaria colectivista.`,
      añoLanzamiento: 2001,
      libertadEconomica: 2,
      libertadPersonal: 1,
      generos: ["Fantasía", "Aventura", "Drama"],
    },
  ];

  // 1. Extraer y crear géneros únicos
  const nombresGenerosUnicos = [...new Set(data.flatMap((a) => a.generos))];

  console.log("Inserting genres...");
  for (const nombre of nombresGenerosUnicos) {
    await db.insert(generos).values({ nombre }).onConflictDoNothing();
  }

  // 2. Obtener todos los géneros para tener sus IDs mapeados
  const todosLosGeneros = await db.select().from(generos);
  const generoMap = new Map(todosLosGeneros.map((g) => [g.nombre, g.id]));

  // 3. Insertar animes y sus relaciones
  for (const item of data) {
    const { generos: generosAnime, ...datosAnime } = item;

    // Insertar o actualizar anime
    const [insertedAnime] = await db
      .insert(animes)
      .values(datosAnime)
      .onConflictDoUpdate({
        target: animes.titulo,
        set: datosAnime,
      })
      .returning();

    console.log(`Asociando géneros para: ${insertedAnime.titulo}`);

    // Limpiar asociaciones previas (opcional, para evitar duplicados en re-seeds)
    await db
      .delete(animesGeneros)
      .where(eq(animesGeneros.animeId, insertedAnime.id));

    // Crear nuevas asociaciones
    for (const nombreGenero of generosAnime) {
      const generoId = generoMap.get(nombreGenero);
      if (generoId) {
        await db
          .insert(animesGeneros)
          .values({
            animeId: insertedAnime.id,
            generoId: generoId,
          })
          .onConflictDoNothing();
      }
    }
  }

  console.log("✅ Siembra completada con éxito.");
}

seed().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
