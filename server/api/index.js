import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
/* eslint indent:0 */

const result = dotenv.config();

if (result.error) {
	throw result.error;
}

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
				.then(() => {
					console.log('Connected to database successfully.');
				})
				.catch((err) => {
					console.log(err);
				});

app.set('port', process.env.PORT_PRIVATE || 8435);

const server = app.listen(app.get('port'), () => {
	console.log(`API is available on port ${server.address().port}`);
});

/**
 *  Handling mongoose connection events
 */
mongoose.connection.on('error', (error) => {
	console.log(error);
});

mongoose.connection.on('disconnecting', () => {
	console.log('Disconnecting from database.');
});

mongoose.connection.on('disconnected', () => {
	console.log('Disconnected from database successfully.');
});

mongoose.connection.on('reconnected', () => {
	console.log('Reconnected to database successfully.');
});

mongoose.connection.on('timeout', () => {
	console.log('Database timeout...');
});

mongoose.connection.on('close', () => {
	console.log('Database connection closed successfully');
});
