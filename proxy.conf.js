/* Configuracion de proxys en local*/
/* Para evitar la configuracion de CORS*/

const PROXY_CONFIG = [
  {
    /* url cortas*/
    context: [
      '/api/session',
      '/financing/offers',
      '/financing/deferredOffers',
      '/financing/terms-conditions',
      '/financing/differOffer',
      '/financing/deferralOffers',
      '/api/validateTokenManager'
    ],
    /*target para dev*/
    //target: 'https://financing-security-mx-financing-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp',
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
