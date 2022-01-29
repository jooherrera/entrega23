import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AuthenticationException } from "@adonisjs/auth/build/standalone";

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class AdminAuthMiddleware {
  /**
   * Handle request
   */
  protected redirectTo = "/";
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */

    await auth.check();
    if (auth.isLoggedIn && auth.user?.isAdmin) {
      await next();
    } else {
      throw new AuthenticationException(
        "Unauthorized access",
        "E_UNAUTHORIZED_ACCESS",
        "",
        this.redirectTo
      );
    }
  }
}
