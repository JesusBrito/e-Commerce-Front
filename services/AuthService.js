import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter'
import router from './../router'
import {AUTH_CONFIG} from './auth0-variables'

export default class AuthService {
  //authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    //this.login = this.login.bind(this)
    //this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }
  /*
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.audience,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        if(localStorage.getItem('role')==='user'){
          router.replace('lista-productos')
        }else{
          router.replace('productos')
        }
      } else if (err) {
        router.replace('lista-productos')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('role', authResult.idTokenPayload['https://role'][0])
    console.log(authResult)
    this.authNotifier.emit('authChange', { authenticated: true })
  }
  */
  logout () {
    // Clear Access Token and ID Token from local storage
    localStorage.clear()
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('lista-productos')
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // Access Token's expiry time
    let user = JSON.parse(localStorage.getItem('UsuarioLogueado'))
    return user
  }
}
