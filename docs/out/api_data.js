define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/users",
    "title": "Create new user data",
    "version": "0.0.1",
    "name": "CreateUser",
    "group": "User",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>The new user name.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>The new user email.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>The new user password.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"status\": true,\n  \"message\": \"Successfully create new user.\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Errors data.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object[]",
            "optional": false,
            "field": "data[errors]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 OK\n{\n  \"status\": false,\n  \"message\": \"Body doesn't match requirements.\",\n  \"data\": {\n    \"errors\": []\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/internal/handlers/http/user.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1/users"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/users/:id",
    "title": "Get a user",
    "version": "0.0.1",
    "name": "GetAUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data[users]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"message\": \"Successfully get a user.\",\n  \"data\": {\n    \"users\": {}\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError-Response:",
          "content": "HTTP/1.1 404 OK\n{\n  \"status\": false,\n  \"message\": \"User with inputed ID not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/internal/handlers/http/user.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/users",
    "title": "Get all users data",
    "version": "0.0.1",
    "name": "GetAllUsers",
    "group": "User",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "limit",
        "defaultValue": "10",
        "description": ""
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "offset",
        "defaultValue": "0",
        "description": ""
      },
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "sortby",
        "defaultValue": "created_at",
        "description": ""
      },
      {
        "group": "Query",
        "type": "String",
        "allowedValues": [
          "\"asc\"",
          "\"desc\""
        ],
        "optional": false,
        "field": "orderby",
        "defaultValue": "asc",
        "description": ""
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data[users]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"message\": \"Successfully get all users.\",\n  \"data\": {\n    \"users\": []\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Errors data.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String[]",
            "optional": false,
            "field": "data[errors]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 OK\n{\n  \"status\": false,\n  \"message\": \"Params doesn't match requirements.\",\n  \"data\": {\n    \"errors\": []\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/internal/handlers/http/user.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1/users"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/users/:id",
    "title": "Remove a user",
    "version": "0.0.1",
    "name": "RemoveAUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data[users]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"message\": \"Successfully remove a user.\",\n  \"data\": {\n    \"users\": {}\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotFoundError-Response:",
          "content": "HTTP/1.1 404 OK\n{\n  \"status\": false,\n  \"message\": \"User with inputed ID not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/internal/handlers/http/user.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1/users/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/users/:id",
    "title": "Update a user",
    "version": "0.0.1",
    "name": "UpdateAUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>The new user name.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>The new user email.</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>The new user password.</p>"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response data.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data[users]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"message\": \"Successfully update a user.\",\n  \"data\": {\n    \"users\": {}\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Success status.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": true,
            "field": "data",
            "description": "<p>Error data.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String[]",
            "optional": false,
            "field": "data[errors]",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 OK\n{\n  \"status\": false,\n  \"message\": \"Params doesn't match requirements.\",\n  \"data\": {\n    \"errors\": []\n  }\n}",
          "type": "json"
        },
        {
          "title": "NotFoundError-Response:",
          "content": "HTTP/1.1 404 OK\n{\n  \"status\": false,\n  \"message\": \"User with inputed ID not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/internal/handlers/http/user.ts",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/v1/users/:id"
      }
    ]
  }
] });
