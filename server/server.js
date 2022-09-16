const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
// const cors = require('cors');
// server.use(cors);

//Bind the router db to the app
server.db = router.db;
server.use(middlewares);

const rules = auth.rewriter({
	// Permission rules
	users: 600,
	teams: 600,
	projects: 600,
});

const port = process.env.PORT || 9000;
// You must apply the auth middleware before the router
server.use(rules);
server.use(auth);
server.use(router);
server.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
