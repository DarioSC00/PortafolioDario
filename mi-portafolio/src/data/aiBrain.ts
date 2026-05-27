/**
 * aiBrain.ts
 * Core engine for Dario's AI Copilot.
 * Contains the local expert simulator (for instant, free, reliable responses)
 * and the live Gemini API integration.
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isSimulated?: boolean;
}

// Local knowledge base for the simulated engine
const LOCAL_KNOWLEDGE = [
  {
    keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'hi', 'hello'],
    response: `¡Hola! 👋 Soy el **Copiloto de IA de Rubén Darío**. Estoy aquí para ayudarte a conocer su perfil, habilidades, experiencia y proyectos.

¿Qué te gustaría saber hoy? Puedes escribirme una pregunta o presionar cualquiera de los botones de sugerencia abajo. 😊`
  },
  {
    keywords: ['experiencia', 'trabajo', 'laboral', 'epam', 'lynxus', 'empresa', 'junior', 'puesto'],
    response: `💼 **Experiencia Profesional de Rubén Darío:**

Darío se desempeñó como **Junior Software Developer (Intern – Data)** en **Lynxus Solutions S.A.S. (EPAM)** desde **Octubre de 2025 hasta Abril de 2026**.

Durante su estancia en la compañía logró:
- **Desarrollo Backend:** Creación, implementación y consumo de APIs REST robustas utilizando Node.js, FastAPI, TypeScript, Python, HTML5 y Docker.
- **Gestión de Datos:** Modelado, administración y optimización avanzada de bases de datos relacionales (SQL, MySQL) y NoSQL (MongoDB).
- **Desarrollo Frontend:** Creación de interfaces web modernas y fluidas con React y Next.js usando React Hooks avanzados.
- **Metodologías Ágiles:** Trabajo activo bajo el marco de trabajo Scrum en equipos multidisciplinarios, utilizando Git, GitHub y GitLab para el control de versiones.`
  },
  {
    keywords: ['sena', 'estudios', 'educacion', 'formacion', 'titulo', 'tecnologo', 'tecnologia', 'estudio'],
    response: `🎓 **Educación y Formación Académica:**

Rubén Darío cuenta con el título de **Tecnólogo en Análisis y Desarrollo de Software** del **SENA (Servicio Nacional de Aprendizaje)**, cursado en el periodo **2023 - 2026**.

Durante su formación técnica se especializó en:
- **Ciclo de vida completo del software:** Planificación, análisis, diseño, codificación, pruebas e implantación.
- **Ingeniería de software:** Modelado de requisitos, patrones de diseño y buenas prácticas.
- **Bases de datos:** Diseño relacional, normalización, optimización de consultas en PostgreSQL/MySQL y almacenamiento NoSQL.
- **Pruebas y Calidad:** Ejecución de pruebas unitarias y aseguramiento de la calidad de software.`
  },
  {
    keywords: ['repuestos salazar', 'repuestos', 'salazar', 'inventario', 'automotrices'],
    response: `🚗 **Proyecto Destacado: Repuestos Salazar**

Es una plataforma integral (versión web administrativa y componentes móviles) para optimizar la gestión de inventario y comercialización de repuestos automotrices.

- **Frontend:** React, React Router, Vite, Tailwind CSS y módulos móviles híbridos con **Flutter/Dart**.
- **Backend:** Node.js, Express, MongoDB con modelado Mongoose, PostgreSQL.
- **Funcionalidades:** CRUD completo de productos, proveedores y clientes; control de movimientos de stock en tiempo real; interfaces administrativas fluidas.
- **Código:** Puedes ver el repositorio en [GitHub](https://github.com/DarioSC00/RepuestosSalazar.git).`
  },
  {
    keywords: ['teosoft', 'teo soft', 'gestion administrativa'],
    response: `💻 **Proyecto Destacado: TeoSoft**

Un sistema de información web de gestión administrativa centralizada para manejar procesos comerciales internos.

- **Stack:** React, TypeScript, JavaScript, Vite, CSS Modules en el frontend; Node.js, Express, MongoDB y Mongoose en el backend.
- **Funcionalidades:** Operaciones CRUD para proveedores, clientes y productos; formularios modales interactivos; sidebar administrativo responsive; búsquedas dinámicas avanzadas.
- **Código:** Mira el código en [GitHub](https://github.com/Andreacetre/Proyecto-TeoSoft.git).`
  },
  {
    keywords: ['proyecto c', 'api empresarial', 'backend robusto', 'restful empresarial', 'jwt', 'rbac'],
    response: `🔒 **Proyecto Destacado: API RESTful Empresarial**

Un backend de grado de producción seguro y escalable para la gestión empresarial estructurado bajo el patrón de diseño MVC.

- **Stack:** Node.js, Express, MongoDB, Mongoose, Swagger para documentación interactiva.
- **Funcionalidades:** 
  - Autenticación segura basada en **JSON Web Tokens (JWT)** con políticas de refresco.
  - Control de accesos basado en roles (**RBAC**).
  - Documentación interactiva autogenerada con Swagger/OpenAPI.
  - Manejo centralizado de excepciones y registro de logs de auditoría.
- **Repositorio:** Disponible en [GitHub](https://github.com/DarioSC00/express-enterprise-api)
- **Demo Documentación:** [API en Render](https://basededatosrepuestossalazar-1.onrender.com)`
  },
  {
    keywords: ['tablero de trabajo', 'tablerodetrabajo', 'trello', 'kanban', 'tareas'],
    response: `📋 **Proyecto: Tablero de Trabajo (Estilo Kanban)**

Un gestor de tareas visual e interactivo inspirado en Trello, ideal para la productividad y organización de equipos.

- **Stack:** HTML5, CSS3, JavaScript puro (Vanilla JS), Drag and Drop API nativa.
- **Funcionalidades:** Creación, edición y eliminación de tareas; organización en columnas de estado; persistencia de datos local; movimiento de tareas fluido por arrastre (Drag & Drop).
- **Código:** Puedes ver el repositorio en [GitHub](https://github.com/DarioSC00/PruebaTecnicaLynxus.git).`
  },
  {
    keywords: ['reto angular', 'retoangular', 'angular', 'github search'],
    response: `🅰️ **Proyecto: Reto Angular (Buscador GitHub)**

Una aplicación web interactiva que consume la API pública de GitHub para buscar perfiles y repositorios en tiempo real.

- **Stack:** Angular, TypeScript, HTML5, CSS3, RxJS, HttpClient.
- **Funcionalidades:** Búsqueda dinámica con debounce; renderizado de información detallada (seguidores, repositorios, lenguajes); paginación de resultados; manejo reactivo de estados.`
  },
  {
    keywords: ['proyectos', 'portafolio', 'creado', 'desarrollado', 'hecho', 'aplicaciones', 'trabajos'],
    response: `🚀 **Proyectos de Rubén Darío:**

Darío cuenta con varios proyectos listos para producción. Aquí los principales:

1. **Repuestos Salazar:** Sistema Full-Stack y Móvil (Flutter/React/Node/MongoDB) para inventario automotriz. [GitHub](https://github.com/DarioSC00/RepuestosSalazar.git)
2. **API RESTful Empresarial:** Backend ultra seguro (Node/Express/MongoDB/JWT/RBAC) con documentación Swagger. [Demo en Render](https://basededatosrepuestossalazar-1.onrender.com)
3. **Proyecto TeoSoft:** Panel administrativo completo (React/TypeScript/Node/MongoDB) con formularios modales y CRUD. [GitHub](https://github.com/Andreacetre/Proyecto-TeoSoft.git)
4. **Tablero de Trabajo:** Kanban interactivo implementado con Drag and Drop en Vanilla JS. [GitHub](https://github.com/DarioSC00/PruebaTecnicaLynxus.git)
5. **Reto Angular:** Buscador dinámico de perfiles y repositorios de GitHub con Angular. [GitHub](https://github.com/DarioSC00/RetoVideoTutorial.git)`
  },
  {
    keywords: ['ingles', 'english', 'b1', 'idioma', 'habla'],
    response: `🔤 **Nivel de Inglés:**

Rubén Darío posee un nivel de inglés **B1 (Intermediate)**.
- Puede leer, entender y redactar documentación técnica compleja sin dificultad.
- Está capacitado para escribir código limpio, documentar APIs y colaborar en equipos ágiles con comunicación en inglés.`
  },
  {
    keywords: ['habilidades', 'habilidad', 'stack', 'lenguajes', 'tecnologias', 'frameworks', 'bases de datos', 'docker', 'react', 'fastapi', 'node', 'flutter'],
    response: `🛠️ **Stack Técnico de Rubén Darío:**

- **Lenguajes:** TypeScript, JavaScript, Python, Dart, Java, C#, PHP.
- **Frameworks & Librerías:** React (Hooks avanzados), Next.js, Node.js, FastAPI, Flutter (Mobile), Laravel, .NET, Angular.
- **Bases de Datos:** SQL (MySQL, PostgreSQL), NoSQL (MongoDB), modelado relacional y optimización.
- **Herramientas & DevOps:** Docker (Contenedores), Git/GitHub/GitLab, Vercel, Render, Postman, metodologías ágiles (Scrum).`
  },
  {
    keywords: ['contacto', 'email', 'telefono', 'celular', 'llamar', 'correo', 'escribir', 'linkedin', 'github', 'redes', 'red social'],
    response: `📞 **Información de Contacto de Rubén Darío:**

¡Darío está listo para incorporarse a tu equipo de inmediato!

- ✉️ **Email:** [rubendario50cent@gmail.com](mailto:rubendario50cent@gmail.com)
- 📱 **Teléfono / WhatsApp:** [+57 312 891 4563](https://wa.me/573128914563)
- 📍 **Ubicación:** Medellín, Colombia (Disponible para trabajo 100% remoto o híbrido en Medellín)
- 💼 **LinkedIn:** [rubén-dario-salazar-cuero-39867125a](https://linkedin.com/in/rub%C3%A9n-dario-salazar-cuero-39867125a/)
- 💻 **GitHub:** [DarioSC00](https://github.com/DarioSC00)`
  },
  {
    keywords: ['disponibilidad', 'contratar', 'remoto', 'cuando', 'inmediato', 'tiempo', 'medellin'],
    response: `⚡ **Disponibilidad y Modalidad de Trabajo:**

- **Disponibilidad:** **Inmediata**. Ya completó su periodo de práctica y está listo para asumir nuevos desafíos de tiempo completo.
- **Modalidad:** **100% Remoto** (disponible para zonas horarias de América y Europa) o **Híbrido/Presencial** en Medellín, Colombia.
- **Rol Ideal:** Junior Full-Stack Developer, Backend Developer (Node/Python), Frontend Developer (React/TS) o Mobile Developer (Flutter).`
  },
  {
    keywords: ['fortalezas', 'por que contratarlo', 'beneficios', 'contrato', 'blandas', 'valores', 'enfoque'],
    response: `⭐ **¿Por qué contratar a Rubén Darío?**

1. **Versatilidad Full-Stack:** Capacidad comprobada para desarrollar tanto el backend (APIs REST con Node/FastAPI) como el frontend (React, Next.js) y aplicaciones móviles (Flutter/Dart).
2. **Mentalidad de Producto:** Su experiencia en Lynxus (EPAM) le enseñó a crear software pensando en la escalabilidad, la experiencia del usuario y el valor del negocio, no solo a picar código.
3. **Capacidad de Aprendizaje:** Domina múltiples stacks y es altamente adaptable; adopta nuevas tecnologías de forma autodidacta y ágil.
4. **Buenas Prácticas:** Se enfoca en la calidad de código, contenedores Docker para consistencia de entornos, control de versiones limpio y documentación detallada.
5. **Colaborador Confiable:** Experiencia trabajando con metodologías ágiles (Scrum), comunicación asertiva y excelente actitud hacia el trabajo en equipo.`
  }
];

/**
 * Searches the local knowledge base using keyword matching.
 */
export function getSimulatedResponse(query: string): string {
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Find matching knowledge base entry
  for (const entry of LOCAL_KNOWLEDGE) {
    const hasMatch = entry.keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedQuery.includes(normalizedKeyword);
    });
    
    if (hasMatch) {
      return entry.response;
    }
  }
  
  // Default fallback if no keywords matched
  return `Entiendo tu pregunta. 👍 Como asistente de Darío, puedo decirte que él es experto en **React, Node.js, FastAPI y Flutter**. 

Para darte una respuesta exacta, por favor intenta preguntar algo relacionado con:
- Su **experiencia laboral** (en EPAM/Lynxus)
- Sus **estudios** (Tecnólogo del SENA)
- Sus **proyectos** (*Repuestos Salazar*, *API RESTful*, *TeoSoft*)
- Su **contacto**, **inglés** o **disponibilidad** de contratación.

*O simplemente haz clic en uno de los botones de sugerencia abajo para guiarte.*`;
}

/**
 * Communicates with the live Gemini API using fetch.
 * Primes the model as Dario's virtual assistant.
 */
export async function getGeminiResponse(
  apiKey: string,
  query: string,
  history: Array<{ sender: 'user' | 'assistant'; text: string }>
): Promise<string> {
  const systemInstruction = `Eres el Asistente Virtual e Inteligente de Rubén Darío Salazar. Tu objetivo es representar a Rubén Darío y vender sus servicios a reclutadores, líderes técnicos o clientes que visiten su portafolio.
Responde de manera muy profesional, entusiasta y concisa, utilizando markdown (negritas, listas, enlaces) para estructurar tus respuestas de forma visualmente atractiva.

Información oficial de Rubén Darío Salazar:
- Rol: Desarrollador Full-Stack Junior (Web y Móvil).
- Ubicación: Medellín, Colombia (Disponible remoto 100% o presencial/híbrido en Medellín).
- Contacto: Teléfono/WhatsApp +57 312 891 4563. Email: rubendario50cent@gmail.com. GitHub: DarioSC00. LinkedIn: rubén-dario-salazar-cuero-39867125a
- Habilidades clave: React (Hooks), Next.js, Node.js, FastAPI, Python, Flutter & Dart (Móvil), SQL (MySQL/PostgreSQL), NoSQL (MongoDB), Docker, Git/Scrum.
- Educación: Tecnólogo en Análisis y Desarrollo de Software en el SENA (2023 - 2026).
- Experiencia: Junior Software Developer Intern en Lynxus Solutions (EPAM) de Oct 2025 a Abr 2026, haciendo APIs REST, Docker, SQL/NoSQL, React y Scrum.
- Idioma: Inglés B1 (Lectura técnica fluida, documentación, redacción).
- Disponibilidad: Inmediata para contratación o proyectos freelance.

Proyectos Principales:
1. "Repuestos Salazar" (Flutter/React/Node/MongoDB): Gestión de inventario automotriz web y móvil. Repo: https://github.com/DarioSC00/RepuestosSalazar.git
2. "API RESTful Empresarial" (Node/Express/MongoDB/Swagger/JWT/RBAC): Backend robusto y seguro de grado corporativo. Repo: https://github.com/DarioSC00/express-enterprise-api | Demo Docs: https://basededatosrepuestossalazar-1.onrender.com
3. "Proyecto TeoSoft" (React/TS/Node/MongoDB): ERP/Administración con CRUD modales y tablas interactivas. Repo: https://github.com/Andreacetre/Proyecto-TeoSoft.git
4. "Tablero de Trabajo" (Vanilla JS/Drag & Drop): Kanban inspirado en Trello. Repo: https://github.com/DarioSC00/PruebaTecnicaLynxus.git
5. "Reto Angular" (Angular/GitHub API): Buscador dinámico de perfiles. Repo: https://github.com/DarioSC00/RetoVideoTutorial.git

Reglas de comportamiento:
- Habla siempre en tercera persona sobre Rubén Darío (ej: "Darío diseñó...", "Él domina...").
- Mantén tus respuestas claras y con formato amigable.
- Si te preguntan algo ofensivo, fuera de lugar o no relacionado con el perfil profesional de Darío, redirige amablemente la conversación a su trabajo.
- NO inventes proyectos, datos de contacto o experiencia que no estén listados aquí.`;

  try {
    // Format conversation history for Gemini API
    const contents = [];
    
    // Add past messages
    for (const msg of history) {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }
    
    // Add current query
    contents.push({
      role: 'user',
      parts: [{ text: query }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData?.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const assistantText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!assistantText) {
      throw new Error('Formato de respuesta de Gemini inválido');
    }

    return assistantText;
  } catch (error: any) {
    console.error('Error contacting Gemini API:', error);
    return `⚠️ **Error al conectar con la API de Gemini:** ${error.message || error}

*No te preocupes, el simulador local sigue activo.* Te responderé de forma simulada:

${getSimulatedResponse(query)}`;
  }
}
