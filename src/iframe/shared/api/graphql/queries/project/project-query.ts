import { ISSUE_VARIABLES } from '../issue';
import { PROJECT_FRAGMENT, PROJECT_VARIABLES } from './project-fragment';

export const PROJECT_QUERY = `
${PROJECT_FRAGMENT}
query Projects($id: ID!,${PROJECT_VARIABLES} , ${ISSUE_VARIABLES},  $quantity: Int = 80) {
  node(id: $id) {
    id
    ...ProjectFragment
  }
}`;
