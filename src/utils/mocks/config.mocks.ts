/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigService } from 'src/config/config.service';

const configServiceMockValue = {
  env: {
    NODE_ENV: 'development',
    PORT: 3000,
    TYPEORM_TYPE: 'auto',
    TYPEORM_DB_URL: '',
    TYPEORM_LOGGING: false,
    HEALTH_CHECK_DATABASE_TIMEOUT_MS: 3000,
    JWT_SECRET: '',
    JWT_EXPIRES_IN: 86400,
    SKIP_AUTH: false,
    SWAGGER_UI: false,
    HASHID_SALT: 'hash-secret',
  },
};
export const ConfigServiceMock = {
  provide: ConfigService,
  useValue: configServiceMockValue,
};