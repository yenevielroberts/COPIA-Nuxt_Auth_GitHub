import insertGalaxias from '../../api/galaxias'

//Handler de la peticion POST
export default defineEventHandler (async (event)=>{

    const body=await readBody(event)

    const newInsertGalaxia=await  insertGalaxias(body)

    return newInsertGalaxia
})