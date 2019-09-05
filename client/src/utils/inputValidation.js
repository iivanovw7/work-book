const maxEmailLength = 3;
const maxPasswordLength = 3;
const maxSearchTermLength = 6;

export const constraintsLogin = {
  email: {
    presence: true,
    length: {
      minimum: maxEmailLength,
      message: {
        eng: `must be at least ${maxEmailLength} characters!`,
        rus: `не менее ${maxEmailLength} символов!`
      }
    }
  },
  password: {
    presence: true,
    length: {
      minimum: maxPasswordLength,
      message: {
        eng: `must be at least ${maxPasswordLength} characters!`,
        rus: `не менее ${maxPasswordLength} символов!`
      }
    }
  }
};

export const constraintsSearch = {
  searchTerm: {
    length: {
      maximum: maxSearchTermLength,
      message: {
        eng: `${maxSearchTermLength} characters max!`,
        rus: `максимум ${maxSearchTermLength} символов!`
      }
    }
  }
};
