define({ "api": [
  {
    "type": "get",
    "url": "/api/v1.0/equipement/all",
    "title": "Get all equipement data",
    "version": "1.0.0",
    "group": "Equipement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x_access_token",
            "description": "<p>Users unique jwt-access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "equipement",
            "description": "<p>all equipemetn data from all tables.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success, the Order state has been updated to pickedUp",
          "content": "HTTP/1.1 200 OK\n[{\n  \"_id\": 4,\n  \"code\": 45652,\n  \"field1\": \"value1\"\n  \"field2\": \"value2\"\n  \"field3\": \"value3\"\n  \"field4\": \"value4\"\n},\n{\n  \"_id\": 5,\n  \"code\": 47584,\n  \"field1\": \"value1\"\n  \"field2\": \"value2\"\n  \"field3\": \"value3\"\n  \"field4\": \"value4\"\n}\n  ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "user not identified",
          "content": "HTTP/1.1 450 Error has occurred, the response describe the error\n{\n  \"demande_state\":\"wrong token\",\n  \"err_number\" : 17\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/equipement.js",
    "groupTitle": "Equipement",
    "name": "GetApiV10EquipementAll"
  },
  {
    "type": "get",
    "url": "/api/v1.0/equipement/:id",
    "title": "Get equipement with its id",
    "version": "1.0.0",
    "group": "Equipement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x_access_token",
            "description": "<p>Users unique jwt-access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the unique code of the wanted equipement.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "equipement",
            "description": "<p>all equipemetn data from all tables.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success, the Order state has been updated to pickedUp",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": 4,\n  \"field1\": \"value1\"\n  \"field2\": \"value2\"\n  \"field3\": \"value3\"\n  \"field4\": \"value4\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "equipement not found",
          "content": "HTTP/1.1 404 Error has occurred, the response describe the error\n{\n  \"demande_state\":\"equipement not found !!\",\n  \"err_number\" : 9\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/equipement.js",
    "groupTitle": "Equipement",
    "name": "GetApiV10EquipementId"
  },
  {
    "type": "get",
    "url": "/api/v1.0/me",
    "title": "Get user's infos",
    "group": "User",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x_access_token",
            "description": "<p>Users unique jwt-access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>the id number of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tele",
            "description": "<p>the phone number of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the full name of this user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isActive",
            "description": "<p>the state of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n       \"_id\": \"541\",\n       \"tele\": \"0607123456\",\n       \"email\": \"test@server.fr\",\n       \"name\": \"zikos\",\n       \"password\": \"hidden\",\n       \"isActive\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err_number",
            "description": "<p>defines the generic error number to be identified in the UI.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "demande_state",
            "description": "<p>defines a small description of the error cause.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "error while retreiving data",
          "content": "HTTP/1.1 450 Error has occurred, the response describe the error\n{\n  \"err_number\": 17,\n  \"demande_state\":\"wrong token !\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User",
    "name": "GetApiV10Me"
  },
  {
    "type": "post",
    "url": "/api/v1.0/signin",
    "title": "Sign in",
    "group": "User",
    "version": "1.0.0",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>User's email</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>User's password</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@server.fr\",\n  \"password\": \"test-admin1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "demande_state",
            "description": "<p>success message</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "x_access_token",
            "description": "<p>JWT access token provided to this specific user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idUser",
            "description": "<p>the new ID provided to this specific user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"demande_state\": \"OK\",\n  \"x_access_token\":\"JSJKHEJF4554Z5ZA56FVkfldjfBBBF54DEEFEGHHTLMZP\",\n  \"idUser\": \"86\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err_number",
            "description": "<p>defines the generic error number to be identified in the UI.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "demande_state",
            "description": "<p>defines the error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SignIn error",
          "content": "HTTP/1.1 450 Error has occurred, the response describe the error\n{\n  \"err_number\" : 15\n  \"demande_state\":\"username or password is incorrect !!\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/authentification.js",
    "groupTitle": "User",
    "name": "PostApiV10Signin"
  },
  {
    "type": "post",
    "url": "/api/v1.0/signup",
    "title": "Signup",
    "group": "User",
    "version": "1.0.0",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>User's email</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>User full name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "tele",
        "description": "<p>User phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>access password</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@server.fr\",\n  \"name\": \"firstName LastName\"\n  \"tele\": \"0607123456\"\n  \"password\": \"password-admin1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isActive",
            "description": "<p>describe the state of the user account '[active OR not-active]' (not-active by default).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idUser",
            "description": "<p>contains the id of the inserted user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"isActive\": false,\n  \"idUser\":\"82\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "err_number",
            "description": "<p>defines the generic error number to be identified in the UI.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "demande_state",
            "description": "<p>defines a small description of the error cause.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Signup error",
          "content": "HTTP/1.1 450 Error has occurred, the response describe the error\n{\n  \"err_number\": 13,\n  \"demande_state\":\"error!! the user is already existed in the Database\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/authentification.js",
    "groupTitle": "User",
    "name": "PostApiV10Signup"
  }
] });
