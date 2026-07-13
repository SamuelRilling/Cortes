export type Materia = {
  icon: string
  name: string
  desc?: string
  subs?: string[]
  groups?: { label: string; subs: string[] }[]
}

export type Sala = {
  id: string
  icon: string
  kicker: string
  short: string
  title: string
  color: string
  summary: string
  materias: Materia[]
}

export type Tier = {
  title: string
  root: { desc: string }
  pleno: {
    icon: string
    color: string
    subtitle?: string
    desc?: string
    items?: { icon: string; title: string; desc: string; subs?: string[] }[]
    subs?: string[]
  }
  salasHeader: { icon: string; color: string; subtitle: string; desc: string }
  salas: Sala[]
  flow: {
    n: string
    q: string
    color: string
    items?: string[]
    desc?: string
  }[] | null
}

export type Meta = {
  flowTitle?: string
  flowSubtitle?: string
  flowKey?: string
  flowKeyDesc?: string
  ficha?: {
    plazos?: { r: string; t: string }[]
    quorum?: string
    recibe?: string
    deriva?: string
    territorial?: string
    base?: string
  }
}

const P = {
  pleno:   'oklch(0.52 0.15 300)',
  salas:   'oklch(0.53 0.15 255)',
  civil:   'oklch(0.55 0.12 158)',
  penal:   'oklch(0.56 0.17 25)',
  tercera: 'oklch(0.63 0.15 55)',
  cuarta:  'oklch(0.68 0.12 88)',
}

export const TIERS: Record<string, Tier> = {
  cs: {
    title: 'Corte Suprema',
    root: { desc: 'Máximo tribunal de la judicatura. Conoce recursos de casación, apelaciones y otros procedimientos en las materias que la ley le encomienda.' },
    pleno: {
      icon: 'users', color: P.pleno,
      subtitle: 'Tribunal Pleno',
      desc: 'Órgano superior de la Corte Suprema. Conoce las materias que la ley reserva expresamente al Pleno.',
      items: [
        { icon: 'clipboard-list', title: 'Materias administrativas', desc: 'Organización interna, distribución de causas, medidas de gestión y funcionamiento.' },
        { icon: 'scale', title: 'Superintendencia judicial', desc: 'Supervisa la actividad de los tribunales del país (excepto el Tribunal Constitucional y el Tribunal de Defensa de la Libre Competencia).' },
        { icon: 'gavel', title: 'Autos acordados', desc: 'Dicta normas generales para la tramitación y funcionamiento de los tribunales.' },
        { icon: 'lock', title: 'Asuntos reservados al Pleno', desc: 'Conoce aquellos casos o materias que la ley entrega expresamente al Pleno.' },
      ],
    },
    salasHeader: { icon: 'layers', color: P.salas, subtitle: 'Cuatro salas con competencia propia', desc: 'La Corte Suprema se divide en 4 salas especializadas, cada una con competencia en materias específicas.' },
    salas: [
      {
        id: 'civil', icon: 'scale', kicker: 'Primera Sala', short: 'Civil', title: 'Primera Sala · Civil', color: P.civil,
        summary: 'Conoce principalmente recursos de casación en la forma y en el fondo, apelaciones y demás asuntos en materias civiles y comerciales.',
        materias: [
          { icon: 'handshake', name: 'Materia civil', subs: ['Contratos', 'Obligaciones', 'Bienes', 'Indemnizaciones'] },
          { icon: 'building-2', name: 'Comercial', groups: [
            { label: 'Empresas', subs: ['Sociedades', 'Actos de comercio'] },
            { label: 'Insolvencia', subs: ['Quiebras', 'Liquidación', 'Reorganización', 'Renegociación'] },
          ] },
          { icon: 'shopping-cart', name: 'Protección al consumidor', desc: 'Recursos en causas de protección de los derechos de los consumidores.' },
          { icon: 'file-signature', name: 'Juicios ejecutivos y arbitraje', desc: 'Cobro de títulos ejecutivos y asuntos conocidos por jueces árbitros.' },
          { icon: 'globe', name: 'Exequátur', desc: 'Reconocimiento de sentencias extranjeras y exhortos internacionales.' },
          { icon: 'refresh-cw', name: 'Recursos', subs: ['Casación en la forma', 'Casación en el fondo', 'Apelación', 'Queja'] },
        ],
      },
      {
        id: 'penal', icon: 'gavel', kicker: 'Segunda Sala', short: 'Penal', title: 'Segunda Sala · Penal', color: P.penal,
        summary: 'Conoce los recursos y acciones en materia penal y en las materias especiales asignadas por la ley.',
        materias: [
          { icon: 'scale', name: 'Delitos penales', desc: 'Conoce causas por delitos, crímenes, simples delitos y faltas.' },
          { icon: 'file-text', name: 'Otras materias', subs: ['Propiedad industrial', 'Infraccional (Policía Local)', 'Extradición', 'Libertad condicional'] },
          { icon: 'refresh-cw', name: 'Recursos', subs: ['Nulidad', 'Casación', 'Queja', 'Revisión', 'Amparo', 'Apelación'] },
        ],
      },
      {
        id: 'tercera', icon: 'landmark', kicker: 'Tercera Sala', short: 'Constitucional', title: 'Tercera Sala · Constitucional / Contencioso Administrativo', color: P.tercera,
        summary: 'Conoce y resuelve asuntos contencioso-administrativos y recursos que tutelan derechos fundamentales, así como materias tributarias y de amparo económico.',
        materias: [
          { icon: 'clipboard-list', name: 'Actos del Estado', groups: [
            { label: 'Contencioso administrativo', subs: ['Ilegalidad de actos', 'Nulidad de derecho público'] },
            { label: 'Responsabilidad del Estado', subs: ['Falta de servicio', 'Potestades públicas'] },
          ] },
          { icon: 'circle-dollar-sign', name: 'Tributario', subs: ['Materias tributarias', 'Cobro de rentas municipales'] },
          { icon: 'droplets', name: 'Aguas y expropiaciones', desc: 'Causas de aguas y de expropiaciones.' },
          { icon: 'shield-check', name: 'Derechos constitucionales', desc: 'Apelaciones de recursos de protección resueltos por las Cortes de Apelaciones, y otros amparos constitucionales.' },
          { icon: 'trending-up', name: 'Amparo económico', desc: 'Amparo económico (Ley N° 18.971, sobre infracción al Art. 19 N° 21 de la Constitución).' },
        ],
      },
      {
        id: 'cuarta', icon: 'users-round', kicker: 'Cuarta Sala', short: 'Laboral y Mixta', title: 'Cuarta Sala · Laboral y Mixta', color: P.cuarta,
        summary: 'Conoce asuntos laborales, previsionales, de familia, minería y responsabilidad extracontractual, junto con los recursos que la ley le encomienda.',
        materias: [
          { icon: 'briefcase', name: 'Laboral', subs: ['Conflictos individuales', 'Conflictos colectivos'] },
          { icon: 'piggy-bank', name: 'Previsional', subs: ['Pensiones', 'Seguridad social'] },
          { icon: 'coins', name: 'Cobranza laboral y previsional', desc: 'Recursos en cobranza de obligaciones laborales y previsionales.' },
          { icon: 'users', name: 'Familia', desc: 'Asuntos de familia (divorcio, filiación, cuidado personal, etc.).' },
          { icon: 'mountain', name: 'Minería', desc: 'Controversias mineras.' },
          { icon: 'fish', name: 'Pesca y propiedad intelectual', desc: 'Causas civiles de pesca y de propiedad intelectual.' },
          { icon: 'triangle-alert', name: 'Responsabilidad extracontractual', desc: 'Indemnizaciones por daño extracontractual.' },
          { icon: 'refresh-cw', name: 'Recursos', subs: ['Nulidad', 'Unificación de jurisprudencia', 'Apelación', 'Casación'] },
        ],
      },
    ],
    flow: [
      { n: '1', q: '¿Qué materia es?', color: P.civil, items: ['Civil', 'Penal', 'Constitucional', 'Laboral', 'Familia', 'Tributaria / Administrativa'] },
      { n: '2', q: '¿Qué tipo de acción?', color: P.salas, items: ['Demanda', 'Recurso', 'Amparo', 'Protección', 'Apelación'] },
      { n: '3', q: '¿Qué procedimiento aplica?', color: P.pleno, items: ['Ordinario', 'Especial', 'Ejecutivo', 'Sumario'] },
      { n: '4', q: '¿Qué sala conoce la materia?', color: P.penal, desc: 'Se distribuye a la Sala Especializada que tiene competencia según la materia y el recurso.' },
      { n: '5', q: 'Resolución', color: P.tercera, desc: 'La Sala o el Pleno dicta sentencia o resolución que pone término al recurso o asunto.' },
    ],
  },

  ca: {
    title: 'Cortes de Apelaciones',
    root: { desc: '17 tribunales colegiados, superiores jerárquicos de los tribunales de primera instancia. Competencia normalmente regional; funcionan en salas de mínimo 3 ministros.' },
    pleno: {
      icon: 'map', color: P.pleno,
      subtitle: 'Las 17 cortes del país',
      subs: ['Arica', 'Iquique', 'Antofagasta', 'Copiapó', 'La Serena', 'Valparaíso', 'Santiago', 'San Miguel', 'Rancagua', 'Talca', 'Chillán', 'Concepción', 'Temuco', 'Valdivia', 'Puerto Montt', 'Coyhaique', 'Punta Arenas'],
    },
    salasHeader: { icon: 'layers', color: P.salas, subtitle: 'Tres ámbitos de competencia', desc: 'Cada Corte de Apelaciones ejerce estas competencias sobre los tribunales de su jurisdicción.' },
    salas: [
      {
        id: 'ca-2i', icon: 'scale', kicker: 'Regla general', short: 'Segunda instancia', title: 'Segunda instancia', color: P.salas,
        summary: 'Su función principal: revisar la correcta aplicación de la ley en sentencias de tribunales inferiores.',
        materias: [
          { icon: 'refresh-cw', name: 'Recurso de apelación', desc: 'Contra sentencias de juzgados de letras, familia, trabajo y garantía.' },
          { icon: 'file-text', name: 'Casación en la forma', desc: 'Vela por el debido proceso en los tribunales inferiores de su territorio.' },
          { icon: 'clipboard-list', name: 'Consultas', desc: 'Revisión de ciertas sentencias sin necesidad de recurso de parte.' },
        ],
      },
      {
        id: 'ca-1i', icon: 'shield-check', kicker: 'Acciones constitucionales', short: 'Primera instancia', title: 'Primera instancia', color: P.tercera,
        summary: 'Acciones constitucionales y asuntos que la ley le entrega directamente.',
        materias: [
          { icon: 'shield-check', name: 'Recurso de protección', desc: 'Acción constitucional (Art. 20 de la Constitución Política).' },
          { icon: 'lock', name: 'Recurso de amparo', desc: 'Protección de la libertad personal (Art. 21 de la Constitución Política).' },
          { icon: 'trending-up', name: 'Amparo económico', desc: 'Ley N° 18.971 (Art. 19 N° 21 de la Constitución Política).' },
          { icon: 'gavel', name: 'Desafuero', desc: 'Diputados, senadores y delegados presidenciales.' },
          { icon: 'file-signature', name: 'Querella de capítulos', desc: 'Responsabilidad penal de jueces por actos ministeriales.' },
          { icon: 'users', name: 'Juicios de amovilidad', desc: 'Contra jueces de letras.' },
          { icon: 'triangle-alert', name: 'Responsabilidad civil de jueces', desc: 'Demandas por actos ministeriales.' },
        ],
      },
      {
        id: 'ca-disc', icon: 'gavel', kicker: 'Control', short: 'Disciplinarias', title: 'Facultades disciplinarias y conservadoras', color: P.penal,
        summary: 'Control sobre los tribunales inferiores de su territorio.',
        materias: [
          { icon: 'gavel', name: 'Recurso de queja', desc: 'Faltas o abusos graves cometidos en resoluciones.' },
          { icon: 'refresh-cw', name: 'Contiendas de competencia', desc: 'Entre tribunales inferiores de su jurisdicción.' },
          { icon: 'clipboard-list', name: 'Visitas', desc: 'A recintos de detención y prisión.' },
        ],
      },
    ],
    flow: [
      { n: '1', q: 'Sentencia de primera instancia', color: P.civil, desc: 'Un juzgado de letras, familia, trabajo o garantía dicta sentencia.' },
      { n: '2', q: 'Recurso de la parte', color: P.salas, items: ['Apelación', 'Casación en la forma', 'Queja'] },
      { n: '3', q: 'La Corte de Apelaciones revisa', color: P.tercera, desc: 'Una sala de mínimo 3 ministros conoce el recurso.' },
      { n: '4', q: 'Resolución', color: P.penal, desc: 'Confirma, revoca o modifica la sentencia; o resuelve la acción constitucional.' },
      { n: '5', q: 'Casación ante la Corte Suprema', color: P.cuarta, desc: 'Contra la sentencia de segunda instancia procede, en su caso, casación en la forma o en el fondo.' },
    ],
  },

  ti: {
    title: 'Primera Instancia',
    root: { desc: 'Base de la estructura judicial. Cada columna es un tipo de tribunal de primera instancia; los tribunales penales se dividen en dos: el Juzgado de Garantía (investigación) y el Tribunal de Juicio Oral en lo Penal (juicio).' },
    pleno: {
      icon: 'info', color: P.pleno,
      subtitle: 'Cómo leer este nivel',
      desc: 'Cada columna es un tipo de tribunal de primera instancia. Los tribunales penales se dividen en dos: el Juzgado de Garantía (investigación) y el Tribunal de Juicio Oral en lo Penal (juicio).',
    },
    salasHeader: { icon: 'layers', color: P.salas, subtitle: 'Cinco tipos de tribunal', desc: 'Selecciona un tipo de tribunal para ver sus materias.' },
    salas: [
      {
        id: 'ti-civil', icon: 'scale', kicker: 'Competencia común', short: 'Civiles', title: 'Juzgados de Letras en lo Civil', color: P.civil,
        summary: 'Juzgados de Letras en lo Civil / de Competencia Común. Absorben materias especializadas donde no hay tribunal propio.',
        materias: [
          { icon: 'handshake', name: 'Contratos y obligaciones', desc: 'Cumplimiento, resolución, indemnización de perjuicios.' },
          { icon: 'building-2', name: 'Bienes y propiedad', desc: 'Dominio, posesión, servidumbres.' },
          { icon: 'file-signature', name: 'Juicio ejecutivo', desc: 'Cobro de títulos ejecutivos.' },
          { icon: 'users', name: 'Familia y trabajo residual', desc: 'Solo donde no existe juzgado especializado.' },
          { icon: 'clipboard-list', name: 'Actos judiciales no contenciosos', desc: 'Posesión efectiva, cambio de nombre, etc.' },
          { icon: 'building-2', name: 'Comercial y quiebras', desc: 'Personas naturales y empresas.' },
        ],
      },
      {
        id: 'ti-penal', icon: 'gavel', kicker: 'Garantía + Juicio Oral', short: 'Penales', title: 'Tribunales Penales', color: P.penal,
        summary: 'Dos tribunales distintos: el Juzgado de Garantía (fase de investigación y control) y el Tribunal de Juicio Oral en lo Penal (juicio).',
        materias: [
          { icon: 'shield-check', name: 'Juzgado de Garantía', groups: [
            { label: 'Investigación y control', subs: ['Garantía de derechos del imputado', 'Control de la investigación', 'Detención y medidas cautelares', 'Formalización'] },
            { label: 'Resolución', subs: ['Procedimiento abreviado', 'Procedimiento simplificado', 'Faltas y Ley de Alcoholes', 'Ejecución de condenas'] },
          ] },
          { icon: 'users-round', name: 'Tribunal de Juicio Oral en lo Penal', groups: [
            { label: 'Juicio', subs: ['Juicio oral (3 jueces)', 'Crímenes y simples delitos', 'Sentencia definitiva'] },
            { label: 'Impugnación', subs: ['No apelable: se recurre por nulidad', 'Ante la Corte de Apelaciones o Corte Suprema'] },
          ] },
        ],
      },
      {
        id: 'ti-familia', icon: 'users', kicker: 'Ley 19.968', short: 'Familia', title: 'Juzgados de Familia', color: P.pleno,
        summary: 'Juzgados de Familia (Ley 19.968). Procedimiento oral y concentrado, con mediación previa obligatoria en ciertas materias.',
        materias: [
          { icon: 'users', name: 'Filiación y cuidado', desc: 'Cuidado personal, relación directa y regular, patria potestad.' },
          { icon: 'coins', name: 'Alimentos', desc: 'Pensiones alimenticias.' },
          { icon: 'file-text', name: 'Divorcio y nulidad', desc: 'Divorcio, nulidad matrimonial y uniones civiles.' },
          { icon: 'triangle-alert', name: 'Violencia intrafamiliar', desc: 'Actos de violencia en el ámbito familiar.' },
          { icon: 'shield-check', name: 'Medidas de protección', desc: 'Niños, niñas y adolescentes vulnerados en sus derechos.' },
          { icon: 'heart', name: 'Adopción', desc: 'Procedimientos de adopción.' },
          { icon: 'clipboard-list', name: 'Procedimiento', desc: 'Oral y concentrado, con mediación previa obligatoria en ciertas materias.' },
        ],
      },
      {
        id: 'ti-laboral', icon: 'briefcase', kicker: 'Código del Trabajo', short: 'Laborales', title: 'Juzgados de Letras del Trabajo', color: P.penal,
        summary: 'Juzgados de Letras del Trabajo. Donde no existe, conoce el Juzgado de Letras Civil. Procedimiento oral con principio pro operario.',
        materias: [
          { icon: 'briefcase', name: 'Conflictos individuales', desc: 'Despido, autodespido, nulidad del despido, cobro de prestaciones.' },
          { icon: 'shield-check', name: 'Tutela de derechos fundamentales', desc: 'Vulneración en la relación laboral (Art. 485 del Código del Trabajo).' },
          { icon: 'users-round', name: 'Prácticas antisindicales y desleales', desc: 'En procesos de negociación colectiva.' },
          { icon: 'piggy-bank', name: 'Seguridad social', desc: 'Materias laborales de seguridad social.' },
          { icon: 'clipboard-list', name: 'Procedimiento', desc: 'Oral y concentrado, con principio pro operario e inversión de la carga de la prueba.' },
        ],
      },
      {
        id: 'ti-cobranza', icon: 'coins', kicker: 'Alto volumen', short: 'Cobranza', title: 'Juzgados de Cobranza Laboral y Previsional', color: P.cuarta,
        summary: 'Existen solo en jurisdicciones de alto volumen; en el resto lo asume el Juzgado del Trabajo o el Civil.',
        materias: [
          { icon: 'file-signature', name: 'Ejecución de títulos laborales', desc: 'Sentencias y otros títulos ejecutivos laborales.' },
          { icon: 'piggy-bank', name: 'Cobranza previsional', desc: 'Cotizaciones adeudadas (Administradoras de Fondos de Pensiones, salud).' },
          { icon: 'refresh-cw', name: 'Trámite ejecutivo', desc: 'Liquidación, notificación y requerimiento de pago.' },
          { icon: 'circle-dollar-sign', name: 'Oposición', desc: 'Pago, novación, remisión, prescripción.' },
        ],
      },
    ],
    flow: [
      { n: '1', q: 'Dónde ingresa la causa', color: P.civil, items: ['Civil', 'Penal', 'Familia', 'Laboral', 'Cobranza'] },
      { n: '2', q: 'Tribunal competente', color: P.salas, desc: 'Se determina por la materia y el territorio; a falta de tribunal especializado, conoce el Juzgado de Letras Civil.' },
      { n: '3', q: 'Tramitación', color: P.tercera, desc: 'Procedimiento propio de cada materia (civil escrito; penal, familia y laboral orales).' },
      { n: '4', q: 'Sentencia', color: P.penal, desc: 'El tribunal de primera instancia resuelve el asunto.' },
      { n: '5', q: 'Recurso', color: P.cuarta, desc: 'Apelación ante la Corte de Apelaciones (o nulidad, en materia penal, contra la sentencia del Tribunal de Juicio Oral en lo Penal).' },
    ],
  },

  esp_pj: {
    title: 'Especiales dentro del Poder Judicial',
    root: { desc: 'Tribunales especiales que forman parte del Poder Judicial (art. 5 inc. 3 del Código Orgánico de Tribunales). Los de familia, trabajo y cobranza ya aparecen en Primera Instancia; aquí se añaden los tribunales militares en tiempo de paz.' },
    pleno: {
      icon: 'shield', color: P.salas,
      subtitle: 'Integran el Poder Judicial',
      subs: ['Familia (Ley 19.968)', 'Letras del Trabajo', 'Cobranza Laboral y Previsional', 'Militares en tiempo de paz'],
    },
    salasHeader: { icon: 'layers', color: P.salas, subtitle: 'Tribunales', desc: 'Selecciona un tribunal para ver su competencia.' },
    salas: [
      {
        id: 'esp-mil-paz', icon: 'shield', kicker: 'Código de Justicia Militar', short: 'Militares (paz)', title: 'Tribunales Militares en tiempo de paz', color: P.penal,
        summary: 'Integran el Poder Judicial. Conocen delitos militares en tiempo de paz. Sujetos a la superintendencia de la Corte Suprema.',
        materias: [
          { icon: 'gavel', name: 'Cortes Marciales', groups: [
            { label: 'Segunda instancia militar', subs: ['Corte Marcial del Ejército, Fuerza Aérea y Carabineros', 'Corte Marcial de la Armada'] },
          ] },
          { icon: 'scale', name: 'Juzgados Militares', desc: 'Primera instancia; incluye el Juzgado de Aviación.' },
          { icon: 'file-text', name: 'Competencia', desc: 'Delitos militares tipificados en el Código de Justicia Militar, cometidos en tiempo de paz.' },
        ],
      },
      {
        id: 'esp-fam', icon: 'users', kicker: 'Ya en Primera Instancia', short: 'Familia', title: 'Juzgados de Familia', color: P.pleno,
        summary: 'Tribunal especial integrante del Poder Judicial (Ley 19.968). Detalle completo en la pestaña Primera Instancia.',
        materias: [{ icon: 'info', name: 'Ver Primera Instancia', desc: 'Filiación, alimentos, violencia intrafamiliar, medidas de protección, adopción.' }],
      },
      {
        id: 'esp-trab', icon: 'briefcase', kicker: 'Ya en Primera Instancia', short: 'Trabajo', title: 'Juzgados de Letras del Trabajo', color: P.penal,
        summary: 'Tribunal especial integrante del Poder Judicial (Código del Trabajo). Detalle completo en la pestaña Primera Instancia.',
        materias: [{ icon: 'info', name: 'Ver Primera Instancia', desc: 'Conflictos individuales, tutela de derechos fundamentales, seguridad social.' }],
      },
      {
        id: 'esp-cob', icon: 'coins', kicker: 'Ya en Primera Instancia', short: 'Cobranza', title: 'Juzgados de Cobranza Laboral y Previsional', color: P.cuarta,
        summary: 'Tribunal especial integrante del Poder Judicial (Código del Trabajo). Detalle completo en la pestaña Primera Instancia.',
        materias: [{ icon: 'info', name: 'Ver Primera Instancia', desc: 'Ejecución de títulos laborales y cobranza previsional.' }],
      },
    ],
    flow: null,
  },

  esp_nopj: {
    title: 'Especiales fuera del Poder Judicial',
    root: { desc: 'Tribunales especiales que NO integran el Poder Judicial: se rigen por sus propias leyes, pero quedan sujetos a la superintendencia directiva, correccional y económica de la Corte Suprema (art. 5 inc. final del Código Orgánico de Tribunales).' },
    pleno: {
      icon: 'map-pin', color: P.tercera,
      subtitle: 'Fuera del Poder Judicial, bajo la Corte Suprema',
      subs: ['Policía Local', 'Tributarios y Aduaneros', 'Ambientales', 'Libre Competencia', 'Contratación Pública', 'Propiedad Industrial'],
    },
    salasHeader: { icon: 'layers', color: P.tercera, subtitle: 'Seis jurisdicciones', desc: 'Selecciona un tribunal para ver su competencia y ley.' },
    salas: [
      {
        id: 'nopj-jpl', icon: 'car', kicker: 'Alto volumen · Ley 15.231 / 18.287', short: 'Policía Local', title: 'Juzgados de Policía Local', color: P.civil,
        summary: 'Los más cotidianos para el ejercicio general. Dependencia mixta: juez propuesto en terna por la Corte de Apelaciones, designado por la municipalidad.',
        materias: [
          { icon: 'car', name: 'Tránsito', desc: 'Infracciones a la Ley del Tránsito (Ley 18.290).' },
          { icon: 'shield-check', name: 'Protección al consumidor', desc: 'Ley 19.496 (Servicio Nacional del Consumidor).' },
          { icon: 'building-2', name: 'Ordenanzas municipales', desc: 'Y demás materias locales entregadas por ley.' },
          { icon: 'refresh-cw', name: 'Impugnación', groups: [
            { label: 'Recursos', subs: ['Apelación ante la Corte de Apelaciones', 'Queja ante la Corte Suprema (eventual)'] },
          ] },
          { icon: 'clock', name: 'Reforma pendiente', desc: 'Proyecto de "Justicia Vecinal" (Unidades de Justicia Vecinal) en trámite legislativo.' },
        ],
      },
      {
        id: 'nopj-tta', icon: 'receipt', kicker: 'Ley 20.322', short: 'Tributarios', title: 'Tribunales Tributarios y Aduaneros', color: P.tercera,
        summary: 'Resuelven controversias entre contribuyentes y el Servicio de Impuestos Internos o el Servicio Nacional de Aduanas.',
        materias: [
          { icon: 'receipt', name: 'Reclamaciones tributarias', desc: 'Contra liquidaciones, giros y resoluciones del Servicio de Impuestos Internos.' },
          { icon: 'package', name: 'Materia aduanera', desc: 'Reclamos contra actos del Servicio Nacional de Aduanas.' },
          { icon: 'refresh-cw', name: 'Impugnación', desc: 'Apelación ante la Corte de Apelaciones; casación ante la Corte Suprema.' },
        ],
      },
      {
        id: 'nopj-amb', icon: 'leaf', kicker: 'Ley 20.600 · 3 tribunales', short: 'Ambientales', title: 'Tribunales Ambientales', color: P.civil,
        summary: 'Tres tribunales: Antofagasta, Santiago y Valdivia. Controlan la legalidad de actos ambientales.',
        materias: [
          { icon: 'leaf', name: 'Reclamaciones ambientales', desc: 'Contra resoluciones de la Superintendencia del Medio Ambiente y del Servicio de Evaluación Ambiental.' },
          { icon: 'triangle-alert', name: 'Reparación por daño ambiental', desc: 'Demandas de reparación.' },
          { icon: 'file-text', name: 'Consultas y autorizaciones', desc: 'Medidas provisionales y sanciones de la Superintendencia del Medio Ambiente.' },
        ],
      },
      {
        id: 'nopj-tdlc', icon: 'scale', kicker: 'Decreto Ley 211', short: 'Libre Competencia', title: 'Tribunal de Defensa de la Libre Competencia', color: P.salas,
        summary: 'Antes Comisión Resolutiva. Previene, corrige y sanciona atentados a la libre competencia.',
        materias: [
          { icon: 'gavel', name: 'Conductas anticompetitivas', desc: 'Colusión, abuso de posición dominante, competencia desleal.' },
          { icon: 'git-merge', name: 'Operaciones de concentración', desc: 'Revisión de fusiones y adquisiciones.' },
          { icon: 'refresh-cw', name: 'Impugnación', desc: 'Reclamación ante la Corte Suprema.' },
        ],
      },
      {
        id: 'nopj-contrat', icon: 'file-signature', kicker: 'Ley 19.886', short: 'Contratación Pública', title: 'Tribunal de Contratación Pública', color: P.cuarta,
        summary: 'Conoce la impugnación de actos ilegales o arbitrarios en licitaciones y contratación del Estado.',
        materias: [
          { icon: 'file-signature', name: 'Acción de impugnación', desc: 'Contra actos u omisiones ilegales o arbitrarios en procedimientos de contratación administrativa.' },
          { icon: 'refresh-cw', name: 'Impugnación', desc: 'Reclamo de ilegalidad ante la Corte de Apelaciones de Santiago.' },
        ],
      },
      {
        id: 'nopj-propind', icon: 'lightbulb', kicker: 'Ley 19.039', short: 'Propiedad Industrial', title: 'Tribunal de Propiedad Industrial', color: P.penal,
        summary: 'Revisa las resoluciones del Instituto Nacional de Propiedad Industrial en materia de propiedad industrial.',
        materias: [
          { icon: 'lightbulb', name: 'Marcas y patentes', desc: 'Apelaciones contra resoluciones del Instituto Nacional de Propiedad Industrial.' },
          { icon: 'refresh-cw', name: 'Impugnación', desc: 'Casación ante la Corte Suprema.' },
        ],
      },
    ],
    flow: null,
  },

  fuera: {
    title: 'Fuera de superintendencia',
    root: { desc: 'Tribunales expresamente excluidos incluso de la superintendencia de la Corte Suprema (art. 5 del Código Orgánico de Tribunales). Ejercen jurisdicción en ámbitos constitucional, electoral o militar de guerra.' },
    pleno: {
      icon: 'flag', color: P.pleno,
      subtitle: 'Excluidos de la superintendencia Corte Suprema',
      subs: ['Tribunal Constitucional', 'Tribunal Calificador de Elecciones', 'Tribunales Electorales Regionales', 'Militares en tiempo de guerra'],
    },
    salasHeader: { icon: 'layers', color: P.pleno, subtitle: 'Cuatro jurisdicciones', desc: 'Selecciona para ver su ámbito.' },
    salas: [
      {
        id: 'fuera-tc', icon: 'landmark', kicker: 'Autónomo', short: 'Constitucional', title: 'Tribunal Constitucional', color: P.pleno,
        summary: 'Órgano autónomo. Control de constitucionalidad de las leyes.',
        materias: [
          { icon: 'file-text', name: 'Control de constitucionalidad', desc: 'Preventivo (leyes) y represivo (inaplicabilidad por inconstitucionalidad).' },
          { icon: 'gavel', name: 'Requerimientos', desc: 'Conflictos de constitucionalidad entre órganos del Estado.' },
        ],
      },
      {
        id: 'fuera-tricel', icon: 'vote', kicker: 'Justicia electoral', short: 'Calificador de Elecciones', title: 'Tribunal Calificador de Elecciones', color: P.tercera,
        summary: 'Califica las elecciones y plebiscitos nacionales; resuelve reclamaciones electorales.',
        materias: [
          { icon: 'vote', name: 'Calificación de elecciones', desc: 'Elecciones presidenciales, parlamentarias y plebiscitos.' },
          { icon: 'scale', name: 'Reclamaciones', desc: 'Conoce apelaciones de los Tribunales Electorales Regionales.' },
        ],
      },
      {
        id: 'fuera-ter', icon: 'map', kicker: 'Justicia electoral', short: 'Electorales Regionales', title: 'Tribunales Electorales Regionales', color: P.tercera,
        summary: 'Conocen reclamaciones electorales de carácter regional y de organizaciones intermedias.',
        materias: [
          { icon: 'users', name: 'Elecciones locales', desc: 'Reclamaciones sobre elecciones de organizaciones gremiales, sindicales y vecinales.' },
          { icon: 'refresh-cw', name: 'Apelación', desc: 'Ante el Tribunal Calificador de Elecciones.' },
        ],
      },
      {
        id: 'fuera-mil-guerra', icon: 'shield-alert', kicker: 'Código de Justicia Militar', short: 'Militares (guerra)', title: 'Tribunales Militares en tiempo de guerra', color: P.penal,
        summary: 'NO forman parte del Poder Judicial y quedan fuera de la superintendencia de la Corte Suprema.',
        materias: [
          { icon: 'shield-alert', name: 'Competencia', desc: 'Delitos militares cometidos en estado o tiempo de guerra, según el Código de Justicia Militar.' },
        ],
      },
    ],
    flow: null,
  },

  arbitrales: {
    title: 'Arbitrales',
    root: { desc: 'Jueces privados designados por las partes o por la justicia para resolver un asunto determinado. No integran la jerarquía ordinaria ni especial del Poder Judicial.' },
    pleno: {
      icon: 'handshake', color: P.cuarta,
      subtitle: 'Tres clases de árbitro',
      subs: ['Árbitros de derecho', 'Árbitros arbitradores', 'Árbitros mixtos'],
    },
    salasHeader: { icon: 'layers', color: P.cuarta, subtitle: 'Clases de árbitro', desc: 'Selecciona una clase.' },
    salas: [
      {
        id: 'arb-derecho', icon: 'scale', kicker: 'Fallan conforme a derecho', short: 'De derecho', title: 'Árbitros de derecho', color: P.salas,
        summary: 'Tramitan y fallan como un tribunal ordinario, con sujeción estricta a la ley.',
        materias: [
          { icon: 'file-text', name: 'Procedimiento', desc: 'Aplican las reglas del procedimiento que correspondería a un tribunal ordinario.' },
          { icon: 'gavel', name: 'Fallo', desc: 'Resuelven conforme a la ley, como lo haría un juez de letras.' },
        ],
      },
      {
        id: 'arb-arbitrador', icon: 'feather', kicker: 'Equidad · prudencia', short: 'Arbitradores', title: 'Árbitros arbitradores (amigables componedores)', color: P.civil,
        summary: 'Fallan conforme a la prudencia y la equidad; procedimiento definido por las partes.',
        materias: [
          { icon: 'feather', name: 'Procedimiento', desc: 'El que las partes acuerden; a falta de acuerdo, reglas mínimas legales.' },
          { icon: 'heart', name: 'Fallo', desc: 'Según lo que la prudencia y la equidad le dicten.' },
        ],
      },
      {
        id: 'arb-mixto', icon: 'git-merge', kicker: 'Híbrido', short: 'Mixtos', title: 'Árbitros mixtos', color: P.tercera,
        summary: 'Tramitan como arbitradores (procedimiento flexible) pero fallan conforme a derecho.',
        materias: [
          { icon: 'git-merge', name: 'Naturaleza', desc: 'Combinan procedimiento de arbitrador con fallo de derecho.' },
        ],
      },
    ],
    flow: null,
  },
}

export const META: Record<string, Meta> = {
  cs: {
    flowTitle: '¿Cómo llega una causa a la Corte Suprema?',
    flowSubtitle: 'La ruta que sigue cada asunto, paso a paso.',
    flowKey: 'Materia → Procedimiento → Recurso → Sala → Resolución',
    flowKeyDesc: 'Esa es la lógica con la que la Corte Suprema clasifica y resuelve las causas.',
    ficha: {
      plazos: [
        { r: 'Casación (forma y fondo)', t: '15 días hábiles desde la notificación de la sentencia de segunda instancia' },
        { r: 'Recurso de queja', t: '5 días hábiles desde la resolución que motiva el recurso' },
        { r: 'Nulidad (penal)', t: '10 días desde la notificación de la sentencia' },
      ],
      quorum: 'Salas: 5 ministros. Pleno: mayoría de los ministros en ejercicio (mínimo legal según la materia).',
      recibe: 'Casación y nulidad contra sentencias de las Cortes de Apelaciones; queja; revisión.',
      deriva: 'Es la última instancia: sus fallos no son revisables por otro tribunal nacional.',
      base: 'Arts. 93-107 del Código Orgánico de Tribunales; Constitución Política art. 82 (superintendencia).',
    },
  },
  ca: {
    flowTitle: '¿Cómo se recurre ante una Corte de Apelaciones?',
    flowSubtitle: 'El camino de un recurso desde la primera instancia.',
    flowKey: 'Primera instancia → Recurso → Corte de Apelaciones → Resolución → (Casación Corte Suprema)',
    flowKeyDesc: 'La Corte de Apelaciones revisa lo resuelto por los tribunales de su territorio.',
    ficha: {
      plazos: [
        { r: 'Apelación (sentencia definitiva)', t: '10 días desde la notificación' },
        { r: 'Apelación (otras resoluciones)', t: '5 días desde la notificación' },
        { r: 'Protección', t: '30 días corridos desde el acto u omisión' },
        { r: 'Amparo', t: 'Sin plazo mientras subsista la privación de libertad' },
      ],
      quorum: 'Funcionan en salas de mínimo 3 ministros; el pleno según la materia.',
      recibe: 'Apelación y casación en la forma desde juzgados de letras, familia, trabajo y garantía; acciones constitucionales.',
      deriva: 'Sus sentencias de segunda instancia son recurribles por casación ante la Corte Suprema.',
      territorial: '17 cortes por región; conoce según el territorio del tribunal inferior.',
      base: 'Arts. 54-92 del Código Orgánico de Tribunales; Constitución Política arts. 20-21 (protección y amparo).',
    },
  },
  ti: {
    flowTitle: '¿Dónde ingresa una causa en primera instancia?',
    flowSubtitle: 'El tribunal competente según materia y territorio.',
    flowKey: 'Materia → Tribunal competente → Tramitación → Sentencia → Recurso',
    flowKeyDesc: 'A falta de tribunal especializado, conoce el Juzgado de Letras con competencia común.',
    ficha: {
      plazos: [
        { r: 'Apelación', t: '5 o 10 días según la resolución' },
        { r: 'Nulidad (penal, contra sentencia del Tribunal de Juicio Oral en lo Penal)', t: '10 días desde la notificación' },
        { r: 'Recursos laborales/familia', t: 'Según procedimiento oral aplicable' },
      ],
      quorum: 'Tribunales unipersonales (un juez), salvo el Tribunal de Juicio Oral en lo Penal (3 jueces).',
      recibe: 'El asunto en su primera presentación (demanda, querella, requerimiento).',
      deriva: 'Apelación ante la Corte de Apelaciones; en materia penal, nulidad contra la sentencia del Tribunal de Juicio Oral en lo Penal.',
      territorial: 'Competencia por comuna/agrupación de comunas; competencia común donde no hay tribunal especializado.',
      base: 'Arts. 27-40 del Código Orgánico de Tribunales; leyes especiales (19.968, Código del Trabajo, Código Procesal Penal).',
    },
  },
  esp_pj: {
    ficha: {
      quorum: 'Juzgados de familia, trabajo y cobranza: un juez. Cortes Marciales: colegiadas.',
      recibe: 'Materias especiales que la ley les entrega directamente.',
      deriva: 'Recursos ante la Corte de Apelaciones (o Corte Marcial, en lo militar).',
      base: 'Código Orgánico de Tribunales art. 5 inc. 3; Ley 19.968; Código del Trabajo; Código de Justicia Militar.',
    },
  },
  esp_nopj: {
    ficha: {
      quorum: 'Unipersonales, salvo el Tribunal de Defensa de la Libre Competencia y tribunales colegiados por ley.',
      recibe: 'Reclamaciones contra actos de organismos administrativos según cada ley.',
      deriva: 'Apelación ante la Corte de Apelaciones; casación/reclamación ante la Corte Suprema.',
      base: 'Código Orgánico de Tribunales art. 5 inc. final; leyes 15.231, 18.287, 20.322, 20.600, Decreto Ley 211, 19.886, 19.039.',
    },
  },
  fuera: {
    ficha: {
      quorum: 'Órganos colegiados autónomos; integración según su ley orgánica.',
      recibe: 'Asuntos constitucionales, electorales o militares de guerra según su competencia.',
      deriva: 'No están sujetos a la superintendencia de la Corte Suprema (art. 5 del Código Orgánico de Tribunales).',
      base: 'Constitución Política (Tribunal Constitucional, Tribunal Calificador de Elecciones); Código de Justicia Militar (tiempo de guerra).',
    },
  },
  arbitrales: {
    ficha: {
      quorum: 'Árbitro unipersonal, salvo acuerdo de las partes de un tribunal arbitral colegiado.',
      recibe: 'El asunto sometido a arbitraje por las partes o por disposición legal.',
      deriva: 'Recursos según la clase de árbitro; el arbitrador falla sin recurso de apelación salvo pacto.',
      base: 'Arts. 222-243 del Código Orgánico de Tribunales; Código de Procedimiento Civil (juicio arbitral).',
    },
  },
}

export const PRIMARY_TIERS = ['cs', 'ca', 'ti']
export const SECONDARY_TIERS = ['esp_pj', 'esp_nopj', 'fuera', 'arbitrales']
