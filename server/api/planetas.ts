import { eq, inArray, and } from 'drizzle-orm';
import * as schema from '../db/schema'

//Devuelve todos los planetas de una galaxia
export async function getPlanetas(galaxia_id:number) {
    
    const planetas = await useDb().query.planetas.findMany({
        where: eq(schema.planetas.galaxia_id, galaxia_id)
    })

    return planetas
}

// Inserta un planeta.
export async function insertPlaneta(planeta:{
    nombre:string, 
    anillos:number, 
    satelites:number, 
    habitabilidad:string,
    orbita_dias:number,
    },galaxia_id:number) {

    const res= await useDb()
    .insert(schema.planetas)
    .values({
    nombre:planeta.nombre, 
    anillos:planeta.anillos, 
    satelites:planeta.satelites, 
    habitabilidad:planeta.habitabilidad,
    orbita_dias:planeta.orbita_dias,
    galaxia_id
    }).returning()
    const newPlaneta=res.at(0)

    if (!newPlaneta){
        throw createError ({statusCode:500, statusMessage:"Error al registrar un nuevo planeto"})
    }
    
    return newPlaneta
}