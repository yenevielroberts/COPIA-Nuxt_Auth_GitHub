import {getGalaxias} from '../../api/galaxias'

export default defineEventHandler(async(event) =>{
    //1 Accedo a los campos del formulario

  const galaxias = await getGalaxias()

  return galaxias
  
})