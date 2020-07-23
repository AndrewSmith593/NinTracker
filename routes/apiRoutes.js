// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Require in express router
const router = require("express").Router();
const store = require("models");

var db = require("../models");


// CRUD Operations

module.exports = function (app) {
    // CREATE
    // POST new games that the user saves into their database 
    app.post("/api/posts", function (req, res) {
        // Add sequelize code for creating a post using req.body,
        // then return the result using res.json
        db.Post.create(req.body)
            .then(function (results) {
                res.json(results);
            });
    });


    // READ
    // GET saved and completed games for the user
    app.get("/api/posts", function (req, res) {
        db.Post.findAll()
            .then(results => res.json(results))
            .catch(err => res.json(err))

    });

    // UPDATE
    // PUT new updates to a game table
    app.put("/api/posts", function (req, res) {
        // req.body.id and return the result to the user using res.json
        db.Post.update({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category
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
    app.delete("/api/posts/:id", function (req, res) {
        // Add sequelize code to delete a game where the id is equal to req.params.id, 
        // then return the result to the user using res.json
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (results) {
            res.json(results);
        });
    });
    app.get("/api/posts", function (req, res) {
        // Add sequelize code to find all posts, and return them to the user with res.json

        db.Post.findAll()
            .then(results => res.json(results))
            .catch(err => res.json(err))

    });
}