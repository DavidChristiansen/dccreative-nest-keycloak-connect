# @dccreative/nestjs-keycloak-connect

A Keycloak authentication module for NestJS applications, providing seamless integration with Keycloak for authentication and authorisation.

## Installation

```bash
npm install dccreative-nestjs-keycloak-connect
```

## Features

- 🔐 **JWT Token Validation** - Validates JWT tokens with support for key rotation
- 🏗️ **Multi-tenant Support** - Built-in support for multi-tenant applications
- 🛡️ **Guards** - Authentication, Role, and Resource guards for protecting routes
- 🎨 **Decorators** - Convenient decorators for roles, scopes, and public routes
- 🔄 **Separate Issuer URL Support** - Validates tokens with different issuer URLs
- ⚡ **NestJS Integration** - Seamless integration with NestJS modules and dependency injection

## Quick Start

### Basic Setup

```typescript
import { KeycloakConnectModule } from 'dccreative-nestjs-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'your-realm',
      clientId: 'your-client-id',
      secret: 'your-client-secret',
    }),
  ],
})
export class AppModule {}
```

### Using Guards

```typescript
import { Controller, Get } from '@nestjs/common';
import {
  AuthGuard,
  RoleGuard,
  Roles,
  Public
} from 'dccreative-nestjs-keycloak-connect';

@Controller()
export class AppController {

  @Get('public')
  @Public()
  publicEndpoint() {
    return 'This is public';
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  protectedEndpoint() {
    return 'This requires authentication';
  }

  @Get('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles({ roles: ['admin'] })
  adminEndpoint() {
    return 'This requires admin role';
  }
}
```

### Accessing Authenticated User

```typescript
import { AuthenticatedUser } from 'dccreative-nestjs-keycloak-connect';

@Controller()
export class UserController {

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@AuthenticatedUser() user: any) {
    return user;
  }
}
```

## Configuration Options

### Synchronous Configuration

```typescript
KeycloakConnectModule.register({
  authServerUrl: 'http://localhost:8080',
  realm: 'your-realm',
  clientId: 'your-client-id',
  secret: 'your-client-secret',
  issuerUrl: 'http://external-issuer:8080', // Optional: for separate issuer URL
  realmPublicKey: 'your-realm-public-key',  // Optional: for offline validation
})
```

### Asynchronous Configuration

```typescript
KeycloakConnectModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    authServerUrl: configService.get('KEYCLOAK_URL'),
    realm: configService.get('KEYCLOAK_REALM'),
    clientId: configService.get('KEYCLOAK_CLIENT_ID'),
    secret: configService.get('KEYCLOAK_CLIENT_SECRET'),
  }),
  inject: [ConfigService],
})
```

## Available Guards

- **AuthGuard** - Validates JWT tokens and ensures user is authenticated
- **RoleGuard** - Checks if user has required roles
- **ResourceGuard** - Validates access to specific resources

## Available Decorators

- **@Public()** - Marks endpoints as publicly accessible
- **@Roles()** - Specifies required roles for endpoint access
- **@Scopes()** - Defines required scopes
- **@Resource()** - Sets resource-based permissions
- **@AuthenticatedUser()** - Injects authenticated user into controller method
- **@EnforcerOptions()** - Configures enforcer options

## Multi-Tenant Support

The module includes built-in multi-tenant support through `KeycloakMultiTenantService`:

```typescript
import { KeycloakMultiTenantService } from 'dccreative-nestjs-keycloak-connect';

@Injectable()
export class TenantService {
  constructor(
    private readonly multiTenantService: KeycloakMultiTenantService,
  ) {}

  async validateTenant(realm: string, request: any) {
    // Custom tenant validation logic
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Development mode
npm run start:dev
```

## Scripts

- `npm run build` - Build the TypeScript source
- `npm run clean` - Clean the dist folder
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run release` - Create a new release
- `npm run release:alpha` - Create an alpha pre-release

## Requirements

- NestJS >= 6.0.0 < 12.0.0
- Node.js >= 14

## License

MIT © David Christiansen

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues or have feature requests, please file them at [GitHub Issues](https://github.com/DavidChristiansen/dccreative-nest-keycloak-connect/issues).

## Author

David Christiansen <coding@davedoes.net>