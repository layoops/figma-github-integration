import type { WidgetTheme } from '../shared/styles/themes';

import {
  openPluginCreateIssuePage,
  openPluginIndexPage,
} from '../features/open-iframe/model/open-iframe';
import { useWidgetTranslation } from '../shared/lib/hooks';
import { SYNC_KEYS } from '../shared/lib/sync-keys';
import { spacingStyles } from '../shared/styles';
import { Button } from '../shared/ui';
import { AutoLayout, useSyncedState } from '../widget-components';

export const WidgetInit = () => {
  const { t } = useWidgetTranslation();
  const [widgetTheme] = useSyncedState<WidgetTheme>(SYNC_KEYS.widget.theme, 'light');

  return (
    <AutoLayout
      padding={16}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      direction="vertical"
      spacing={spacingStyles.small}
      width="fill-parent"
    >
      <AutoLayout
        verticalAlignItems="center"
        horizontalAlignItems="center"
        direction="vertical"
        spacing={spacingStyles.medium}
        width="fill-parent"
      >
        <Button
          size="large"
          appearance="secondary"
          width="fill-parent"
          onClick={openPluginIndexPage}
          text={t('widget.importIssue')}
          widgetTheme={widgetTheme}
        />
        <Button
          size="large"
          appearance="secondary"
          width="fill-parent"
          onClick={openPluginCreateIssuePage}
          text={t('widget.createIssue')}
          widgetTheme={widgetTheme}
        />
      </AutoLayout>
    </AutoLayout>
  );
};
