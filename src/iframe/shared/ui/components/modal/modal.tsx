import type { FC, PropsWithChildren, ReactNode } from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';

import { IconClose } from '../../icons';
import { ButtonIcon } from '../button';
import classes from './modal.module.css';
import { createContainer, Portal } from './portal';

const MODAL_CONTAINER_ID = 'modal-container-id';

export interface BaseModalProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  header?: FC<PropsWithChildren<ModalHeaderProps>>;
  body?: FC<PropsWithChildren<BaseModalProps>>;
  footer?: FC<PropsWithChildren<BaseModalProps>>;
  footerButtons?: ReactNode;
  onClose: () => void;
}

interface ModalHeaderProps extends BaseModalProps {}

export const ModalDefaultHeader: FC<ModalHeaderProps> = ({ title, subtitle, onClose }) => {
  const onCloseClick = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <div className={classes['modal-header']}>
      <div className={classes['modal-header-title-group']}>
        <h1 className={classes['modal-header-title']}>{title}</h1>
        {subtitle && <h2 className={classes['modal-header-subtitle']}>{subtitle}</h2>}
      </div>
      <ButtonIcon type="button" size="medium" appearance="ghost" onClick={onCloseClick}>
        <IconClose size="medium" />
      </ButtonIcon>
    </div>
  );
};

const ModalDefaultBody: FC<PropsWithChildren<BaseModalProps>> = ({ children }) => {
  return <div className={classes['modal-body']}>{children}</div>;
};
const ModalDefaultFooter: FC<PropsWithChildren<BaseModalProps>> = ({ footerButtons }) => {
  return footerButtons && <div className={classes['modal-footer']}>{footerButtons}</div>;
};

type ModalProps = FC<PropsWithChildren<BaseModalProps>>;

export const Modal: ModalProps = (props) => {
  const { onClose, title, subtitle, header, body, footer } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  const defaultedProps = { ...props, title, subtitle };

  const renderHeader = (header ?? ModalDefaultHeader)(defaultedProps);
  const renderBody = (body ?? ModalDefaultBody)(defaultedProps);
  const renderFooter = (footer ?? ModalDefaultFooter)(defaultedProps);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={classes.modal} ref={rootRef}>
        <div className={classes['modal-content']}>
          {renderHeader}
          {renderBody}
          {renderFooter}
        </div>
      </div>
    </Portal>
  ) : null;
};
