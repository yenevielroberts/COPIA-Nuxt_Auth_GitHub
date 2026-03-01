<script setup lang="ts">
// GET /planetas/detalle/id
// Protege la ruta para usuarios autenticados.
import {FetchError} from 'ofetch'
import type { NumericLiteral } from 'typescript'
definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const id = route.params.id
const toast = useToast()
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();



// Modelo base que llega desde la API de galaxias.
type Planeta = {
    id: number
    nombre: string | null
    anillos: number | null
    satelites: number | null
    habitabilidad: string | null
    orbita_dias: number | null
}

//Obtengo el detalle de una galaxia especifica
const {data:planeta, pending, error, refresh}=useFetch<Planeta | null>(`/api/planetas/${id}`,{
    headers: useRequestHeaders(['cookie']),//Obtenemos las cabeceras de la petición actual (incluyendo la cookie de sesión)
    default: ()=> null,
    
})

const volver = () => navigateTo("/admin");//cambiar ruta

async function deleteHandler(){

    const confirmacion= confirm("Seguro que quieres eliminar este planeta?")
    if(confirmacion){
        try {
            await $fetch(`/api/planetas/${id}`, {
            method:'DELETE'
            })

            fetch()
            toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'error' })
            navigateTo('/admin')//cambiar ruta

        } catch (error) {
            if(error instanceof FetchError){
                //Error de fetch
                toast.add({ title: 'Error', description: error.data.message, color: 'error' })
                }else{
                //Error no controlado
                toast.add({ title: 'error', description: 'Error en la aplicación. Por favor contacte con el equipo técnico', color: 'error' })
            }
        }
    }
}
</script>

<template>
    <section class="detalle-container">
        <p v-if="pending" class="status">Cargando datos...</p>
        <p v-else-if="error" class="status error">Error al cargar la galaxia.</p>
        <p v-else-if="!planeta" class="status error">Planeta no encontrada o no tienes acceso a ella.</p>
        <div  v-else>
            <h1>Planeta {{ planeta.nombre }}</h1>
            <button @click="volver" class="btn-back">← Volver al listado</button>
            <div class="galaxia-detalle">
                <p><strong>Tipo:</strong> {{ planeta.habitabilidad || 'No especificado' }}</p>
                <p><strong>Anillos:</strong> {{ planeta.anillos || 0 }}</p>
                <p><strong>satelites:</strong> {{ planeta.satelites || 'Sin información' }}</p>
                 <p><strong>Orbitas en días:</strong> {{ planeta.orbita_dias || 'Sin información' }}</p>
            </div> 
            <div class="container-action-btn">
                <UButton @click="navigateTo(`/galaxia/actualizar/${planeta.id}`)">Actualizar</UButton>
                <UButton @click="deleteHandler">Eliminar</UButton>  
            </div>
        </div>
   
    </section>
</template>
<style scoped>
/* Botón de volver */
.btn-back {
    background: rgba(20, 25, 60, 0.55);
    border: 1px solid rgba(124, 58, 237, 0.25);
    color: #a5b9f9;
    padding: 0.65rem 1.5rem;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(12px);
}

.btn-back:hover {
    background: rgba(124, 58, 237, 0.25);
    border-color: #7c3aed;
    transform: translateX(-4px);
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
}

.detalle-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.status {
    text-align: center;
    padding: 3rem 2rem;
    font-size: 1.1rem;
    color: #94a3b8;
    background: rgba(20, 25, 60, 0.55);
    border-radius: 18px;
    border: 1px solid rgba(124, 58, 237, 0.15);
}

.status.error {
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
}

/* Título principal */
h1 {
    color: #e2e8f0;
    font-size: 2.2rem;
    margin: 0 0 1.5rem 0;
    background: linear-gradient(90deg, #7c3aed, #38bdf8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/*Tarjeta */
.galaxia-detalle {
    background: rgba(20, 25, 60, 0.55);
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 12px;
    padding: 2rem;
}

.galaxia-detalle p {
    color: #94a3b8;
    margin-bottom: 0.75rem;
    line-height: 1.6;
}

.galaxia-detalle strong {
    color: #a5b9f9;
}

.container-action-btn{
    display: flex;
    margin: 20px;
    gap: 20px;
}
</style>