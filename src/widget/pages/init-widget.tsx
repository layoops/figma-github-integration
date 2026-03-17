import { openCreateIframe, openImportIframe } from '../features/open-iframe/model/open-iframe';
import { spacingStyles } from '../shared/styles';
import { Button } from '../shared/ui/components';
import { AutoLayout } from '../widget-components';

export const WidgetInit = () => {
  return (
    <AutoLayout
      padding={16}
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      direction="vertical"
      spacing={spacingStyles.small}
      width={'fill-parent'}
    >
      <AutoLayout
        verticalAlignItems={'center'}
        horizontalAlignItems={'center'}
        direction="vertical"
        spacing={spacingStyles.medium}
        width={'fill-parent'}
      >
        <Button
          size="large"
          appearance="secondary"
          width={'fill-parent'}
          onClick={openImportIframe}
          text="Import Issue/PR/Project"
        />
        <Button
          size="large"
          appearance="secondary"
          width={'fill-parent'}
          onClick={openCreateIframe}
          text="Create Issue"
        />
      </AutoLayout>
    </AutoLayout>
  );
};
