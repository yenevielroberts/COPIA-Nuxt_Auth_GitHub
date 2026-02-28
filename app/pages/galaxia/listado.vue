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
const { user } = useUserSession()

// Consulta principal para pintar el dashboard.
const { data: galaxias, pending, error, refresh } = useFetch('/api/galaxia/get', {
    default: () => []
})

// KPIs del panel.
const totalGalaxias = computed(() => galaxias.value?.length ?? 0)


// Muestra solo las últimas 5 entradas (de más reciente a más antigua).
const ultimasGalaxias = computed(() => (galaxias.value ?? []))
</script>

<template>
    <!-- Contenedor principal de la home de administración -->
    <main class="admin-home">
        <!-- Cabecera con descripción y acciones rápidas -->
        <section class="hero">
            <div class="hero-actions">
                <h1>Tus galaxias</h1>
                <UButton as-child>
                    <NuxtLink to="/galaxia/NewGalaxia">Nueva galaxia</NuxtLink>
                </UButton>
            </div>
        </section>
        <!-- Tabla con últimas galaxias y estados de carga -->
        <UCard class="content-card">
            <div class="content-header">
                <h2>Galaxias</h2>
                <p>{{ totalGalaxias }}</p>
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
                            <td>
                                <UButton @click="navigateTo(`/galaxia/detalle/${galaxia.id}`)">
                                    {{ galaxia.nombre || 'Sin nombre' }}
                                </UButton>
                            </td>
                            <td>{{ galaxia.tipo || 'Sin tipo' }}</td>
                            <td>{{ galaxia.num_planetas ?? 0 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </UCard>
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


.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
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