export const GQL_REPO_PROJECTS_QUERY = `
query RepoProjects($id: ID!, $first: Int = 100) {
    node(id: $id) {
        ... on Repository {
            name
            projectsV2(first: $first) {
                nodes {
                    closed
                    id
                    title
                    url
                    public
                    number
                }
            }
        }
    }
}
`;
