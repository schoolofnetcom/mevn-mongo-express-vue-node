module.exports = function (app) {
  let model = app.models.users;
  let repo = require('../repositories/crud')(model);

  return {
    index: (req, res) => {
      repo.list()
        .then((result) => {
          return res.json(result);
        });
    },
    create: (req, res) => {
      repo.insert(req.body)
        .then((result) => {
          return res.json(result);
        });
    },
    view: (req, res) => {
      repo.get(req.params.id)
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          return res.status(404);
        });
    },
    edit: (req, res) => {
      repo.update(req.params.id, req.body)
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          return res.status(404);
        });
    },
    delete: (req, res) => {
      repo.delete(req.params.id)
        .then((result) => {
          return res.json(result);
        })
        .catch((err) => {
          return res.status(404);
        });
    }
  }
}