import type { GithubEntity } from '../../shared/lib/types/github';

import { resyncIssue } from '../../features/import/model/resync-issue';
import { formatDate } from '../../shared/lib/helpers';
import { Button, CustomText } from '../../shared/ui/components';
import { IconReload } from '../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../widget-components';

interface FooterProps extends AutoLayoutProps {
  text?: string;
  githubEntity: GithubEntity;
  onClick?: () => void;
}

export const Footer = ({ githubEntity, ...rest }: FooterProps) => {
  const [lastSyncDate] = useSyncedState<undefined | string>('lastSynced', undefined);

  const lastSyncDateText = formatDate({
    value: lastSyncDate,
    type: 'full',
    locale: 'en-EN',
  });

  return (
    <AutoLayout
      padding={{ horizontal: 16, vertical: 12 }}
      width="fill-parent"
      name={'Reload Wrapper'}
      verticalAlignItems="center"
      {...rest}
    >
      <AutoLayout
        hidden={!lastSyncDateText}
        width="fill-parent"
        name={'Reload Wrapper'}
        verticalAlignItems="center"
        direction="vertical"
        spacing={2}
      >
        <CustomText size="extra-small">Last Synced:</CustomText>
        <CustomText size="extra-small">{lastSyncDateText}</CustomText>
      </AutoLayout>

      <Button
        name="Sync Button"
        size="small"
        onClick={() =>
          resyncIssue({
            githubEntity: githubEntity,
          })
        }
        iconLeft={{ src: IconReload() }}
        appearance="secondary"
        text="Sync"
      />
    </AutoLayout>
  );
};
