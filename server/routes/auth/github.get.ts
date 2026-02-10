import { eq } from "drizzle-orm";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login
      }
    })

    const db= useDb();
    let existingUser=await db.query.users.findFirst({
      where: eq(schema.users.email,user.email)
    });
    return sendRedirect(event, '/')
    
  },


  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})