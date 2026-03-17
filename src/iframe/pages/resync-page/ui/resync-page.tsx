import { useAppContext } from '@/shared/lib/contexts';
import { PageContentLayout } from '@/widgets/page-content-layout';

import { useResync } from '../hooks';

export const ResyncPage = () => {
  const { githubAccessToken, isLoading } = useAppContext();

  const _ = useResync();

  if (isLoading || !githubAccessToken) {
    return <div>Is loading token</div>;
  }

  return (
    <PageContentLayout>
      <div></div>
    </PageContentLayout>
  );
};
