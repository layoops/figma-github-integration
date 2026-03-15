import {
  openPluginCreateIssuePage,
  openPluginIndexPage,
} from '../features/open-iframe/model/open-iframe';
import { useWidgetTranslation } from '../shared/lib/hooks';
import { spacingStyles } from '../shared/styles';
import { Button } from '../shared/ui';
import { AutoLayout } from '../widget-components';

export const WidgetInit = () => {
  const { t } = useWidgetTranslation();

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
        />
        <Button
          size="large"
          appearance="secondary"
          width="fill-parent"
          onClick={openPluginCreateIssuePage}
          text={t('widget.createIssue')}
        />
      </AutoLayout>
    </AutoLayout>
  );
};
