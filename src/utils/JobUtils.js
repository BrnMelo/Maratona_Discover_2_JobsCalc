module.exports = {
    remainingDays(job) {
      // calculo de tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      const createdDate = new Date(job.created_at);
      // casting de dados para Certificar de que remainingDays que foi transformado em string pelo toFixed() volte a ser um dado numérico
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDateInMs - Date.now();
      // transdormar millisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

      //restam x dias
      return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  }