
import * as schema from '../db/schema'


export async function getGalaxias( ){
    const galaxias= await useDb().query.galaxias.findMany();
 return galaxias
};


export async function insertGalaxias(galaxia:Object) {

    const res= await useDb().insert(schema.galaxias).values({
        nombre: galaxia.nombre,
        num_planetas: galaxia.num_planetas,
        curiosidades: galaxia.curiosidades,
        tipo: galaxia.tipo
          
    }).returning()
    const newGalaxia=res.at(0)

    if (!newGalaxia){
        throw createError ({statusCode:500, statusMessage:"Error al registrar una nueva galaxia"})
    }
    
    return newGalaxia
}