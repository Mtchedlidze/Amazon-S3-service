export default {
  openapi: '3.0.0',
  info: {
    version: '1.0',
    title: 'file managment rest api',
    description: 'rest api for file managment with AWS s3',
  },
  servers: [
    {
      url: 'https://frozen-tundra-65150.herokuapp.com',
    },
  ],
  paths: {
    '/upload': {
      post: {
        description: 'add file to filestorage',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  fileName: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'information about file',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    ETag: 'string',
                    Location: 'string',
                    key: 'string',
                    Key: 'string',
                    Bucket: 'string',
                  },
                },
              },
            },
          },
          500: {
            description: 'error stack',
          },
        },
      },
    },
  },
}
