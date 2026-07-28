// ============ CACHE DE DOM ============
const $ = id => document.getElementById(id);
const els = {
  solarSystem: $('solar-system'),
  systemContent: document.querySelector('.system-content'),
  starContainer: document.querySelector('.star-container'),
  asteroidBelt: $('asteroid-belt'),
  btnPlay: $('btn-play'),
  speedVal: $('speed-val'),
  speedSlider: $('speed-slider'),
  zoomIndicator: $('zoom-indicator'),
  infoPanel: $('info-panel'),
  infoTitle: $('info-title'),
  infoDot: $('info-dot'),
  infoType: $('info-type'),
  infoData: $('info-data'),
  infoFact: $('info-fact'),
  controls: $('controls'),
  planetButtons: $('planet-buttons')
};
const allOrbits = document.querySelectorAll('.orbit');
const allLabels = document.querySelectorAll('.planet-label');
const allPlanets = document.querySelectorAll('.planet');
const moonOrbits = document.querySelectorAll('.earth .moon-orbit');

// ============ DATOS ============
const planetData = {
  mercury:{name:'Mercurio',type:'Planeta rocoso',color:'#a0a0a0',diameter:'4,879 km',distance:'57.9 M km',period:'88 días',temp:'167°C',moons:'0',gravity:'3.7 m/s²',fact:'<strong>Dato curioso:</strong> Mercurio es el planeta más pequeño del sistema solar. Un día dura 59 días terrestres, pero un año solo 88 días.'},
  venus:{name:'Venus',type:'Planeta rocoso',color:'#e8b84d',diameter:'12,104 km',distance:'108.2 M km',period:'225 días',temp:'465°C',moons:'0',gravity:'8.87 m/s²',fact:'<strong>Dato curioso:</strong> Venus gira al revés y es el más caliente del sistema solar debido a su densa atmósfera de CO₂.'},
  earth:{name:'Tierra',type:'Planeta rocoso',color:'#1e90ff',diameter:'12,756 km',distance:'149.6 M km',period:'365.25 días',temp:'15°C',moons:'1',gravity:'9.81 m/s²',fact:'<strong>Dato curioso:</strong> La Tierra es el único planeta conocido con vida. Su superficie está cubierta un 71% por agua líquida.'},
  mars:{name:'Marte',type:'Planeta rocoso',color:'#cd5c5c',diameter:'6,792 km',distance:'227.9 M km',period:'687 días',temp:'-65°C',moons:'2',gravity:'3.72 m/s²',fact:'<strong>Dato curioso:</strong> Marte alberga el volcán más grande del sistema solar: el Monte Olimpo, con 21.9 km de altura.'},
  jupiter:{name:'Júpiter',type:'Gigante gaseoso',color:'#daa520',diameter:'142,984 km',distance:'778.6 M km',period:'11.86 años',temp:'-110°C',moons:'95',gravity:'24.79 m/s²',fact:'<strong>Dato curioso:</strong> Júpiter es tan masivo que podría contener todos los demás planetas juntos. Su Gran Mancha Roja lleva activa al menos 350 años.'},
  saturn:{name:'Saturno',type:'Gigante gaseoso',color:'#deb887',diameter:'120,536 km',distance:'1,433.5 M km',period:'29.46 años',temp:'-140°C',moons:'146',gravity:'10.44 m/s²',fact:'<strong>Dato curioso:</strong> Los anillos de Saturno están compuestos de hielo y roca. Es tan poco denso que flotaría en agua.'},
  uranus:{name:'Urano',type:'Gigante de hielo',color:'#64dce6',diameter:'51,118 km',distance:'2,872.5 M km',period:'84 años',temp:'-195°C',moons:'28',gravity:'8.87 m/s²',fact:'<strong>Dato curioso:</strong> Urano rota de lado con un eje inclinado 98°. Fue el primer planeta descubierto con telescopio en 1781.'},
  neptune:{name:'Neptuno',type:'Gigante de hielo',color:'#2850c8',diameter:'49,528 km',distance:'4,495.1 M km',period:'165 años',temp:'-200°C',moons:'16',gravity:'11.15 m/s²',fact:'<strong>Dato curioso:</strong> Neptuno tiene los vientos más rápidos del sistema solar, alcanzando 2,100 km/h.'},
  sun:{name:'Sol',type:'Estrella enana amarilla',color:'#ffaa00',diameter:'1,391,000 km',distance:'0 km (centro)',period:'25.4 días (rotación)',temp:'5,505°C',moons:'8 (planetas)',gravity:'274 m/s²',fact:'<strong>Dato curioso:</strong> El Sol contiene el 99.86% de la masa del sistema solar. Su temperatura en el núcleo alcanza los 15 millones de °C y cada segundo convierte 600 millones de toneladas de hidrógeno en helio.'},
  moon:{name:'Luna',type:'Satélite natural',color:'#d0d0d0',diameter:'3,475 km',distance:'384,400 km de la Tierra',period:'27.3 días',temp:'-20°C (promedio)',moons:'0',gravity:'1.62 m/s²',fact:'<strong>Dato curioso:</strong> La Luna se aleja de la Tierra unos 3.8 cm cada año. Es el quinto satélite natural más grande del sistema solar y el único cuerpo celeste donde los humanos han caminado.'}
};

const asteroidData = {
  ceres:{name:'Ceres',type:'Enana menor',color:'#b0b0b0',diameter:'939 km',distance:'414 M km (cinturón)',period:'4.6 años',temp:'-106°C',moons:'0',gravity:'0.28 m/s²',fact:'<strong>Dato curioso:</strong> Ceres es el objeto más grande del cinturón de asteroides y fue reclasificado como planeta enano en 2006. Contiene agua helada y podría tener un océano subsuperficial.'},
  vesta:{name:'Vesta',type:'Asteroide',color:'#c8b888',diameter:'525 km',distance:'353 M km (cinturón)',period:'3.6 años',temp:'-20°C',moons:'0',gravity:'0.25 m/s²',fact:'<strong>Dato curioso:</strong> Vesta es el segundo asteroide más grande del cinturón. Tiene un cráter de impacto gigante en su polo sur de 500 km de diámetro, tan profundo que expone el manto rocoso interior.'},
  pallas:{name:'Pallas',type:'Asteroide',color:'#a09888',diameter:'512 km',distance:'415 M km (cinturón)',period:'4.6 años',temp:'-150°C',moons:'0',gravity:'0.22 m/s²',fact:'<strong>Dato curioso:</strong> Pallas fue el segundo asteroide descubierto (1802) y tiene una órbita muy inclinada respecto al plano eclíptico, con 34° de inclinación.'},
  eros:{name:'Eros',type:'Asteroide NEA',color:'#b8a898',diameter:'16.8 km',distance:'1.66 M km (perihelio)',period:'1.76 años',temp:'-73°C',moons:'0',gravity:'0.005 m/s²',fact:'<strong>Dato curioso:</strong> Eros fue el primer asteroide visitado por una sonda espacial (NEAR Shoemaker, 2001). Tiene forma de cacahuete y es un asteroide Amor que se aproxima a la Tierra.'}
};

const starData = {
  sirius:{name:'Sirius (Sirio)',type:'Estrella binaria',color:'#e8f0ff',magnitude:'-1.46',constellation:'Can Mayor',distance:'8.6 años luz',temp:'9,940 K',luminosity:'25.4 L☉',fact:'<strong>Dato curioso:</strong> Sirius es la estrella más brillante del cielo nocturno. Su nombre proviene del griego "seirios" (ardiente). Acompañada por Sirio B, una enana blanca.'},
  betelgeuse:{name:'Betelgeuse',type:'Supergigante roja',color:'#ff6030',magnitude:'0.42',constellation:'Orión',distance:'700 años luz',temp:'3,500 K',luminosity:'126,000 L☉',fact:'<strong>Dato curioso:</strong> Betelgeuse es una de las estrellas más grandes visibles a simple vista. Si estuviera en el centro del sistema solar, su superficie se extendería más allá de la órbita de Júpiter.'},
  polaris:{name:'Polaris (Estrella del Norte)',type:'Cefeida',color:'#fff8e0',magnitude:'1.98',constellation:'Osa Menor',distance:'433 años luz',temp:'6,015 K',luminosity:'1,260 L☉',fact:'<strong>Dato curioso:</strong> Polaris ha sido utilizada para navegar durante siglos. Es una variable cefeida que pulsa con un período de 4 días, cambiando su brillo un 15%.'},
  vega:{name:'Vega',type:'Estrella de secuencia A',color:'#d0e8ff',magnitude:'0.03',constellation:'Lira',distance:'25 años luz',temp:'9,602 K',luminosity:'40.12 L☉',fact:'<strong>Dato curioso:</strong> Vega fue la primera estrella (después del Sol) en ser fotografiada (1850) y la primera en tener un espectro registrado. Era la estrella polar hacia el año 12,000 a.C.'},
  rigel:{name:'Rigel',type:'Supergigante azul',color:'#c0d8ff',magnitude:'0.13',constellation:'Orión',distance:'860 años luz',temp:'12,100 K',luminosity:'120,000 L☉',fact:'<strong>Dato curioso:</strong> Rigel es la estrella más brillante de Orión. Su nombre proviene del árabe "Rijl Jauzā al Yūsrá" (el pie del central). Es 120,000 veces más luminosa que el Sol.'},
  antares:{name:'Antares',type:'Supergigante roja',color:'#ff4020',magnitude:'1.06',constellation:'Escorpio',distance:'550 años luz',temp:'3,660 K',luminosity:'75,000 L☉',fact:'<strong>Dato curioso:</strong> Antares significa "rival de Marte" (Anti-Ares) por su color rojizo similar. Es tan grande que si reemplazara al Sol, engulliría hasta la órbita de Marte.'},
  aldebaran:{name:'Aldebarán',type:'Gigante naranja',color:'#ff8040',magnitude:'0.85',constellation:'Tauro',distance:'65 años luz',temp:'3,910 K',luminosity:'518 L☉',fact:'<strong>Dato curioso:</strong> Aldebarán significa "el seguidor" en árabe, porque parece seguir a las Pléyades. Es una gigante naranja que ha agotado su hidrógeno nuclear y se ha expandido.'},
  proxima:{name:'Próxima Centauri',type:'Enana roja',color:'#ff6040',magnitude:'11.13',constellation:'Centauro',distance:'4.24 años luz',temp:'3,042 K',luminosity:'0.0017 L☉',fact:'<strong>Dato curioso:</strong> Próxima Centauri es la estrella más cercana al Sol a 4.24 años luz. Tiene dos exoplanetas confirmados: Próxima b (en zona habitable) y Próxima d.'},
  canopus:{name:'Canopus',type:'Supergigante',color:'#fff0d0',magnitude:'-0.74',constellation:'Quilla',distance:'310 años luz',temp:'7,400 K',luminosity:'10,700 L☉',fact:'<strong>Dato curioso:</strong> Canopus es la segunda estrella más brillante del cielo. Los navegantes la usaban como referencia. Su nombre proviene de un héroe mitológico griego.'},
  arcturus:{name:'Arcturus',type:'Gigante naranja',color:'#ffa040',magnitude:'-0.05',constellation:'Boyero',distance:'37 años luz',temp:'4,286 K',luminosity:'170 L☉',fact:'<strong>Dato curioso:</strong> Arcturus es la estrella más brillante del hemisferio norte. Se acerca al Sol a 5 km/s y en unos 4,000 años será la estrella más brillante del cielo.'}
};

const blackholeData = {
  sagittarius:{name:'Sagittarius A*',type:'Agujero negro supermasivo',color:'#ff8000',mass:'4 millones de masas solares',distance:'26,000 años luz',constellation:'Sagitario',radius:'12 millones de km',temp:'>1,000,000,000 K (acreción)',velocity:'230 km/s (órbita galáctica)',fact:'<strong>Dato curioso:</strong> Sagittarius A* es el agujero negro supermasivo en el centro de la Vía Láctea. En 2022, el Event Horizon Telescope capturó la primera imagen de su sombra, confirmando las predicciones de la Relatividad General.'},
  m87:{name:'M87*',type:'Agujero negro supermasivo',color:'#ff6600',mass:'6,500 millones de masas solares',distance:'55 millones de años luz',constellation:'Virgo',radius:'19,000 millones de km',temp:'>1,000,000,000 K (acreción)',velocity:'Circular (inestable)',fact:'<strong>Dato curioso:</strong> M87* fue el primer agujero negro en ser fotografiado directamente por el Event Horizon Telescope en 2019. Su imagen reveló un anillo brillante de gas a miles de millones de grados alrededor de la sombra central.'},
  cygnus:{name:'Cygnus X-1',type:'Agujero negro estelar',color:'#4488ff',mass:'21 masas solares',distance:'6,070 años luz',constellation:'Cisne',radius:'~30 km (horizonte)',temp:'>1,00,000,000 K (acreción)',velocity:'1,350 km/s (rotación)',fact:'<strong>Dato curioso:</strong> Cygnus X-1 fue el primer candidato a agujero negro identificado (1964). Es una fuente de rayos X potente en una binaria de rayos X, absorbiendo materia de su compañera azul supergigante HDE 226868.'},
  ross:{name:'Ross 154',type:'Agujero negro estelar candidato',color:'#ff4444',mass:'~7 masas solares (estimada)',distance:'9.8 años luz',constellation:'Sagitario',radius:'~20 km',temp:'Desconocida',velocity:'118 km/s (movimiento propio)',fact:'<strong>Dato curioso:</strong> Ross 154 (V1216 Sgr) es una enana roja cercana que muestra variabilidad irregular. Aunque no es un agujero negro confirmado, su estudio ayuda a comprender los remanentes estelares compactos cercanos al Sol.'},
  cygnusx3:{name:'Cyg X-3',type:'Microquasar / agujero negro',color:'#aa66ff',mass:'~7-23 masas solares',distance:'30,000 años luz',constellation:'Cisne',radius:'~30 km',temp:'>10,000,000 K',velocity:'Relativístico (jets)',fact:'<strong>Dato curioso:</strong> Cygnus X-3 es un microquasar que emite jets relativísticos. Fue uno de los primeros objetos galácticos detectados en ondas de radio y rayos gamma, y fue candidate a explosionar como gamma-ray burst.'},
  grs:{name:'GRS 1915+105',type:'Microquasar',color:'#ff8844',mass:'~14 masas solares',distance:'35,000 años luz',constellation:'Sagitario',radius:'~30 km',temp:'>100,000,000 K',velocity:'>95% velocidad de la luz (jets)',fact:'<strong>Dato curioso:</strong> GRS 1915+105 fue el primer objeto galáctico observado expulsando material a velocidades superiores al 95% de la velocidad de la luz. Sus erupciones de rayos X son las más energéticas conocidas en la Vía Láctea.'},
  v404:{name:'V404 Cygni',type:'Agujero negro estelar',color:'#66aaff',mass:'9 masas solares',distance:'7,800 años luz',constellation:'Cisne',radius:'~27 km',temp:'>10,000,000 K (acreción)',velocity:'300 km/s (orbital)',fact:'<strong>Dato curioso:</strong> V404 Cygni contuvo el primer agujero negro confirmado con una compañera estelar visible (1989). Sus erupciones en 2015 mostraron variaciones de rayos X cada 8 horas, revelando la dinámica del disco de acreción.'}
};

const constellationInfo = {
  'Orión':{color:'#4488ff',type:'Constelación equinoccial',stars:'7 principales',bestMonth:'Enero',area:'594 grados²',fact:'<strong>Dato curioso:</strong> Orión es reconocible mundialmente. Contiene las estrellas Betelgeuse y Rigel, y la Nebulosa de Orión (M42), una de las regiones de formación estelar más cercanas.'},
  'Tauro':{color:'#ff8040',type:'Constelación zodiacal',stars:'7 principales',bestMonth:'Enero',area:'797 grados²',fact:'<strong>Dato curioso:</strong> Tauro alberga las Pléyades (M45), un cúmulo estelar abierto visible a simple vista con más de 1,000 estrellas. Aldebarán es su estrella más brillante.'},
  'Géminis':{color:'#88aaff',type:'Constelación zodiacal',stars:'8 principales',bestMonth:'Febrero',area:'514 grados²',fact:'<strong>Dato curioso:</strong> Géminis alberga los Gemínidas, una de las lluvias de meteoros más activas del año, con hasta 150 meteoros por hora en diciembre.'},
  'Escorpio':{color:'#ff4040',type:'Constelación zodiacal',stars:'18 principales',bestMonth:'Julio',area:'497 grados²',fact:'<strong>Dato curioso:</strong> Escorpio contiene Antares, una supergigante roja que rivaliza en color con Marte. El escorpión mitológico fue enviado para cazar a Orión.'},
  'Cáncer':{color:'#88ccff',type:'Constelación zodiacal',stars:'5 principales',bestMonth:'Febrero',area:'506 grados²',fact:'<strong>Dato curioso:</strong> Cáncer es la constelación zodiacal más débil pero alberga el Cúmulo del Pesebre (M44), visible a simple vista como una mancha borrosa.'},
  'Leo':{color:'#ffcc44',type:'Constelación zodiacal',stars:'9 principales',bestMonth:'Abril',area:'947 grados²',fact:'<strong>Dato curioso:</strong> Leo es fácilmente identificable por su forma de león. Contiene el Cúmulo de Leo (M96) y el Cuásar 3C 273, el primero en ser identificado.'},
  'Libra':{color:'#aa88ff',type:'Constelación zodiacal',stars:'4 principales',bestMonth:'Junio',area:'538 grados²',fact:'<strong>Dato curioso:</strong> Libra es la única constelación zodiacal que representa un objeto inanimado (una balanza). Sus estrellas Zubeneschamali y Zubenelgenubi significan "el norte/sur del pinza" en árabe.'},
  'Sagitario':{color:'#ffaa44',type:'Constelación zodiacal',stars:'8 principales',bestMonth:'Agosto',area:'867 grados²',fact:'<strong>Dato curioso:</strong> Sagitario apunta al centro de la Vía Láctea. El Agujero Negro Supermasivo Sagittarius A* se encuentra en su dirección, a 26,000 años luz.'},
  'Acuario':{color:'#44ccff',type:'Constelación zodiacal',stars:'10 principales',bestMonth:'Octubre',area:'980 grados²',fact:'<strong>Dato curioso:</strong> Acuario es la segunda constelación más grande del cielo. Contiene los Acuáridos, una lluvia de meteoros asociada con el cometa Halley.'},
  'Piscis':{color:'#6688ff',type:'Constelación zodiacal',stars:'7 principales',bestMonth:'Noviembre',area:'889 grados²',fact:'<strong>Dato curioso:</strong> Piscis representa dos peces atados por una cuerda. Es una constelación grande pero débil, difícil de ver desde ciudades contaminadas.'},
  'Capricornio':{color:'#ccaa66',type:'Constelación zodiacal',stars:'6 principales',bestMonth:'Septiembre',area:'414 grados²',fact:'<strong>Dato curioso:</strong> Capricornio es una de las constelaciones más antiguas. Los babilonios la registraron alrededor del 1000 a.C. Representa una cabra marina mitológica.'},
  'Virgo':{color:'#aaccff',type:'Constelación zodiacal',stars:'9 principales',bestMonth:'Mayo',area:'1,294 grados²',fact:'<strong>Dato curioso:</strong> Virgo es la segunda constelación más grande del cielo y contiene el Cúmulo de Virgo, un gigantesco grupo de más de 2,000 galaxias.'},
  'Aries':{color:'#ff8866',type:'Constelación zodiacal',stars:'4 principales',bestMonth:'Diciembre',area:'441 grados²',fact:'<strong>Dato curioso:</strong> Aries fue catalogada por Ptolomeo en el siglo II. Su estrella Hamal tiene un planeta extrasolar confirmado, HD 196885 b.'},
  'Osa Mayor':{color:'#6688ff',type:'Constelación del norte',stars:'7 principales (Cucharón)',bestMonth:'Abril',area:'1,280 grados²',fact:'<strong>Dato curioso:</strong> La Osa Mayor contiene el Cucharón, uno de los asterismos más reconocibles. Las dos estrellas del borde del cucharón (Dubhe y Merak) apuntan a Polaris.'},
  'Osa Menor':{color:'#6699ff',type:'Constelación circumpolar',stars:'7 principales',bestMonth:'Junio',area:'256 grados²',fact:'<strong>Dato curioso:</strong> La Osa Menor contiene a Polaris, la estrella del norte, que ha servido de guía a navegantes durante milenios. Es circumpolar en todo el hemisferio norte.'},
  'Casiopea':{color:'#cc88ff',type:'Constelación circumpolar',stars:'5 principales (W)',bestMonth:'Noviembre',area:'598 grados²',fact:'<strong>Dato curioso:</strong> Casiopea forma una W (o M) distinctive en el cielo. Contiene la Nebulosa del Cangrejo (M1), el primer objeto catalogado como "nebulosa".'},
  'Centauro':{color:'#ffcc66',type:'Constelación del sur',stars:'11 principales',bestMonth:'Junio',area:'1,060 grados²',fact:'<strong>Dato curioso:</strong> Centauro alberga Próxima Centauri, la estrella más cercana al Sol, y Alpha Centauri, el sistema estelar más cercano.'},
  'Cruz del Sur':{color:'#ff4444',type:'Constelación del sur',stars:'5 principales',bestMonth:'Mayo',area:'68 grados²',fact:'<strong>Dato curioso:</strong> La Cruz del Sur es la constelación más pequeña del cielo pero una de las más reconocidas. Aparece en las banderas de Australia, Brasil y Nueva Zelanda.'},
  'Lira':{color:'#4488ff',type:'Constelación del norte',stars:'5 principales',bestMonth:'Agosto',area:'286 grados²',fact:'<strong>Dato curioso:</strong> Lira contiene a Vega, una de las estrellas más brillantes del cielo y punto del Triángulo de Verano. El Nebulosa del Anillo (M57) está entre sus estrellas.'},
  'Cisne':{color:'#44aaff',type:'Constelación del norte',stars:'5 principales (Cruz del Norte)',bestMonth:'Septiembre',area:'804 grados²',fact:'<strong>Dato curioso:</strong> Cisne forma la Cruz del Norte junto con Cefeo y Lira. Contiene Albireo, una de las estrellas binarias más coloridas del cielo.'},
  'Águila':{color:'#44ccff',type:'Constelación del ecuador',stars:'5 principales',bestMonth:'Agosto',area:'652 grados²',fact:'<strong>Dato curioso:</strong> Águila contiene a Altair, una de las estrellas más cercanas al Sol (16.7 años luz) y punto del Triángulo de Verano.'}
};

// ============ GENERAR ESTRELLAS (diferido para no bloquear) ============
const isMobile = false;
const starCount = 200;
(requestIdleCallback || setTimeout)(() => {
  const starFrag = document.createDocumentFragment();
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random() < 0.7 ? 1 : (Math.random() < 0.85 ? 1.5 : 2.5);
    const colors = ['#fff','#fff','#fff','#dde8ff','#fff5cc','#ffeedd'];
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};opacity:${0.2+Math.random()*0.6};`;
    if (Math.random() < 0.35) {
      s.classList.add('twinkle');
      s.style.animationDuration = `${2+Math.random()*5}s`;
      s.style.animationDelay = `${Math.random()*5}s`;
    }
    starFrag.appendChild(s);
  }
  els.starContainer.appendChild(starFrag);
}, {timeout:2000});

// ============ GENERAR ASTEROIDES (diferido) ============
(requestIdleCallback || setTimeout)(() => {
  const asteroidCount = 30;
  const astFrag = document.createDocumentFragment();
  for (let i = 0; i < asteroidCount; i++) {
    const a = document.createElement('div');
    const cls = ['','dark','bright'];
    a.className = `asteroid ${cls[Math.floor(Math.random()*3)]}`;
    const size = 2 + Math.random() * 3;
    a.style.cssText = `left:${Math.random()*100}%;top:${30+Math.random()*40}%;width:${size}px;height:${size}px;animation-duration:${15+Math.random()*30}s;animation-delay:${-Math.random()*30}s;opacity:${0.3+Math.random()*0.5};`;
    astFrag.appendChild(a);
  }
  els.asteroidBelt.appendChild(astFrag);
}, {timeout:3000});

// ============ BOTONES POR CATEGORÍA ============
function createItem(container, name, key, clickFn, color) {
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'cat-item';
  item.dataset.key = key;
  item.onclick = (e) => { e.stopPropagation(); clickFn(key); };
  item.innerHTML = `<span class="cat-item-dot" style="background:${color || '#fff'}"></span><span class="cat-item-name">${name}</span>`;
  container.appendChild(item);
}

// Planetas
const planetKeys = ['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','moon'];
const planetNames = ['Sol','Mercurio','Venus','Tierra','Marte','Júpiter','Saturno','Urano','Neptuno','Luna'];
const planetColors = ['#ffaa00','#a0a0a0','#e8b84d','#1e90ff','#cd5c5c','#daa520','#deb887','#64dce6','#2850c8','#d0d0d0'];
const pBtns = $('planet-buttons');
planetKeys.forEach((k, i) => {
  const fn = k === 'sun' ? onSunClick : k === 'moon' ? onMoonClick : onPlanetClick;
  createItem(pBtns, planetNames[i], k, fn, planetColors[i]);
});

// Asteroides
const asteroidKeys = ['ceres','vesta','pallas','eros'];
const asteroidNames = ['Ceres','Vesta','Pallas','Eros'];
const asteroidColors = ['#b0b0b0','#c8b888','#a09888','#b8a898'];
const aBtns = $('asteroid-buttons');
asteroidKeys.forEach((k, i) => createItem(aBtns, asteroidNames[i], k, onAsteroidClick, asteroidColors[i]));

// Estrellas
const starKeys = ['sirius','betelgeuse','polaris','vega','rigel','antares','aldebaran','proxima','canopus','arcturus'];
const starNames = ['Sirio','Betelgeuse','Polaris','Vega','Rigel','Antares','Aldebarán','Próx. Centauri','Canopus','Arcturus'];
const starColors = ['#e8f0ff','#ff6030','#fff8e0','#d0e8ff','#c0d8ff','#ff4020','#ff8040','#ff6040','#fff0d0','#ffa040'];
const sBtns = $('star-buttons');
starKeys.forEach((k, i) => createItem(sBtns, starNames[i], k, onStarClick, starColors[i]));

// Agujeros negros
const bhKeys = ['sagittarius','m87','cygnus','cygnusx3','grs','v404'];
const bhNames = ['Sgr A*','M87*','Cyg X-1','Cyg X-3','GRS 1915','V404 Cyg'];
const bhColors = ['#ff8000','#ff6600','#4488ff','#aa66ff','#ff8844','#66aaff'];
const bBtns = $('blackhole-buttons');
bhKeys.forEach((k, i) => createItem(bBtns, bhNames[i], k, onBlackholeClick, bhColors[i]));

// Constelaciones
const constKeys = Object.keys(constellationInfo);
const cBtns = $('constellation-buttons');
constKeys.forEach(k => createItem(cBtns, k, k, onConstellationClick, constellationInfo[k].color || '#6688ff'));

// ============ ESTADO ============
let isPlaying = true;
let currentSpeed = 1;
let currentSystemScale = 1;
let currentZoom = 1;
let currentFollowing = null;
let followRaf = null;
const options = { orbits: true, labels: true, asteroids: true, constellations: true };

// ============ BÚSQUEDA EN CATÁLOGO ============
function filterCatalog(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.cat-item').forEach(item => {
    const name = item.querySelector('.cat-item-name').textContent.toLowerCase();
    item.style.display = !q || name.includes(q) ? '' : 'none';
  });
  const hasResults = [...document.querySelectorAll('.cat-item')].some(i => i.style.display !== 'none');
  document.querySelectorAll('.cat-list').forEach(l => l.classList.toggle('open', !!q));
  document.querySelectorAll('.cat-header').forEach(h => h.classList.toggle('open', !!q));
}

// ============ CATEGORÍAS COLAPSABLES ============
function toggleCat(header, catId) {
  const list = $('cat-' + catId);
  const isOpen = list.classList.contains('open');
  list.classList.toggle('open');
  header.classList.toggle('open');
  header.setAttribute('aria-expanded', !isOpen);
}

// ============ CONTROLES ============
function togglePlay() {
  isPlaying = !isPlaying;
  els.btnPlay.textContent = isPlaying ? '▶' : '⏸';
  els.btnPlay.classList.toggle('active', isPlaying);
  allOrbits.forEach(o => o.classList.toggle('paused', !isPlaying));
  moonOrbits.forEach(m => m.style.animationPlayState = isPlaying ? 'running' : 'paused');
}

function changeSpeed(val) {
  currentSpeed = parseFloat(val);
  els.speedVal.textContent = currentSpeed.toFixed(1) + 'x';
  allOrbits.forEach(o => {
    const base = o.style.getPropertyValue('--period');
    o.style.animationDuration = `calc(${base} / ${currentSpeed})`;
  });
  moonOrbits.forEach(m => m.style.animationDuration = `calc(2.5s / ${currentSpeed})`);
}

function toggleOption(opt) {
  options[opt] = !options[opt];
  $(`toggle-${opt}`).classList.toggle('on', options[opt]);
  if (opt === 'orbits') allOrbits.forEach(o => o.style.borderColor = options.orbits ? 'rgba(255,255,255,0.1)' : 'transparent');
  if (opt === 'labels') allLabels.forEach(l => l.classList.toggle('hidden', !options.labels));
  if (opt === 'asteroids') els.asteroidBelt.classList.toggle('hidden', !options.asteroids);
  if (opt === 'constellations') {
    const cCanvas = $('constellation-canvas');
    cCanvas.classList.toggle('hidden', !options.constellations);
    if (options.constellations) drawConstellations();
  }
}

// ============ SEGUIMIENTO ============
const ZOOM_FOLLOW = 2.2;
let currentCategory = null;
let panX = 0, panY = 0;

function setTransform(zoom, tx, ty) {
  panX = tx; panY = ty;
  els.solarSystem.style.transform = `scale(${zoom}) translate(${tx}px, ${ty}px)`;
}

function onPlanetClick(key) {
  if (currentFollowing === key) { stopFollowing(); return; }
  currentFollowing = key;
  currentCategory = 'planet';
  showInfo(key, 'planet');
  highlightBtn(key);
  const orbit = document.querySelector(`[data-planet="${key}"]`);
  if (orbit) {
    const radius = parseFloat(orbit.style.getPropertyValue('--radius'));
    const angle = getCurrentAngle(orbit);
    const offsetX = Math.sin(angle) * radius * currentSystemScale;
    const offsetY = -Math.cos(angle) * radius * currentSystemScale;
    els.solarSystem.style.transition = 'transform 0.3s ease';
    setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
    currentZoom = ZOOM_FOLLOW;
    els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
    if (followRaf) { cancelAnimationFrame(followRaf); followRaf = null; }
    setTimeout(() => {
      els.solarSystem.style.transition = '';
      trackPlanetLoop();
    }, 320);
  }
}

function onSunClick() {
  if (currentFollowing === 'sun') { stopFollowing(); return; }
  currentFollowing = 'sun';
  currentCategory = 'planet';
  showInfo('sun', 'planet');
  highlightBtn('sun');
  els.solarSystem.style.transition = 'transform 0.5s ease';
  setTransform(1.5, 0, 0);
  currentZoom = 1.5;
  els.zoomIndicator.textContent = 'Zoom: 150%';
  setTimeout(() => { els.solarSystem.style.transition = ''; }, 550);
}

function onMoonClick() {
  if (currentFollowing === 'moon') { stopFollowing(); return; }
  currentFollowing = 'moon';
  currentCategory = 'planet';
  showInfo('moon', 'planet');
  highlightBtn('moon');
}

function onAsteroidClick(key) {
  if (currentFollowing === key) { stopFollowing(); return; }
  currentFollowing = key;
  currentCategory = 'asteroid';
  showInfo(key, 'asteroid');
  highlightBtn(key);
  const orbit = document.querySelector(`[data-planet="${key}"]`);
  if (orbit) {
    const radius = parseFloat(orbit.style.getPropertyValue('--radius'));
    const angle = getCurrentAngle(orbit);
    const offsetX = Math.sin(angle) * radius * currentSystemScale;
    const offsetY = -Math.cos(angle) * radius * currentSystemScale;
    els.solarSystem.style.transition = 'transform 0.3s ease';
    setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
    currentZoom = ZOOM_FOLLOW;
    els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
    if (followRaf) { cancelAnimationFrame(followRaf); followRaf = null; }
    setTimeout(() => {
      els.solarSystem.style.transition = '';
      trackPlanetLoop();
    }, 320);
  }
}

function onStarClick(key) {
  if (currentFollowing === key) { stopFollowing(); return; }
  showInfo(key, 'star');
  currentFollowing = key;
  currentCategory = 'star';
  highlightBtn(key);
  const starEl = document.querySelector(`.famous-star[onclick*="${key}"]`);
  if (starEl) {
    const r = starEl.getBoundingClientRect();
    const offsetX = r.left + r.width/2 - window.innerWidth/2;
    const offsetY = r.top + r.height/2 - window.innerHeight/2;
    els.solarSystem.style.transition = 'transform 0.5s ease';
    setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
    currentZoom = ZOOM_FOLLOW;
    els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
    setTimeout(() => { els.solarSystem.style.transition = ''; }, 550);
  }
}

function onBlackholeClick(key) {
  if (currentFollowing === key) { stopFollowing(); return; }
  showInfo(key, 'blackhole');
  currentFollowing = key;
  currentCategory = 'blackhole';
  highlightBtn(key);
  const bhEl = document.querySelector(`.blackhole-marker[onclick*="${key}"]`);
  if (bhEl) {
    const r = bhEl.getBoundingClientRect();
    const offsetX = r.left + r.width/2 - window.innerWidth/2;
    const offsetY = r.top + r.height/2 - window.innerHeight/2;
    els.solarSystem.style.transition = 'transform 0.5s ease';
    setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
    currentZoom = ZOOM_FOLLOW;
    els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
    setTimeout(() => { els.solarSystem.style.transition = ''; }, 550);
  }
}

function onConstellationClick(name) {
  if (currentFollowing === name) { stopFollowing(); return; }
  showInfo(name, 'constellation');
  currentFollowing = name;
  currentCategory = 'constellation';
  highlightBtn(name);
  const c = constellations.find(x => x.name === name);
  if (c && c.stars.length) {
    const avgX = c.stars.reduce((s, p) => s + p[0], 0) / c.stars.length;
    const avgY = c.stars.reduce((s, p) => s + p[1], 0) / c.stars.length;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const spread = Math.min(w, h) * 0.55;
    const offsetX = avgX * spread * currentSystemScale;
    const offsetY = avgY * spread * currentSystemScale;
    els.solarSystem.style.transition = 'transform 0.5s ease';
    setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
    currentZoom = ZOOM_FOLLOW;
    els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
    setTimeout(() => { els.solarSystem.style.transition = ''; }, 550);
  }
}

function startFollowing(key, category) {
  currentFollowing = key;
  currentCategory = category || (planetKeys.includes(key) ? 'planet' : (asteroidKeys.includes(key) ? 'asteroid' : null));
  showInfo(key, currentCategory);
  highlightBtn(key);
  if ((currentCategory === 'planet' || currentCategory === 'asteroid') && !followRaf) {
    trackPlanetLoop();
  }
}

function highlightBtn(key) {
  document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('focused'));
  const item = document.querySelector(`.cat-item[data-key="${key}"]`);
  if (item) {
    item.classList.add('focused');
    // Auto-expand the parent section if collapsed
    const list = item.closest('.cat-list');
    if (list && !list.classList.contains('open')) {
      list.classList.add('open');
      list.previousElementSibling?.classList.add('open');
    }
  }
}

function stopFollowing() {
  currentFollowing = null;
  currentCategory = null;
  if (followRaf) { cancelAnimationFrame(followRaf); followRaf = null; }
  document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('focused'));
  document.querySelectorAll('.famous-asteroid,.planet,.famous-star,.blackhole-marker,.sun,.moon').forEach(p => p.classList.remove('selected'));
  document.getElementById('mobile-follow-bar')?.classList.remove('show');
  els.solarSystem.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  panX = 0; panY = 0;
  els.solarSystem.style.transform = 'scale(1) translate(0px, 0px)';
  currentZoom = 1;
  els.zoomIndicator.textContent = 'Zoom: 100%';
  closeInfo();
  setTimeout(() => { els.solarSystem.style.transition = ''; }, 650);
}

function getCurrentAngle(orbit) {
  const animations = orbit.getAnimations();
  if (animations.length > 0) {
    const anim = animations[0];
    const ct = anim.currentTime;
    const dur = anim.effect.getComputedTiming().duration;
    if (ct !== null && dur > 0) return ((ct % dur) / dur) * 2 * Math.PI;
  }
  const period = parseFloat(orbit.style.getPropertyValue('--period'));
  const now = performance.now() / 1000;
  return ((now / (period / currentSpeed)) % 1) * 2 * Math.PI;
}

// Cache orbit radii to avoid layout reads in render
const orbitRadii = {};
document.querySelectorAll('.orbit[data-planet]').forEach(o => {
  orbitRadii[o.dataset.planet] = parseFloat(o.style.getPropertyValue('--radius'));
});

function trackPlanetLoop() {
  if (!currentFollowing) { followRaf = null; return; }
  const orbit = document.querySelector(`[data-planet="${currentFollowing}"]`);
  if (!orbit) { followRaf = null; return; }

  const radius = orbitRadii[currentFollowing] || parseFloat(orbit.style.getPropertyValue('--radius'));
  const angle = getCurrentAngle(orbit);

  const offsetX = Math.sin(angle) * radius * currentSystemScale;
  const offsetY = -Math.cos(angle) * radius * currentSystemScale;

  setTransform(ZOOM_FOLLOW, -offsetX / ZOOM_FOLLOW, -offsetY / ZOOM_FOLLOW);
  currentZoom = ZOOM_FOLLOW;
  els.zoomIndicator.textContent = `Zoom: ${Math.round(ZOOM_FOLLOW * 100)}%`;
  followRaf = requestAnimationFrame(trackPlanetLoop);
}

function resetView() {
  if (currentFollowing) { cancelAnimationFrame(followRaf); followRaf = null; }
  currentFollowing = null;
  currentCategory = null;
  document.querySelectorAll('.cat-item').forEach(b => b.classList.remove('focused'));
  document.querySelectorAll('.famous-asteroid,.planet,.famous-star,.blackhole-marker,.sun,.moon').forEach(p => p.classList.remove('selected'));
  els.solarSystem.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  panX = 0; panY = 0;
  els.solarSystem.style.transform = 'scale(1) translate(0px, 0px)';
  currentZoom = 1;
  els.zoomIndicator.textContent = 'Zoom: 100%';
  closeInfo();
  setTimeout(() => { els.solarSystem.style.transition = ''; }, 650);
  els.speedSlider.value = 1;
  changeSpeed(1);
  if (!isPlaying) togglePlay();
}

// ============ ZOOM ============
function applyZoom(scale, tx, ty) {
  currentZoom = scale;
  if (tx !== undefined && ty !== undefined) { panX = tx; panY = ty; }
  setTransform(scale, panX, panY);
  els.zoomIndicator.textContent = `Zoom: ${Math.round(scale*100)}%`;
}

// Smooth wheel zoom (accumulates deltas per frame)
let wheelAcc = 0;
let wheelPending = false;
document.addEventListener('wheel', (e) => {
  if (e.target.closest('#controls') || e.target.closest('#info-panel')) return;
  e.preventDefault();
  if (currentFollowing) stopFollowing();
  wheelAcc += e.deltaY > 0 ? -0.08 : 0.08;
  if (!wheelPending) {
    wheelPending = true;
    requestAnimationFrame(() => {
      currentZoom = Math.max(0.3, Math.min(3, currentZoom + wheelAcc));
      currentZoom = Math.round(currentZoom * 10) / 10;
      applyZoom(currentZoom);
      wheelAcc = 0;
      wheelPending = false;
    });
  }
}, { passive: false });

// Throttled pinch-to-zoom
let initialPinchDistance = null;
let pinchStartZoom = 1;
let pinchRaf = null;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    if (currentFollowing) stopFollowing();
    initialPinchDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    pinchStartZoom = currentZoom;
  }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2 && initialPinchDistance !== null) {
    if (e.target.closest('#controls') || e.target.closest('#info-panel')) return;
    e.preventDefault();
    if (pinchRaf) return;
    pinchRaf = requestAnimationFrame(() => {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      currentZoom = Math.max(0.3, Math.min(3, pinchStartZoom * (dist / initialPinchDistance)));
      applyZoom(currentZoom);
      pinchRaf = null;
    });
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  initialPinchDistance = null;
  pinchRaf = null;
}, { passive: true });

// ============ DRAG TO PAN ============
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let dragPanStartX = 0, dragPanStartY = 0;
let dragMoved = false;

els.solarSystem.addEventListener('mousedown', (e) => {
  if (currentFollowing || e.button !== 0) return;
  if (e.target.closest('.planet') || e.target.closest('.famous-asteroid') ||
      e.target.closest('.famous-star') || e.target.closest('.blackhole-marker') ||
      e.target.closest('.sun') || e.target.closest('.moon')) return;
  isDragging = true; dragMoved = false;
  dragStartX = e.clientX; dragStartY = e.clientY;
  dragPanStartX = panX; dragPanStartY = panY;
  els.solarSystem.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
  setTransform(currentZoom, dragPanStartX + dx / currentZoom, dragPanStartY + dy / currentZoom);
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  els.solarSystem.style.cursor = '';
});

// Touch drag
let touchId = null;
els.solarSystem.addEventListener('touchstart', (e) => {
  if (currentFollowing || e.touches.length !== 1) return;
  if (e.target.closest('.planet') || e.target.closest('.famous-asteroid') ||
      e.target.closest('.famous-star') || e.target.closest('.blackhole-marker') ||
      e.target.closest('.sun') || e.target.closest('.moon')) return;
  touchId = e.touches[0].identifier;
  isDragging = true; dragMoved = false;
  dragStartX = e.touches[0].clientX; dragStartY = e.touches[0].clientY;
  dragPanStartX = panX; dragPanStartY = panY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const t = [...e.touches].find(t => t.identifier === touchId);
  if (!t) return;
  const dx = t.clientX - dragStartX;
  const dy = t.clientY - dragStartY;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
  setTransform(currentZoom, dragPanStartX + dx / currentZoom, dragPanStartY + dy / currentZoom);
}, { passive: true });

document.addEventListener('touchend', () => {
  isDragging = false; touchId = null;
});

// ============ SWIPE-TO-CLOSE INFO PANEL (móvil) ============
let infoTouchStartY = 0;
let infoSwiping = false;
const infoPanel = els.infoPanel;
const infoHandle = infoPanel.querySelector('.info-handle');

infoHandle.addEventListener('touchstart', (e) => {
  infoTouchStartY = e.touches[0].clientY;
  infoSwiping = true;
  infoPanel.style.transition = 'none';
}, { passive: true });

infoPanel.addEventListener('touchmove', (e) => {
  if (!infoSwiping) return;
  const dy = e.touches[0].clientY - infoTouchStartY;
  if (dy > 0) {
    infoPanel.style.transform = `translateY(${dy}px)`;
  }
}, { passive: true });

infoPanel.addEventListener('touchend', (e) => {
  if (!infoSwiping) return;
  infoSwiping = false;
  infoPanel.style.transition = '';
  const dy = e.changedTouches[0].clientY - infoTouchStartY;
  if (dy > 80) {
    closeInfo();
  } else {
    infoPanel.style.transform = '';
    infoPanel.classList.add('visible');
  }
}, { passive: true });

// On mobile, click on orbit ring activates the planet
document.addEventListener('click', (e) => {
  if (window.innerWidth > 768) return;
  const orbit = e.target.closest('.orbit[data-planet]');
  if (orbit && !e.target.closest('.planet')) {
    onPlanetClick(orbit.dataset.planet);
  }
});

// ============ PANEL DE INFO ============
function showInfo(key, category) {
  let d, fields;
  if (category === 'asteroid' || (!category && asteroidData[key])) {
    d = asteroidData[key];
    fields = [['Diámetro',d.diameter],['Distancia',d.distance],['Período',d.period],['Temp.',d.temp],['Lunas',d.moons],['Gravedad',d.gravity]];
  } else if (category === 'star' || (!category && starData[key])) {
    d = starData[key];
    fields = [['Magnitud',d.magnitude],['Constelación',d.constellation],['Distancia',d.distance],['Temperatura',d.temp],['Luminosidad',d.luminosity],['Tipo',d.type]];
  } else if (category === 'blackhole' || (!category && blackholeData[key])) {
    d = blackholeData[key];
    fields = [['Masa',d.mass],['Distancia',d.distance],['Constelación',d.constellation],['Radio',d.radius],['Temp.',d.temp],['Velocidad',d.velocity]];
  } else if (category === 'constellation' || (!category && constellationInfo[key])) {
    d = constellationInfo[key];
    d.name = key;
    fields = [['Tipo',d.type],['Estrellas',d.stars],['Mejor mes',d.bestMonth],['Área',d.area],['Color',d.color || '#fff'],['—','—']];
  } else {
    d = planetData[key];
    if (!d) return;
    fields = [['Diámetro',d.diameter],['Distancia',d.distance],['Período',d.period],['Temp.',d.temp],['Lunas',d.moons],['Gravedad',d.gravity]];
  }
  if (!d) return;

  document.querySelectorAll('.famous-asteroid,.planet,.famous-star,.blackhole-marker,.sun,.moon').forEach(p => p.classList.remove('selected'));

  let el;
  if (category === 'blackhole') {
    el = document.querySelector(`.blackhole-marker[onclick*="${key}"]`);
  } else if (category === 'star') {
    el = document.querySelector(`.famous-star[onclick*="${key}"]`);
  } else if (category === 'constellation') {
    el = null;
  } else {
    el = document.querySelector(`.planet.${key}`) || document.querySelector(`.famous-asteroid.${key}`);
  }
  if (el) el.classList.add('selected');

  els.infoTitle.textContent = d.name;
  els.infoDot.style.background = d.color || '#fff';
  els.infoType.textContent = d.type || '';
  els.infoData.innerHTML = fields.map(([l,v]) => `<div class="data-item"><div class="data-label">${l}</div><div class="data-value">${v}</div></div>`).join('');
  els.infoFact.innerHTML = d.fact || '';
  els.infoPanel.classList.add('visible');
}

function closeInfo() {
  els.infoPanel.classList.remove('visible');
  els.infoPanel.style.transform = '';
  document.querySelectorAll('.famous-asteroid,.planet,.famous-star,.blackhole-marker,.sun,.moon').forEach(p => p.classList.remove('selected'));
}

// ============ CLICK EN SOLAR SYSTEM ============
els.solarSystem.addEventListener('click', (e) => {
  if (e.target.id === 'solar-system' || e.target.classList.contains('star')) {
    if (currentFollowing) stopFollowing();
    else closeInfo();
  }
});

// ============ ESCALADO RESPONSIVE ============
function applyResponsiveScale() {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  let scale = minDim / 1450;
  scale = Math.max(0.35, Math.min(1, scale));
  currentSystemScale = scale;
  els.systemContent.style.transform = `scale(${scale})`;
}

// ============ CONSTELACIONES (88 constelaciones IAU) ============
const constellations = [
  // ZODIACO (12)
  {name:'Aries',stars:[[-.72,.18],[-.66,.22],[-.60,.20]],lines:[[0,1],[1,2]]},
  {name:'Tauro',stars:[[-.50,.25],[-.44,.22],[-.40,.28],[-.36,.24],[-.32,.30],[-.28,.26],[-.42,.18],[-.38,.15],[-.34,.18]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[1,6],[6,7],[7,8]]},
  {name:'Géminis',stars:[[-.18,.15],[-.14,.12],[-.16,.22],[-.12,.19],[-.10,.08],[-.06,.06],[-.08,.16],[-.04,.14]],lines:[[0,1],[0,2],[2,3],[1,4],[4,5],[3,6],[6,7]]},
  {name:'Cáncer',stars:[[-.02,.28],[.02,.25],[.05,.30],[.08,.26],[.04,.22]],lines:[[0,1],[1,2],[2,3],[1,4]]},
  {name:'Leo',stars:[[.12,.10],[.16,.08],[.18,.14],[.22,.10],[.26,.12],[.24,.18],[.14,.16]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]]},
  {name:'Virgo',stars:[[.34,.20],[.38,.16],[.42,.22],[.46,.18],[.44,.28],[.38,.26],[.48,.24]],lines:[[0,1],[1,2],[2,3],[2,4],[0,5],[3,6]]},
  {name:'Libra',stars:[[.52,.14],[.56,.10],[.54,.18],[.58,.16],[.56,.22]],lines:[[0,1],[0,2],[2,3],[3,4]]},
  {name:'Escorpio',stars:[[.62,.30],[.66,.26],[.70,.32],[.74,.28],[.78,.34],[.82,.30],[.80,.38],[.76,.42],[.72,.40]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]]},
  {name:'Sagitario',stars:[[.82,.12],[.86,.08],[.90,.14],[.88,.20],[.84,.18],[.80,.22],[.86,.24]],lines:[[0,1],[1,2],[2,3],[0,4],[4,5],[3,6]]},
  {name:'Capricornio',stars:[[.70,-.10],[.74,-.14],[.78,-.10],[.76,-.06],[.72,-.04]],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
  {name:'Acuario',stars:[[.50,-.18],[.54,-.22],[.58,-.18],[.56,-.14],[.62,-.20],[.66,-.16]],lines:[[0,1],[1,2],[2,3],[2,4],[4,5]]},
  {name:'Piscis',stars:[[.26,-.22],[.30,-.18],[.34,-.24],[.38,-.20],[.22,-.26],[.18,-.22]],lines:[[0,1],[1,2],[2,3],[4,5],[5,0]]},
  // HEMISFERIO NORTE
  {name:'Osa Mayor',stars:[[-.55,-.35],[-.50,-.38],[-.45,-.36],[-.40,-.40],[-.35,-.38],[-.30,-.42],[-.28,-.38]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
  {name:'Osa Menor',stars:[[-.15,-.50],[-.12,-.54],[-.10,-.50],[-.08,-.52],[-.06,-.48],[-.04,-.50],[-.02,-.46]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
  {name:'Orión',stars:[[-.30,.40],[-.26,.36],[-.22,.40],[-.28,.44],[-.24,.42],[-.20,.44],[-.26,.50],[-.30,.52],[-.22,.52]],lines:[[0,1],[1,2],[0,3],[2,5],[3,4],[4,5],[3,6],[5,8],[6,7]]},
  {name:'Casiopea',stars:[[.10,-.45],[.14,-.48],[.18,-.44],[.22,-.47],[.26,-.43]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Centauro',stars:[[.60,.40],[.64,.36],[.68,.42],[.66,.48],[.62,.46],[.58,.44]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
  {name:'Cruz del Sur',stars:[[.48,.52],[.52,.48],[.54,.54],[.50,.56]],lines:[[0,1],[1,2],[2,3],[3,0],[0,2]]},
  {name:'Dragón',stars:[[-.30,-.55],[-.26,-.52],[-.22,-.56],[-.18,-.53],[-.14,-.57],[-.10,-.54],[-.06,-.58]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
  {name:'Hércules',stars:[[.05,-.30],[.09,-.34],[.13,-.30],[.11,-.26],[.07,-.28],[.03,-.32],[.15,-.36]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6]]},
  {name:'Perseo',stars:[[-.08,-.25],[-.04,-.28],[.00,-.24],[.04,-.27],[.08,-.23],[.02,-.20]],lines:[[0,1],[1,2],[2,3],[3,4],[2,5]]},
  {name:'Auriga',stars:[[-.10,-.15],[-.06,-.18],[-.02,-.14],[.02,-.17],[.06,-.13],[-.04,-.10]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
  {name:'Serpens',stars:[[.30,-.30],[.34,-.28],[.38,-.32],[.42,-.30],[.40,-.26],[.36,-.24]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},
  {name:'Ofiuco',stars:[[.28,-.22],[.32,-.20],[.36,-.24],[.40,-.22],[.44,-.26],[.42,-.30]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},
  {name:'Lira',stars:[[-.02,-.35],[.02,-.38],[.06,-.35],[.04,-.32],[.00,-.32]],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
  {name:'Cisne',stars:[[.12,-.38],[.16,-.42],[.20,-.38],[.18,-.34],[.14,-.36]],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
  {name:'Águila',stars:[[.40,-.35],[.44,-.38],[.48,-.35],[.46,-.32],[.42,-.33]],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
  {name:'Pegaso',stars:[[.10,-.15],[.18,-.12],[.22,-.18],[.14,-.20],[.10,-.15]],lines:[[0,1],[1,2],[2,3],[3,0]]},
  {name:'Andrómeda',stars:[[.15,-.10],[.20,-.14],[.25,-.10],[.30,-.14]],lines:[[0,1],[1,2],[2,3]]},
  {name:'柏修斯 (Perseo)',stars:[[-.08,-.25],[-.04,-.28],[.00,-.24],[.04,-.27],[.08,-.23]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Hydra',stars:[[-.40,.35],[-.35,.32],[-.30,.36],[-.25,.33],[-.20,.37],[-.15,.34],[-.10,.38]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
  {name:'Boyero',stars:[[-.20,-.10],[-.16,-.14],[-.12,-.10],[-.08,-.14],[-.04,-.10]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Can Mayor',stars:[[-.42,.45],[-.38,.42],[-.34,.46],[-.30,.43],[-.26,.47],[-.22,.44]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},
  {name:'Can Menor',stars:[[-.30,.48],[-.26,.50],[-.22,.48]],lines:[[0,1],[1,2]]},
  {name:'Monoceros',stars:[[-.18,.38],[-.14,.42],[-.10,.38],[-.06,.42]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Puppis',stars:[[-.50,.50],[-.46,.46],[-.42,.50],[-.38,.47]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Vela',stars:[[-.55,.55],[-.51,.52],[-.47,.56],[-.43,.53]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Carina',stars:[[-.58,.48],[-.54,.45],[-.50,.49],[-.46,.46]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Reticulo',stars:[[.62,.50],[.66,.48],[.64,.52],[.60,.50]],lines:[[0,1],[1,2],[2,3],[3,0]]},
  {name:'Triangulum',stars:[[.22,-.06],[.26,-.02],[.30,-.06]],lines:[[0,1],[1,2],[2,0]]},
  {name:'Lacerta',stars:[[.08,-.42],[.12,-.45],[.16,-.42],[.14,-.39]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Fenix',stars:[[.55,.30],[.59,.26],[.63,.30],[.61,.34],[.57,.32]],lines:[[0,1],[1,2],[2,3],[3,4],[4,0]]},
  {name:'Grulla',stars:[[.45,.32],[.49,.28],[.53,.32],[.51,.36]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Pavo',stars:[[.68,.20],[.72,.16],[.76,.20],[.74,.24],[.70,.22]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Indo',stars:[[.62,.38],[.66,.34],[.70,.38],[.68,.42]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Tucana',stars:[[.70,.42],[.74,.38],[.78,.42],[.76,.46]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Octante',stars:[[.50,.58],[.54,.55],[.58,.58],[.56,.62]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Cetus',stars:[[-.50,.05],[-.46,.02],[-.42,.06],[-.38,.03],[-.34,.07]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Eridano',stars:[[-.40,.10],[-.36,.14],[-.32,.10],[-.28,.14],[-.24,.10],[-.20,.14]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5]]},
  {name:'Orion',stars:[[-.30,.40],[-.26,.36],[-.22,.40],[-.28,.44],[-.24,.42],[-.20,.44],[-.26,.50],[-.30,.52],[-.22,.52]],lines:[[0,1],[1,2],[0,3],[2,5],[3,4],[4,5],[3,6],[5,8],[6,7]]},
  {name:'Lupus',stars:[[.55,.38],[.59,.35],[.63,.39],[.61,.43],[.57,.41]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Norma',stars:[[.52,.42],[.56,.40],[.58,.44],[.54,.46]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Circino',stars:[[.42,.38],[.46,.36],[.44,.40]],lines:[[0,1],[1,2],[2,0]]},
  {name:'Telescopio',stars:[[.72,.28],[.76,.25],[.74,.30]],lines:[[0,1],[1,2]]},
  {name:'Microscopio',stars:[[.58,.28],[.62,.25],[.60,.30]],lines:[[0,1],[1,2]]},
  {name:'Corona Austral',stars:[[.65,.15],[.69,.12],[.73,.15],[.71,.18],[.67,.17]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Corona Boreal',stars:[[.18,-.38],[.22,-.42],[.26,-.38],[.24,-.35],[.20,-.36]],lines:[[0,1],[1,2],[2,3],[3,4]]},
  {name:'Coma Berenices',stars:[[.28,-.15],[.32,-.18],[.36,-.15],[.34,-.12]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Cabo del Norte',stars:[[.32,-.08],[.36,-.12],[.40,-.08],[.38,-.05]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Sextans',stars:[[.20,.32],[.24,.28],[.28,.32]],lines:[[0,1],[1,2]]},
  {name:'Antlia',stars:[[.38,.40],[.42,.36],[.46,.40]],lines:[[0,1],[1,2]]},
  {name:'Pyxis',stars:[[.30,.44],[.34,.40],[.38,.44]],lines:[[0,1],[1,2]]},
  {name:'Machina Council',stars:[[.22,.50],[.26,.46],[.30,.50],[.28,.54]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Horologium',stars:[[.65,.32],[.69,.28],[.73,.32]],lines:[[0,1],[1,2]]},
  {name:'Octans',stars:[[.50,.58],[.54,.55],[.58,.58]],lines:[[0,1],[1,2]]},
  {name:'Musca',stars:[[.42,.56],[.46,.52],[.50,.56],[.48,.60]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Chamaeleon',stars:[[.55,.55],[.59,.52],[.63,.56],[.61,.60]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Apus',stars:[[.48,.52],[.52,.48],[.56,.52]],lines:[[0,1],[1,2]]},
  {name:'Volans',stars:[[.72,.45],[.76,.42],[.74,.48],[.70,.46]],lines:[[0,1],[1,2],[2,3]]},
  {name:'Pictor',stars:[[.68,.35],[.72,.32],[.70,.38]],lines:[[0,1],[1,2]]},
  {name:'Celum',stars:[[.60,.22],[.64,.18],[.62,.24]],lines:[[0,1],[1,2]]},
  {name:'Sculptor',stars:[[.48,.18],[.52,.14],[.50,.20]],lines:[[0,1],[1,2]]},
  {name:'Fornax',stars:[[.40,.12],[.44,.08],[.42,.14]],lines:[[0,1],[1,2]]},
  {name:'Eridanus',stars:[[-.40,.10],[-.36,.14],[-.32,.10],[-.28,.14],[-.24,.10],[-.20,.14],[-.16,.10]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]},
  {name:'Caelum',stars:[[.56,.20],[.60,.16],[.58,.22]],lines:[[0,1],[1,2]]},
  {name:'Reticulum',stars:[[.62,.50],[.66,.48],[.64,.52],[.60,.50]],lines:[[0,1],[1,2],[2,3],[3,0]]},
  {name:'Dorado',stars:[[.70,.35],[.74,.32],[.72,.38]],lines:[[0,1],[1,2]]},
  {name:'Mensae',stars:[[.54,.60],[.58,.57],[.56,.63]],lines:[[0,1],[1,2]]},
  {name:'Volans',stars:[[.72,.45],[.76,.42],[.74,.48]],lines:[[0,1],[1,2]]},
  {name:'Microscopium',stars:[[.58,.28],[.62,.25]],lines:[[0,1]]},
  {name:'Triangulum Australe',stars:[[.60,.55],[.64,.52],[.62,.58]],lines:[[0,1],[1,2],[2,0]]},
  {name:'Crux',stars:[[.48,.52],[.52,.48],[.54,.54],[.50,.56]],lines:[[0,1],[1,2],[2,3],[3,0],[0,2]]},
];

// ============ RENDERIZAR CONSTELACIONES ============
const constellationCanvas = $('constellation-canvas');
const cCtx = constellationCanvas.getContext('2d');

function drawConstellations() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  constellationCanvas.width = w;
  constellationCanvas.height = h;
  cCtx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const spread = Math.min(w, h) * 0.55;

  const zodiacNames = ['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];

  constellations.forEach(c => {
    const isZodiac = zodiacNames.includes(c.name);
    const pts = c.stars.map(([x, y]) => [cx + x * spread, cy + y * spread]);

    cCtx.strokeStyle = isZodiac ? 'rgba(100,160,220,0.10)' : 'rgba(255,255,255,0.05)';
    cCtx.lineWidth = isZodiac ? 0.6 : 0.4;
    cCtx.beginPath();
    c.lines.forEach(([a, b]) => {
      if (pts[a] && pts[b]) {
        cCtx.moveTo(pts[a][0], pts[a][1]);
        cCtx.lineTo(pts[b][0], pts[b][1]);
      }
    });
    cCtx.stroke();

    pts.forEach(([x, y]) => {
      cCtx.fillStyle = isZodiac ? 'rgba(100,160,220,0.35)' : 'rgba(255,255,255,0.2)';
      cCtx.beginPath();
      cCtx.arc(x, y, isZodiac ? 1.8 : 1.2, 0, Math.PI * 2);
      cCtx.fill();
    });

    const avgX = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const avgY = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    cCtx.font = `${isZodiac ? '9' : '8'}px 'Segoe UI', sans-serif`;
    cCtx.fillStyle = isZodiac ? 'rgba(100,160,220,0.18)' : 'rgba(255,255,255,0.10)';
    cCtx.textAlign = 'center';
    cCtx.fillText(c.name, avgX, avgY + 12);
  });
}

drawConstellations();
applyResponsiveScale();
document.getElementById('loader')?.classList.add('hide');
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    applyResponsiveScale();
    if (options.constellations) drawConstellations();
  }, 100);
});

// ============ TECLADO ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (currentFollowing) stopFollowing();
    closeInfo();
  }
  if (e.key === 'r' || e.key === 'R') { resetView(); }
  if (e.key === '+' || e.key === '=') {
    currentZoom = Math.min(3, currentZoom + 0.2);
    applyZoom(currentZoom);
  }
  if (e.key === '-') {
    currentZoom = Math.max(0.3, currentZoom - 0.2);
    applyZoom(currentZoom);
  }
  const panStep = 20 / currentZoom;
  if (e.key === 'ArrowLeft') { setTransform(currentZoom, panX - panStep, panY); e.preventDefault(); }
  if (e.key === 'ArrowRight') { setTransform(currentZoom, panX + panStep, panY); e.preventDefault(); }
  if (e.key === 'ArrowUp') { setTransform(currentZoom, panX, panY - panStep); e.preventDefault(); }
  if (e.key === 'ArrowDown') { setTransform(currentZoom, panX, panY + panStep); e.preventDefault(); }
});

// ============ KEYBOARD NAV ============
document.querySelectorAll('.planet,.famous-asteroid,.famous-star,.blackhole-marker,.sun,.moon').forEach(el => {
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
});
document.getElementById('solar-system').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const target = e.target.closest('.planet,.famous-asteroid,.famous-star,.blackhole-marker,.sun,.moon');
  if (!target) return;
  e.preventDefault();
  target.click();
});

// ============ SERVICE WORKER ============
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
