<script setup lang="ts">
// Protege la ruta para usuarios autenticados.
definePageMeta({ middleware: ['auth'] })

// Modelo base que llega desde la API de galaxias.
type Galaxia = {
    id: number
    nombre: string | null
    num_planetas: number | null
    curiosidades: string | null
    tipo: string | null
}

// Datos de sesión y endpoint protegido de admin.
const { user, clear } = useUserSession()
const { data: adminData } = useFetch<{ sensitive?: string }>('/api/admin', { lazy: true })

// Consulta principal para pintar el dashboard.
const { data: galaxias, pending, error, refresh } = useFetch<Galaxia[]>('/galaxia/get', {
    default: () => []
})

// KPIs del panel.
const totalGalaxias = computed(() => galaxias.value?.length ?? 0)
const totalPlanetas = computed(() =>
    (galaxias.value ?? []).reduce((sum, galaxia) => sum + (Number(galaxia.num_planetas) || 0), 0)
)

// Cuenta tipos únicos de galaxia para mostrar diversidad del catálogo.
const tiposRegistrados = computed(() => {
    const tipos = new Set(
        (galaxias.value ?? [])
            .map((galaxia) => galaxia.tipo?.trim())
            .filter((tipo): tipo is string => Boolean(tipo))
    )

    return tipos.size
})

// Muestra solo las últimas 5 entradas (de más reciente a más antigua).
const ultimasGalaxias = computed(() => (galaxias.value ?? []).slice(-5).reverse())
</script>

<template>
    <!-- Contenedor principal de la home de administración -->
    <main class="admin-home">
        <!-- Cabecera con descripción y acciones rápidas -->
        <section class="hero">
            <div>
                <p class="tag">Panel de administración</p>
                <h1>Gestión de galaxias y planetas</h1>
                <p class="subtitle">
                    Controla tu catálogo espacial, añade nuevas galaxias y revisa rápidamente el estado de los datos.
                </p>
            </div>
            <div class="hero-actions">
                <UButton as-child>
                    <NuxtLink to="/galaxia/NewGalaxia">Nueva galaxia</NuxtLink>
                </UButton>
                <UButton color="neutral" variant="subtle" as-child>
                    <NuxtLink to="/listado">Ver listado</NuxtLink>
                </UButton>
                <UButton color="neutral" variant="ghost" @click="clear(); navigateTo('/login')">
                    Cerrar sesión
                </UButton>
            </div>
        </section>

        <!-- Resumen de métricas clave -->
        <section class="stats-grid">
            <UCard>
                <p class="stat-label">Galaxias registradas</p>
                <p class="stat-value">{{ totalGalaxias }}</p>
            </UCard>
            <UCard>
                <p class="stat-label">Planetas estimados</p>
                <p class="stat-value">{{ totalPlanetas }}</p>
            </UCard>
            <UCard>
                <p class="stat-label">Tipos de galaxia</p>
                <p class="stat-value">{{ tiposRegistrados }}</p>
            </UCard>
        </section>

        <!-- Tabla con últimas galaxias y estados de carga -->
        <UCard class="content-card">
            <div class="content-header">
                <h2>Últimas galaxias añadidas</h2>
                <UButton color="neutral" variant="outline" size="sm" @click="refresh()">Actualizar</UButton>
            </div>

            <p v-if="pending" class="status">Cargando datos...</p>
            <p v-else-if="error" class="status error">No se pudieron cargar las galaxias.</p>
            <p v-else-if="!ultimasGalaxias.length" class="status">Aún no hay galaxias registradas.</p>

            <div v-else class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Planetas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="galaxia in ultimasGalaxias" :key="galaxia.id">
                            <td>{{ galaxia.nombre || 'Sin nombre' }}</td>
                            <td>{{ galaxia.tipo || 'Sin tipo' }}</td>
                            <td>{{ galaxia.num_planetas ?? 0 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </UCard>

        <!-- Información de sesión activa -->
        <p class="session-text">
            Usuario activo: <strong>{{ user?.login || user?.name || 'Sesión iniciada' }}</strong>
            <span v-if="adminData?.sensitive"> · {{ adminData.sensitive }}</span>
        </p>
    </main>
</template>

<style scoped>
/* Layout general del dashboard */
.admin-home {
    min-height: calc(100vh - 80px);
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.25rem 3rem;
    display: grid;
    gap: 1.25rem;
}

/* Tarjeta principal (hero) */
.hero {
    background: rgba(20, 25, 60, 0.55);
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 18px;
    padding: 1.25rem;
    display: grid;
    gap: 1rem;
}

.tag {
    color: #a5b9f9;
    font-size: 0.85rem;
    margin-bottom: 0.35rem;
}

h1 {
    color: #e2e8f0;
    margin: 0;
}

.subtitle {
    color: #94a3b8;
    margin-top: 0.5rem;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

/* Grid responsivo de métricas */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.85rem;
}

.stat-label {
    color: #94a3b8;
    margin: 0;
}

.stat-value {
    color: #e2e8f0;
    font-weight: 700;
    font-size: 1.8rem;
    margin: 0.35rem 0 0;
}

/* Bloque de contenido con tabla */
.content-card {
    overflow: hidden;
}

.content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.8rem;
}

h2 {
    margin: 0;
    color: #e2e8f0;
}

.status {
    color: #94a3b8;
    margin: 0.5rem 0;
}

.status.error {
    color: #fca5a5;
}

.table-wrap {
    overflow-x: auto;
}

/* Tabla de últimas galaxias */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 0.7rem 0.4rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    color: #cbd5e1;
}

th {
    color: #a5b9f9;
    font-weight: 600;
}

.session-text {
    color: #94a3b8;
    font-size: 0.92rem;
    margin: 0;
}
</style>