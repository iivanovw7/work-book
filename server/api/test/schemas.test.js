import '@babel/polyfill/noConflict';
import chalk from 'chalk';
import { makeExecutableSchema, addMockFunctionsToSchema, mockServer } from 'graphql-tools';
import { graphql } from 'graphql';
import { resolvers } from '../resolvers';
import { typeDefs } from '../typeDefs';
import * as schemas from './__mocks__/schemas';

const cases = [
  schemas.getTagsCase,
  schemas.getPostsCase,
  schemas.getPostCase,
  schemas.findPostsByTagCase,
  schemas.findPostsByKeywordCase,
  schemas.getUser
];

describe(`Checking [${chalk.yellow('Graphql Schemas')}]: `, () => {
  const mockSchema = makeExecutableSchema({ typeDefs, resolvers });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 1.1,
      String: () => 'linux',
      Array: () => [1, 2, 3],
      Object: () => null
    }
  });

  it('Has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query('{ __schema { types { name } } }');
    }).not.toThrow();
  });

  cases.forEach(async (obj) => {
    const {
      id, query, variables, context: ctx, expected
    } = obj;

    it(`Testing Query: [${chalk.yellow(id)}] `, async () => await expect(
      graphql(mockSchema, query, null, { ctx }, variables)
    ).resolves.toEqual(expected));
  });
});
