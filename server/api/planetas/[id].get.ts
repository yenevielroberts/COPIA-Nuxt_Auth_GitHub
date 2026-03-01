import { planetaById } from '../planetas'


//Handle GET para obtener todas las galaxias de un usuario
//GET planeta/id
export default defineEventHandler(async(event) =>{

  const id_planeta = getRouterParam(event, 'id')
  const galaxias = await planetaById(Number(id_planeta))

  return galaxias
  
})