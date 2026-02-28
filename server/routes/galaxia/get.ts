import { eq } from 'drizzle-orm'
import { getGalaxiasByUserId } from '../../api/galaxias'
import * as schema from '../../db/schema'

export default defineEventHandler(async(event) =>{
  const session = await getUserSession(event)
  const sessionUser = session.user as { id?: number | string, login?: string, email?: string } | undefined

  let userId = Number(sessionUser?.id)

  if (!userId && (sessionUser?.login || sessionUser?.email)) {
    const userFromDb = await useDb().query.users.findFirst({
      where: sessionUser?.email
        ? eq(schema.users.email, sessionUser.email)
        : eq(schema.users.login, sessionUser!.login as string)
    })

    userId = Number(userFromDb?.id)
  }

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Usuario no autenticado' })
  }

  const galaxias = await getGalaxiasByUserId(userId)

  return galaxias
  
})