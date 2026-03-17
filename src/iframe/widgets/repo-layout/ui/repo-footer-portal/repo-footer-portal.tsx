import type { ReactNode } from 'react';

import { createPortal } from 'react-dom';

import { useRepoLayoutFooter } from '../repo-layout';

export const RepoFooterRightPortal = ({ children }: { children: ReactNode }) => {
  const { footerRightContainer } = useRepoLayoutFooter();

  if (!footerRightContainer) {
    return null;
  }

  return createPortal(children, footerRightContainer);
};

export const RepoFooterLeftPortal = ({ children }: { children: ReactNode }) => {
  const { footerLeftContainer } = useRepoLayoutFooter();

  if (!footerLeftContainer) {
    return null;
  }

  return createPortal(children, footerLeftContainer);
};
