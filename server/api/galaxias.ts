
import { eq } from 'drizzle-orm';
import * as schema from '../db/schema'


export async function getGalaxias( ){
    const galaxias= await useDb().query.galaxias.findMany();
 return galaxias
};


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