import { KeycloakService } from 'keycloak-angular';


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'Deaddiction',
        clientId: 'my_client'
      },
      initOptions: {
        checkLoginIframe:true,
        checkLoginIframeInterval:25
      },
      loadUserProfileAtStartUp:true
    });
}
