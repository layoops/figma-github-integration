import { useSyncedState } from '../../../widget-components';

interface ModalContent {
  title: string;
  children?: AutoLayoutProps['children'];
}

interface ModalState {
  openedModal: boolean;
  modalContent?: ModalContent;
}

export const useModal = () => {
  const [modal, setModal] = useSyncedState<ModalState>('openedModal', {
    openedModal: false,
    modalContent: { title: 'Modal', children: undefined },
  });

  return {
    closeModal: () => setModal((prev) => ({ ...prev, openedModal: false })),
    openModal: (modalContent: ModalContent) =>
      setModal((prev) => ({
        ...prev,
        modalContent: modalContent,
        openedModal: true,
      })),
    setModal,
    modal,
  };
};
