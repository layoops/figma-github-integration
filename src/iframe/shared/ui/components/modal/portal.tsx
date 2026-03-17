import type { PropsWithChildren } from 'react';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type containerOptions = {
  id: string;
  mountNode?: HTMLElement;
};

export const createContainer = (options: containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', id);
  mountNode.appendChild(portalContainer);
};

interface PortalProps extends PropsWithChildren {
  id: string;
}

const PORTAL_ERROR_MESSAGE = `There is no portal container in markup. Please add portal container with proper id attribute.`;

export const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MESSAGE);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};
