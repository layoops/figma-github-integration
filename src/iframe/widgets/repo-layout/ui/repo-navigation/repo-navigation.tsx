import { UnderlineNav } from '@primer/react';
import { createLink, useParams } from '@tanstack/react-router';

import { useTranslation } from '@/shared/lib/contexts';

const UnderlineNavLinkItem = createLink(UnderlineNav.Item);

export const RepoNavigation = () => {
  const { t } = useTranslation();
  const { id } = useParams({ from: '/_layout/_protected/repo/$id' });

  return (
    <UnderlineNav>
      <UnderlineNavLinkItem to="/repo/$id/issues" params={{ id }}>
        {t('repoPages.navigation.issues')}
      </UnderlineNavLinkItem>

      <UnderlineNavLinkItem to="/repo/$id/pull-requests" params={{ id }}>
        {t('repoPages.navigation.pullRequests')}
      </UnderlineNavLinkItem>

      <UnderlineNavLinkItem to="/repo/$id/projects" params={{ id }}>
        {t('repoPages.navigation.projects')}
      </UnderlineNavLinkItem>
    </UnderlineNav>
  );
};
