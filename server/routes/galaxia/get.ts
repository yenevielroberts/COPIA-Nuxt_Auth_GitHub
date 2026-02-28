
import { getUserID } from '~~/server/utils/getUserId'
import { getGalaxiasByUserId } from '../../api/galaxias'


//Handle GET para obtener todas las galaxias de un usuario
//GET galaxia/get
export default defineEventHandler(async(event) =>{


  const userId= await getUserID(event)//Obtengo el id del usuario
  //5) Obtengo los datos de las galaxias
  const galaxias = await getGalaxiasByUserId(userId)

  return galaxias
  
})