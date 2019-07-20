export const constraints = {
	email: {
		presence: true,
		length: {
			minimum: 3,
			message: {
				eng: 'must be at least 3 characters!',
				rus: 'не менее 3 символов!'
			}
		}
	},
	password: {
		presence: true,
		length: {
			minimum: 3,
			message: {
				eng: 'must be at least 3 characters!',
				rus: 'не менее 3 символов!'
			}
		}
	}
};
