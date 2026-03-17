import { useModal } from '../../shared/lib/hooks';
import { borderRadius, ColorStyles } from '../../shared/styles';
import { Modal } from '../../shared/ui/components';
import { AutoLayout } from '../../widget-components';
import { Header } from './header';

interface LayoutProps extends AutoLayoutProps {}

export const Layout = ({ children }: LayoutProps) => {
  const { modal } = useModal();

  return (
    <AutoLayout
      overflow={modal.openedModal ? 'visible' : 'hidden'}
      name="Layout"
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      direction="vertical"
      cornerRadius={borderRadius.large}
      fill={ColorStyles.surface.background}
      stroke={ColorStyles.border}
      width={440}
    >
      <Header />
      <AutoLayout
        verticalAlignItems={'center'}
        horizontalAlignItems={'center'}
        direction="vertical"
        width={'fill-parent'}
      >
        {children}
      </AutoLayout>
      <Modal />
    </AutoLayout>
  );
};
