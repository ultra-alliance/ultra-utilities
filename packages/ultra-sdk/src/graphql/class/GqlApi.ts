import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type DocumentNode } from 'graphql';
import { type GqlConstructor } from './types';

class GqlApi {
  private readonly client: ApolloClient<unknown>;

  constructor({ endpoint }: GqlConstructor) {
    this.client = new ApolloClient({
      uri: endpoint,
      cache: new InMemoryCache(),
    });
  }

  async query<T>(
    query: DocumentNode,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const result = await this.client.query({ query, variables });
    return result.data as T;
  }
}

export default GqlApi;
