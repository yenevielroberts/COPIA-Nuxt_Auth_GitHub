<script setup lang="ts">
// GET /galaxia/detalle/id
// Protege la ruta para usuarios autenticados.
definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const id = route.params.id



// Modelo base que llega desde la API de galaxias.
type Galaxia = {
    id: number
    nombre: string | null
    num_planetas: number | null
    curiosidades: string | null
    tipo: string | null
}

//Obtengo el detalle de una galaxia especifica
const {data:galaxia, pending, error, refresh}=useFetch<Galaxia | null>(`/api/galaxia/${id}`,{
    headers: useRequestHeaders(['cookie']),//Obtenemos las cabeceras de la petición actual (incluyendo la cookie de sesión)
    default: ()=> null,
    
})

const volver = () => navigateTo("/admin");
</script>


<template>
    <div class="detalle-container">
        <button @click="volver" class="btn-back">
        ← Volver al listado
      </button>
        <p v-if="pending" class="status">Cargando datos...</p>
        <p v-else-if="error" class="status error">Error al cargar la galaxia.</p>
        <p v-else-if="!galaxia" class="status error">Galaxia no encontrada o no tienes acceso a ella.</p>
        <div v-else class="galaxia-detalle">
            <h1>{{ galaxia.nombre }}</h1>
            <p><strong>Tipo:</strong> {{ galaxia.tipo || 'No especificado' }}</p>
            <p><strong>Número de planetas:</strong> {{ galaxia.num_planetas || 0 }}</p>
            <p><strong>Curiosidades:</strong> {{ galaxia.curiosidades || 'Sin información' }}</p>
        </div>
    </div>
</template>
<style scoped>
.detalle-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.status {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
}

.status.error {
    color: #ef4444;
}

.galaxia-detalle {
    background: rgba(20, 25, 60, 0.55);
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 12px;
    padding: 2rem;
}

.galaxia-detalle h1 {
    color: #e2e8f0;
    margin-top: 0;
    margin-bottom: 1.5rem;
}

.galaxia-detalle p {
    color: #94a3b8;
    margin-bottom: 0.75rem;
    line-height: 1.6;
}

.galaxia-detalle strong {
    color: #a5b9f9;
}
</style>