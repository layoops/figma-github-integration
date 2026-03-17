import type { GithubEntity } from '../../../shared/lib/types/github';

import { ROUTES } from '../../../../global-shared/routes-map';
import { openPluginUI } from '../../../shared/lib/helpers';

export const resyncEntity = (props: { githubEntity: GithubEntity }) => {
  openPluginUI({
    routeName: ROUTES.RESYNC,
    props: props ?? {},
    options: { visible: false },
  });
};
