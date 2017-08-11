const {Router} = require('express');
const indexRouter = Router();

indexRouter.get('/', (_req, res, _next) => res.send('Proxying the BetterDoctor API. Go to /api/v1/doctors/search?name=[search string here].'));

module.exports = indexRouter;
