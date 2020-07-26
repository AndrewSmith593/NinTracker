// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Require in express router
// const router = require("express").Router();
// var connection = require()
var db = require("../models");
var passport = require("../config/passport");

// CRUD Operations

module.exports = function (app) {
    // CREATE
    // POST new games that the user saves into their database 
    app.post("/api/games", function (req, res) {
        // Add sequelize code for creating a post using req.body,
        // then return the result using res.json
        console.log(`post hit the games apiRoute`)
        db.Game.create(req.body.id)
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



    // ============== User Routes ============== //


    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.users.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                console.log(err)
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

}