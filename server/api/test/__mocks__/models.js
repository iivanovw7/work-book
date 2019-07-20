import bcrypt from 'bcryptjs';

export const testAuthUser = {
	email: 'EMAIL@mail.com',
	phone: 'TEST_PHONE',
	password: bcrypt.hashSync('123', 10),
	name: 'Other',
	surname: 'Other surname',
	role: 'ADMIN'
};

export const testQueriesUser = {
	email: 'TEST@mail.com',
	phone: 'TEST',
	password: bcrypt.hashSync('123', 10),
	name: 'Other',
	surname: 'Other surname',
	role: 'ADMIN'
};

export const testPost = {
	subject: 'SUBJECT',
	text: 'TEXT',
	title: 'TITLE',
	tags: ['tag1', 'tag2', 'tag3']
};

export const anotherTestPost = {
	subject: 'SUBJECT',
	text: 'TEXT',
	title: 'TITLE',
	tags: ['tag4', 'tag5', 'tag6', 'tag1']
};
