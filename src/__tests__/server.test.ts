import { createApolloServer } from '../server';
import { ApolloServer } from '@apollo/server';
import { AppContext } from '../interfaces';

describe('Mutations', () => {
  let server: ApolloServer<AppContext>, url: string;

  beforeAll(async () => {
    ({ server, url } = await createApolloServer({ port: 4001 }))
  });

  afterAll(async () => {
    await server?.stop();
  });

  it.skip('allows user to sign up', async () => {
  });

  it.skip('allows the user to login', async () => {
  })
});
