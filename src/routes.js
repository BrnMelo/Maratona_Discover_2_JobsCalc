// biblioteca para criar o servidor
const express = require("express");
// uma parte do express que vai criar os caminhos
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");
// basePath é o caminho base
//ejs já lê por  padrão o /*const basePath = __dirname + "/views"*/
//const views = __dirname + "/views/"

// request, response
// index
routes.get("/", DashboardController.index);
//job
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
//job-edit
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
//profile
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;