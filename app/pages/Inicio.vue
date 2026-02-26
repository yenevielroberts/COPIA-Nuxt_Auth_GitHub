<template>
  <main class="home">

    <section class="explore">
      <h2>Destacados</h2>
      <div class="grid">
        <article class="card">
          <h3>Planetas</h3>
          <p>Descubre mundos rocosos y gaseosos, desde enanos hasta gigantes.</p>
        </article>

        <article class="card">
          <h3>Galaxias</h3>
          <p>Observa estructuras colosales y sus diferentes formas y tamaños.</p>
        </article>

        <article class="card">
          <h3>Estrellas</h3>
          <p>Conoce el ciclo de vida estelar y los distintos tipos de estrellas.</p>
        </article>
      </div>
    </section>

    <section class="info">
      <h2>Acerca del sitio</h2>
      <p>Información y recursos para aprender sobre objetos astronómicos.</p>
      <ul>
        <li>Fichas de planetas</li>
        <li>Catálogo de galaxias</li>
        <li>Guías y recursos</li>
      </ul>
    </section>

    <footer class="site-footer">
      <small>© 2026 Planetas y Galaxias</small>
    </footer>
  </main>
</template>

<style scoped>
:root {
  /* Ajuste de colores para mejor contraste */
  --bg: #061226;          /* fondo oscuro */
  --card: #0f1f2b;        /* tarjetas ligeramente más claras */
  --muted: #b7c7d6;       /* texto secundario visible */
  --accent: #67e8f9;      /* acento brillante */
  --paper: #eef6fb;       /* texto principal claro y legible */
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 1.25rem;
  background: linear-gradient(180deg, var(--bg), #051226 80%);
  color: var(--paper);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.site-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0.5rem 1rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.site-header h1 {
  margin: 0;
  font-size: 2.25rem;
  letter-spacing: 0.6px;
  color: var(--paper);
  font-weight: 600;
}

.tagline {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.98rem;
}

.explore {
  max-width: 1100px;
  margin: 0 auto;
}

.explore h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background: var(--card);
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.04);
}

.card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  color: var(--paper);
}

.card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.45;
}

.info {
  max-width: 900px;
  margin: 0 auto;
  background: transparent;
  padding: 1rem;
  color: var(--muted);
}

.info h2 {
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.info ul {
  margin: 0.5rem 0 0 1.25rem;
  color: var(--muted);
}

.site-footer {
  text-align: center;
  margin-top: auto;
  color: var(--muted);
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.03);
}

@media (min-width: 900px) {
  .site-header h1 { font-size: 2.75rem; }
  .card { padding: 1.5rem; }
}
</style>
