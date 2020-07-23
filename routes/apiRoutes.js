// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Require in express router
const router = require("express").Router();

var db = require("../models");


// CRUD Operations

module.exports = function (app) {
    // CREATE
    // POST new games that the user saves into their database 
    app.post("/api/games", function (req, res) {
        // Add sequelize code for creating a post using req.body,
        // then return the result using res.json
        db.Game.create(req.body)
            .then(function (results) {
                res.json(results);
            });
    });


    // READ
    // GET saved and completed games for the user
    app.get("/api/games", function (req, res) {
        db.Game.findAll()
            .then(results => res.json(results))
            .catch(err => res.json(err))

    });

    // UPDATE
    // PUT new updates to a game table
    app.put("/api/games", function (req, res) {
        // req.body.id and return the result to the user using res.json
        db.Game.update({
            completion: req.body.completion
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (results) {
            res.json(results);
        }).catch(function (err) {
            res.json(err);
        });
    });


    // DELETE
    // DELETE method to remove a game from a table/list
    app.delete("/api/games/:id", function (req, res) {
        // Add sequelize code to delete a game where the id is equal to req.params.id, 
        // then return the result to the user using res.json
        db.Game.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (results) {
            res.json(results);
        });
    });
    
    app.get("/api/games", function (req, res) {
        // Add sequelize code to find all posts, and return them to the user with res.json
        db.Game.findAll()
            .then(results => res.json(results))
            .catch(err => res.json(err))

    });
}