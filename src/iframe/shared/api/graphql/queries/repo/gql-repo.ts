export const GQL_REPO_QUERY = `query GetRepository($id: ID!) {
  node(id: $id) {
    ... on Repository {
      nameWithOwner
      description
      url
    }
  }
}`;
