export const GQL_REPO_LABELS_QUERY = `
query GetRepositoryLabels($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    labels(first: 100, orderBy: { field: NAME, direction: ASC }) {
      nodes {
        id
        name
        color
        description
      }
    }
  }
}
`;
