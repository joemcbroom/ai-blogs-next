import { createSwaggerSpec } from 'next-swagger-doc';
import 'server-only';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: '/pages/api/',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0',
      },
    },
  });
  return spec;
};