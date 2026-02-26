import {deleteGalaxia} from '../../api/galaxias'

//Handler de la peticion DELETE
export default defineEventHandler (async (event)=>{
     const id = getRouterParam(event, 'id')

    const newInsertGalaxia=await deleteGalaxia(parseInt(id))

    return newInsertGalaxia
})