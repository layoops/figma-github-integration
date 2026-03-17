import { GQL_ISSUE_DEFAULT_VARIABLES } from '../issue';
import { GQL_PROJECT_FRAGMENT, GQL_PROJECT_VARIABLES } from './gql-project-fragment';

export const GQL_PROJECT_QUERY = `
${GQL_PROJECT_FRAGMENT}
query Projects($id: ID!,${GQL_PROJECT_VARIABLES} , ${GQL_ISSUE_DEFAULT_VARIABLES},  $quantity: Int = 80) {
  node(id: $id) {
    id
    ...ProjectFragment
  }
}`;
