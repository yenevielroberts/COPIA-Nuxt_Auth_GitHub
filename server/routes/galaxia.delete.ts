import {deleteGalaxia} from '../api/galaxias'

//Handler de la peticion DELETE
export default defineEventHandler (async (event)=>{
    const {id}=await readBody(event)

    const newInsertGalaxia=await deleteGalaxia(id)

    return newInsertGalaxia
})