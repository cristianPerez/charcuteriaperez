const cursos = [
  {
    titulo: 'Fundamentos del Chorizo Artesanal',
    descripcion:
      'Aprende desde cero: selección de carnes, mezclas base, salado y embutido tradicional.',
    nivel: 'Inicial',
  },
  {
    titulo: 'Máster en Chorizos Regionales',
    descripcion:
      'Domina estilos ibéricos, criollos y ahumados con recetas guiadas y técnicas profesionales.',
    nivel: 'Intermedio',
  },
  {
    titulo: 'Chorizos Premium y Maduración',
    descripcion:
      'Controla fermentación, secado y perfiles de sabor para crear chorizos de autor.',
    nivel: 'Avanzado',
  },
]

export default function App() {
  return (
    <main className="landing">
      <section className="hero">
        <p className="badge">Escuela Charcutería Pérez</p>
        <h1>Conviértete en Máster en Chorizos</h1>
        <p>
          La charcutería es el arte de transformar carnes en productos curados, embutidos y elaboraciones
          llenas de sabor, técnica y tradición. En Charcutería Pérez te enseñamos paso a paso para que
          aprendas a crear chorizos artesanales con calidad profesional.
        </p>
        <button>Reservar mi plaza</button>
      </section>

      <section className="cursos">
        <h2>Tipos de cursos que vamos a vender</h2>
        <div className="grid">
          {cursos.map((curso) => (
            <article key={curso.titulo} className="card">
              <span>{curso.nivel}</span>
              <h3>{curso.titulo}</h3>
              <p>{curso.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
