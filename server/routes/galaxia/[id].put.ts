import {updateGalaxia} from '../../api/galaxias'

//Handler de la peticion POST
export default defineEventHandler (async (event)=>{

    const id = getRouterParam(event, 'id')
    const {nombre, num_planetas, curiosidades,tipo}=await readBody(event)

    const newInsertGalaxia=await updateGalaxia({nombre:nombre, num_planetas:num_planetas, curiosidades:curiosidades,tipo:tipo},parseInt(id))

    return newInsertGalaxia
})