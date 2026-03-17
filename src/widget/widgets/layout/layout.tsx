import type { WidgetTheme } from '../../shared/styles';

import { useModal } from '../../shared/lib/hooks';
import { borderRadius, getColorStyles } from '../../shared/styles';
import { Modal } from '../../shared/ui';
import { AutoLayout } from '../../widget-components';
import { Header } from './header';

type LayoutProps = { widgetTheme?: WidgetTheme } & AutoLayoutProps;

export const Layout = ({ children, widgetTheme = 'light' }: LayoutProps) => {
  const { modal } = useModal();
  const colorStyles = getColorStyles(widgetTheme);

  return (
    <AutoLayout
      overflow={modal.openedModal ? 'visible' : 'hidden'}
      name="Layout"
      verticalAlignItems="center"
      horizontalAlignItems="center"
      direction="vertical"
      cornerRadius={borderRadius.large}
      fill={colorStyles.surface.background}
      stroke={colorStyles.border}
      width={440}
    >
      <Header widgetTheme={widgetTheme} />
      <AutoLayout
        verticalAlignItems="center"
        horizontalAlignItems="center"
        direction="vertical"
        width="fill-parent"
      >
        {children}
      </AutoLayout>
      <Modal widgetTheme={widgetTheme} />
    </AutoLayout>
  );
};
