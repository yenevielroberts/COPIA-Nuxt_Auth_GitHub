import {insertGalaxias} from '../api/galaxias'

//Handler de la peticion POST
export default defineEventHandler (async (event)=>{
    const {nombre, num_planetas, curiosidades,tipo}=await readBody(event)

    const newInsertGalaxia=await insertGalaxias(nombre, num_planetas, curiosidades,tipo)

    return newInsertGalaxia
})