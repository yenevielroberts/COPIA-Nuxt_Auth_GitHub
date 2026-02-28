<script setup lang="ts">
// GET /planetas/listado/id (id de la galaxia)
// Protege la ruta para usuarios autenticados.
definePageMeta({ middleware: ['auth'] })
const route = useRoute()
const galaxia_id = route.params.id

const volver = () => navigateTo("/admin");

// Datos de sesión y endpoint protegido de admin.
const { user } = useUserSession()

// Consulta principal para pintar el dashboard.
const { data: planetas, pending, error, refresh } = useFetch(`/api/planetas/galaxia/${galaxia_id}`)

// KPIs del panel.
const totalplanetas = computed(() => planetas.value?.length ?? 0)


// Muestra solo las últimas 5 entradas (de más reciente a más antigua).
const listaPlanetas = computed(() => (planetas.value ?? []))
</script>

<template>
    <!-- Contenedor principal de la home de administración -->
    <main class="admin-home">
        <!-- Cabecera con descripción y acciones rápidas -->
        <section class="hero">
            <h1>Los planetas de la galaxia:</h1>
            <div class="hero-actions">
                
                <UButton as-child>
                    <NuxtLink to="/planetas/NewPlaneta">Nuevo Planeta</NuxtLink>
                </UButton>
            </div>
        </section>
        <!-- Tabla con últimas galaxias y estados de carga -->
        <UCard class="content-card">
            <div class="content-header">
                <h2>Planetas</h2>
                <p v-if="!listaPlanetas.length">0</p>
                <p v-else>{{ listaPlanetas.length }}</p>
                <UButton color="neutral" variant="outline" size="sm" @click="refresh()">Actualizar</UButton>
            </div>
            <button @click="volver" class="btn-back">← Volver al listado</button>
            <p v-if="pending" class="status">Cargando datos...</p>
            <p v-else-if="error" class="status error">No se pudieron cargar los planetas.</p>
            <p v-else-if="!listaPlanetas.length" class="status">No hay planetas registrados en esta galaxia.</p>

            <div v-else class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>habitabilidad</th>
                            <th>Orbita en días</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="planeta in listaPlanetas" :key="planeta.id">
                            <td>
                                <UButton @click="navigateTo(``)">
                                    {{ planeta.nombre }}
                                </UButton>
                            </td>
                            <td>{{ planeta.habitabilidad || 'Sin tipo' }}</td>
                            <td>{{ planeta.orbita_dias ?? 0 }}</td>
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