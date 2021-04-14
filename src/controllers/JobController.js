const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    // facilitador de caminhos
    //const jobs = await Job.get();

    // req.body { name: 'Law in action', 'daily-hours': '6', 'total-hours': '240' }
    // jobs.push() => está empurrando o que está dentro do req.body para jobs

    // ? - é um escape para caso não exista o id em profile

    //const lastId = jobs[jobs.length - 1]?.id || 0;

    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      // atribuindo uma nova data de hoje
      created_at: Date.now(),
    });

    return res.redirect("/");
  },

  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job not Found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    /*

    const jobs = await Job.get();
    // procura o job dentro de jobs
    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    // se não existir acabou
    if (!job) {
      return res.send("Job not Found!");
    }
    
    */

    //pegando dos parametros o número do projeto
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };
    /* Job.data.map() vai rodar uma função para cada job e vai retornar o job em Job.data

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });
    
    */

    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
