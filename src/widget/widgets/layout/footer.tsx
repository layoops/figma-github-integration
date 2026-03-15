import type { GithubEntity } from '../../shared/lib/types/github';

import { resyncEntity } from '../../features/import';
import { formatDate } from '../../shared/lib/helpers';
import { useWidgetTranslation } from '../../shared/lib/hooks';
import { SYNC_KEYS } from '../../shared/lib/sync-keys';
import { Button, CustomText } from '../../shared/ui';
import { IconReload } from '../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../widget-components';

type FooterProps = {
  text?: string;
  githubEntity: GithubEntity;
  onClick?: () => void;
} & AutoLayoutProps;

export const Footer = ({ githubEntity, ...rest }: FooterProps) => {
  const { t, locale } = useWidgetTranslation();
  const [lastSyncDate] = useSyncedState<undefined | string>(
    SYNC_KEYS.widget.lastSyncDate,
    undefined
  );

  const lastSyncDateText = formatDate({
    value: lastSyncDate,
    type: 'full',
    locale,
  });

  return (
    <AutoLayout
      padding={{ horizontal: 16, vertical: 12 }}
      width="fill-parent"
      name="Footer"
      verticalAlignItems="center"
      {...rest}
    >
      <AutoLayout
        hidden={!lastSyncDateText}
        width="fill-parent"
        name="Reload Wrapper"
        verticalAlignItems="center"
        direction="vertical"
        spacing={2}
      >
        <CustomText size="extra-small">{t('ui.lastSynced')}:</CustomText>
        <CustomText size="extra-small">{lastSyncDateText}</CustomText>
      </AutoLayout>

      <Button
        name="Sync Button"
        size="small"
        onClick={() =>
          resyncEntity({
            githubEntity: githubEntity,
          })
        }
        iconLeft={{ src: IconReload() }}
        appearance="secondary"
        text={t('ui.syncAction')}
      />
    </AutoLayout>
  );
};
