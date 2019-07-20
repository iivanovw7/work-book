import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { resolvers } from './resolvers';
import { authRoutes } from './routes/auth.routes';
import { typeDefs } from './typeDefs';
import { checkAccess } from './utils';

const app = express();
const path = '/graphql';

// CORS configuration
const allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', process.env.ROOT);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
};

// Allowing CORS
app.use(cors({
	credentials: true,
	origin: true
}));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup apollo server with context
const server = new ApolloServer({
	typeDefs,
	resolvers,
	async context({ req }) {
		const user = await checkAccess(req);
		return { user };
	}
});

// Authentication express routes
app.use('/auth', authRoutes);

server.applyMiddleware({
	app,
	path
});
export { app };
