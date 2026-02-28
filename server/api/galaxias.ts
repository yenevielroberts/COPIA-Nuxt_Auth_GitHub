
import { eq, inArray, and } from 'drizzle-orm';
import * as schema from '../db/schema'

// Devuelve todas las galaxias (sin filtrar por usuario).
export async function getGalaxias( ){
    const galaxias= await useDb().query.galaxias.findMany();
 return galaxias
};

// Devuelve solo las galaxias asociadas a un usuario concreto.
export async function getGalaxiasByUserId(userId: number) {
    const db = useDb()

    // Busca las relaciones usuario-galaxia en la tabla auxiliar.
    const userGalaxias = await db.query.planetas_users.findMany({
        where: eq(schema.planetas_users.id_user, userId)
    })

    // Extrae IDs válidos de galaxia para usarlos en la consulta principal.
    const galaxiaIds = userGalaxias
        .map((item) => item.id_galaxias)
        .filter((id): id is number => typeof id === 'number')

    // Si no hay relaciones, devolvemos lista vacía.
    if (!galaxiaIds.length) {
        return []
    }

    // Recupera únicamente las galaxias vinculadas al usuario.
    const galaxias = await db.query.galaxias.findMany({
        where: inArray(schema.galaxias.id, galaxiaIds)
    })

    return galaxias
}

export async function GalaxiaById(userId:number, galaxiaId:number) {
    const db = useDb()
    
    //busco la galaxia asociada al id del usuario en la tabla auxiliar
    const relacion = await db.query.planetas_users.findFirst({
        where: and(
            eq(schema.planetas_users.id_user, userId),
            eq(schema.planetas_users.id_galaxias, galaxiaId)
        )
    })

    // Si no existe la relación, devuelve null
    if (!relacion || !relacion.id_galaxias) {
        return null
    }

    const userGalaxia = await db.query.galaxias.findFirst({
        where: eq(schema.galaxias.id, relacion.id_galaxias)
    })

   return userGalaxia
}


// Inserta una galaxia sin relación de usuario (uso general/legacy).
export async function insertGalaxias(nombre:string, num_planetas:number, curiosidades:string, tipo:string) {

    const res= await useDb().insert(schema.galaxias).values({
        nombre:nombre,
        num_planetas:num_planetas,
        curiosidades:curiosidades,
        tipo:tipo
    }).returning()
    const newGalaxia=res.at(0)

    if (!newGalaxia){
        throw createError ({statusCode:500, statusMessage:"Error al registrar una nueva galaxia"})
    }
    
    return newGalaxia
}

// Inserta una galaxia y la relaciona con el usuario autenticado.
export async function insertGalaxiasForUser(
    nombre: string,
    num_planetas: number,
    curiosidades: string,
    tipo: string,
    userId: number
) {
    const db = useDb()

    // 1) Crea el registro de galaxia.
    const res = await db.insert(schema.galaxias).values({
        nombre,
        num_planetas,
        curiosidades,
        tipo
    }).returning()

    const newGalaxia = res.at(0)

    if (!newGalaxia?.id) {
        throw createError({ statusCode: 500, statusMessage: 'Error al registrar una nueva galaxia' })
    }

    // 2) Guarda la relación usuario-galaxia en la tabla puente.
    await db.insert(schema.planetas_users).values({
        id_user: userId,
        id_galaxias: newGalaxia.id
    })

    return newGalaxia
}


// Elimina una galaxia por su ID y devuelve datos mínimos de confirmación.
export async function deleteGalaxia(id:number) {
    
    const res= await useDb().delete(schema.galaxias).
    where(eq(schema.galaxias.id, id))
    .returning({deletedId:schema.galaxias.id, nombre:schema.galaxias.nombre});

    const deletedGalaxia=res.at(0)

    if (!deletedGalaxia){
        throw createError ({statusCode:500, statusMessage:"Error al eliminar la galaxia"})
    }
    
    return deletedGalaxia
}


// Actualiza una galaxia por ID y devuelve el registro actualizado.
export async function updateGalaxia(galaxia:{nombre:string, num_planetas:number, curiosidades:string, tipo:string}, id:number,){

    const res=await useDb().update(schema.galaxias).set({nombre:galaxia.nombre,num_planetas:galaxia.num_planetas,curiosidades:galaxia.curiosidades,tipo:galaxia.tipo}).where(eq(schema.galaxias.id, id)).returning();  

    const updatedGalaxia=res.at(0)

       if (!updatedGalaxia){
        throw createError ({statusCode:500, statusMessage:"Error al actualizar la galaxia"})
    }
    
    return updatedGalaxia
    
}