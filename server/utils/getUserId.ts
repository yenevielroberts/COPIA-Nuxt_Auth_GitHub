import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'


//Función donde obtengo el id del usuario atraves del id de la session el email o login
export async function  getUserID(event){

      //1) Obtengo la sesión y datos del usuario logeado 
  const session = await getUserSession(event)
  const sessionUser = session.user as { id?: number | string, login?: string, email?: string } | undefined

  let userId = Number(sessionUser?.id)// 2)Obtengo el id del usuario 

  // 3) Si la sesión no trae id, busco el usuario en BD por email o login.
  if (!userId && (sessionUser?.login || sessionUser?.email)) {
    const userFromDb = await useDb().query.users.findFirst({
      where: sessionUser?.email
        ? eq(schema.users.email, sessionUser.email)
        : eq(schema.users.login, sessionUser!.login as string)
    })

    userId = Number(userFromDb?.id)
  }

    // 4) Si no se puedo identificar el usuario, se bloquea el insert.
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Usuario no autenticado' })
  }

  return userId
}