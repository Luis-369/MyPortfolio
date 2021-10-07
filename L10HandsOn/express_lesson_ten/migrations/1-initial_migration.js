'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "posts", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2021-08-31T01:43:51.154Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING(16),
                    "field": "FirstName",
                    "allowNull": true
                },
                "LastName": {
                    "type": Sequelize.STRING(16),
                    "field": "LastName",
                    "allowNull": true
                },
                "UserName": {
                    "type": Sequelize.STRING(16),
                    "field": "UserName",
                    "unique": true,
                    "allowNull": true
                },
                "Password": {
                    "type": Sequelize.STRING(16),
                    "field": "Password",
                    "allowNull": true
                },
                "Email": {
                    "type": Sequelize.STRING(128),
                    "field": "Email",
                    "unique": true,
                    "allowNull": true
                },
                "Admin": {
                    "type": Sequelize.INTEGER(1),
                    "field": "Admin",
                    "defaultValue": "0",
                    "allowNull": false
                },
                "CreatedAt": {
                    "type": Sequelize.DATEONLY,
                    "field": "CreatedAt",
                    "allowNull": false
                },
                "UpdatedAt": {
                    "type": Sequelize.DATEONLY,
                    "field": "UpdatedAt",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "posts",
            {
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "primaryKey": true,
                    "allowNull": false
                },
                "PostTitle": {
                    "type": Sequelize.STRING(64),
                    "field": "PostTitle",
                    "allowNull": true
                },
                "PostBody": {
                    "type": Sequelize.STRING(500),
                    "field": "PostBody",
                    "allowNull": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": true
                },
                "CreatedAt": {
                    "type": Sequelize.DATEONLY,
                    "field": "CreatedAt",
                    "allowNull": false
                },
                "UpdatedAt": {
                    "type": Sequelize.DATEONLY,
                    "field": "UpdatedAt",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
