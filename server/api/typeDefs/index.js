import { mutation } from './mutation';
import { query } from './query';
import { postTypes, userTypes } from './types';

export const typeDefs = [query, mutation, userTypes, postTypes];
