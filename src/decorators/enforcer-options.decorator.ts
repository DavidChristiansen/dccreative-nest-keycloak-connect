import { SetMetadata } from '@nestjs/common';
import KeycloakConnect from '../keycloak/keycloak';

export const META_ENFORCER_OPTIONS = 'enforcer-options';

/**
 * Keycloak enforcer options
 * @param opts - enforcer options
 * @since 1.3.0
 */
export const EnforcerOptions = (opts: KeycloakConnect.EnforcerOptions) =>
  SetMetadata(META_ENFORCER_OPTIONS, opts);
