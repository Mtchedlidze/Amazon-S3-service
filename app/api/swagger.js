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
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
    '/create': {
      post: {
        description: 'add file to filestorage',
        parameters: [
          {
            in: 'query',
            name: 'path',
            schema: {
              type: 'string',
            },
            required: false,
          },
        ],
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
                  $ref: '#/components/schemas/createdResponse',
                },
              },
            },
          },
          default: {
            description: 'unexpected errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/open': {
      get: {
        description: 'open file from file storage',
        parameters: [
          {
            in: 'query',
            name: 'file',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'file from file storage',
          },
          404: {
            description: 'if file not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/fileNotFoundError',
                },
              },
            },
          },
          default: {
            description: 'unexpected errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/list': {
      get: {
        description: 'list of files in folder',
        parameters: [
          {
            in: 'query',
            name: 'path',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'files from folder',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Listresponse',
                },
              },
            },
          },
          default: {
            description: 'unexpected errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/delete': {
      delete: {
        description: 'delete file from filestorage',
        parameters: [
          {
            in: 'query',
            name: 'file',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'file deleted',
          },
          default: {
            description: 'unexpected errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/stats': {
      get: {
        description: 'get file statistics from filestorage',
        parameters: [
          {
            in: 'query',
            name: 'file',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'file statistics',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/getstatsResponse',
                },
              },
            },
          },
          404: {
            description: 'if file does not exists',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/fileNotFoundError',
                },
              },
            },
          },
          default: {
            description: 'unexpected errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      createdResponse: {
        type: 'object',
        properties: {
          Etag: {
            type: 'string',
          },
          Location: {
            type: 'string',
          },
          Key: {
            type: 'string',
          },
          Bucket: {
            type: 'string',
          },
        },
      },
      Listresponse: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            Key: {
              type: 'string',
            },
            LastModified: {
              type: 'string',
              format: 'date',
            },
            ETag: {
              type: 'string',
            },
            Size: {
              type: 'number',
            },
            StorageClass: {
              type: 'string',
              default: 'STANDARD',
            },
          },
        },
      },
      getstatsResponse: {
        type: 'object',
        properties: {
          AcceptRanges: {
            type: 'string',
            format: 'bytes',
          },
          LastModified: {
            type: 'string',
            format: 'date',
          },
          ContentLength: {
            type: 'number',
          },
          ETag: {
            type: 'string',
          },
          ContentType: {
            type: 'string',
            format: 'header',
          },
          MetaData: {
            type: 'object',
          },
        },
      },
      fileNotFoundError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          code: {
            type: 'string',
          },
          region: {
            type: 'string',
            default: null,
          },
          time: {
            type: 'string',
            format: 'date',
          },
          requestId: {
            type: 'string',
          },
          extendedRequestId: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
            default: 404,
          },
          retryable: {
            type: 'boolean',
            default: false,
          },
          retryDelay: {
            type: 'number',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
        required: ['code', 'message'],
      },
    },
  },
}
