import Cookies, { type CookieSetOptions } from 'universal-cookie'

class CookieService {
  private cookies: Cookies

  constructor() {
    this.cookies = new Cookies()
  }

  get(name: string) {
    return this.cookies.get(name)
  }
  set(name: string, value: any, options?: CookieSetOptions | undefined) {
    this.cookies.set(name, value, { path: '/', ...options })
  }
  remove(name: string, options?: CookieSetOptions) {
    this.cookies.remove(name, { path: '/', ...options })
  }
}

// Export a singleton instance
export default new CookieService()
