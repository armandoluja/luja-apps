import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AuthorizationGuard } from './auth-guards/authorization-guard';
// export function loadConfig(oidcConfigService: OidcConfigService) {
//   return () => oidcConfigService.load_using_stsServer(environment.oidc_stsServer);
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService
  ) {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = 'https://localhost:44383';
    openIDImplicitFlowConfiguration.redirect_url = 'https://localhost:4200';
    // The Client MUST validate that the aud (audience) Claim contains its client_id
    // value registered at the Issuer identified by the iss (issuer) Claim as an audience.
    // The ID Token MUST be rejected if the ID Token does not list the Client as a valid
    // audience, or if it contains additional audiences not trusted by the Client.
    openIDImplicitFlowConfiguration.client_id = 'messenger-client';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid profile messenger-api';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'https://localhost:4200';
    openIDImplicitFlowConfiguration.start_checksession = false;
    openIDImplicitFlowConfiguration.silent_renew = true;
    // openIDImplicitFlowConfiguration.silent_renew_url = 'https://localhost:44383/silent-renew.html';
    openIDImplicitFlowConfiguration.post_login_route = '/home';
    // HTTP 403
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    // HTTP 401
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = true;
    // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
    // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;

    const authWellKnownEndpoints = new AuthWellKnownEndpoints();
    authWellKnownEndpoints.issuer = 'https://localhost:44383';

    authWellKnownEndpoints.jwks_uri = 'https://localhost:44383/.well-known/openid-configuration/jwks';
    authWellKnownEndpoints.authorization_endpoint = 'https://localhost:44383/connect/authorize';
    authWellKnownEndpoints.token_endpoint = 'https://localhost:44383/connect/token';
    authWellKnownEndpoints.userinfo_endpoint = 'https://localhost:44383/connect/userinfo';
    authWellKnownEndpoints.end_session_endpoint = 'https://localhost:44383/connect/endsession';
    authWellKnownEndpoints.check_session_iframe = 'https://localhost:44383/connect/checksession';
    authWellKnownEndpoints.revocation_endpoint = 'https://localhost:44383/connect/revocation';
    authWellKnownEndpoints.introspection_endpoint = 'https://localhost:44383/connect/introspect';

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);
  }
}
