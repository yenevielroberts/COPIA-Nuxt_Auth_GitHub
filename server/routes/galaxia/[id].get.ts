import { GalaxiaById } from '../../api/galaxias'
export default defineEventHandler(async (event)=>{

    //1) Obtengo el parametro enviado en la URL
    const id = getRouterParam(event, 'id')

    //2) Obtengo el id del usuario
    const userId= await getUserID(event)//Obtengo el id del usuario

    const galaxia=await GalaxiaById(userId, Number(id))

    // Si no se encuentra la galaxia o el usuario no tiene acceso, retornar error 404
    if (!galaxia) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Galaxia no encontrada o sin acceso'
        })
    }

    return galaxia

})