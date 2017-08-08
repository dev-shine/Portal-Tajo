import auth0 from 'auth0-js';
import R from 'ramda';
import AUTH_CONFIG from './variables';
import isTokenExpired from './tokenHelpers';
import {
  login,
  logout,
} from './apiCalls';
import * as socialHelpers from './socialAuthHelpers';

/**
 * @description
 *
 * 0. should be able to tell if user is already authenticated
 *  - we can do it by verifying expiration date of token (if provided)
 * 1. should provide the way to authorize user with email/password combination and social auth providers (fb, google)
 *  - fetch additional info for different login methods. Ie. after email/password we must get profile and additional access tokens.
 * 2. should provide the way to unauthorize user
 * 3. should be reusable for both mobile and web apps
 */

const getIdToken = R.ifElse(R.has('id_token'), R.prop('id_token'), R.prop('idToken'));
const getAccessToken = R.ifElse(R.has('access_token'), R.prop('access_token'), R.prop('accessToken'));


class Authentication {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  idToken = null;
  accessToken = null;
  storageKey = 'drvrAuth';

  async initialAuthentication(accessToken, idToken, onSuccess, onFailure) {
    const isAuthenticating = await socialHelpers.isAuthenticating(this.storageKey);

    if (isAuthenticating) return;

    if (!isTokenExpired(idToken)) {
      this._authenticate(accessToken, idToken);
      onSuccess(false);
    } else {
      this._unauthenticate();
      onFailure();
    }
  }

  /**
   * Authenticate user with traditional username/password approach
   * @param {String} username - email, username or something else
   * @param {String} password
   * @param {Function} cb - callback which has (err, profile) signature
   */
  traditionalLogin = (username, password, onSuccess, onFailure) => {
    login(username, password)
      .then((loginResult) => {
        this._authenticate(loginResult.access_token, loginResult.id_token);

        this._getUserInfo(loginResult, (error, profile) => {
          if (error) onFailure();
          else onSuccess(profile);
        });
      });
  }

  authorize = (provider) => {
    socialHelpers.setIsAuthenticating(this.storageKey);

    this.auth0.authorize({ connection: provider });
  }

  handleAuthentication = (onSuccess, onFailure) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._authenticate(authResult.accessToken, authResult.idToken);

        this._getUserInfo(authResult, (error, profile) => {
          if (error) onFailure();
          else onSuccess(profile);
        });

        socialHelpers.cleanIsAuthenticating(this.storageKey);
      } else if (err) {
        this._unauthenticate();
        onFailure();
        socialHelpers.cleanIsAuthenticating(this.storageKey);

        console.log(err);
      }
    });
  }

  logout = (successCallback) => {
    logout(this.accessToken)
      .then(() => {
        this._unauthenticate();
        successCallback();
      });
  }

  _getUserInfo = (authResult = {}, cb) => {
    this.auth0.client.userInfo(getAccessToken(authResult), (err, user) => {
      // format profile to convenient structure
      const profile = Object.assign({}, user, authResult, {
        accessToken: getAccessToken(authResult),
        idToken: getIdToken(authResult),
      });

      delete profile.access_token;
      delete profile.id_token;

      cb(err, profile);
    });
  }

  _authenticate = (accessToken, idToken) => {
    this.accessToken = accessToken;
    this.idToken = idToken;
  }

  _unauthenticate = () => {
    this.accessToken = null;
    this.idToken = null;
  }

  isAuthenticated = (idToken = undefined) => {
    const tokenToVerify = idToken || this.idToken;

    return !isTokenExpired(tokenToVerify);
  }
}

export default Authentication;