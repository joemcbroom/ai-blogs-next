import { createSwaggerSpec } from 'next-swagger-doc';
import 'server-only';

export const getApiDocs = async () => {
  return createSwaggerSpec({
    apiFolder: '/pages/api/',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Blogverse API Documentation',
        version: '1.0',
      },
    },
  });
};