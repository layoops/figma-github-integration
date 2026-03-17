import { useSyncedState } from '../../../widget-components';
import { SYNC_KEYS } from '../sync-keys';

type ModalContent = {
  title: string;
  children?: AutoLayoutProps['children'];
};

type ModalState = {
  openedModal: boolean;
  modalContent?: ModalContent;
};

export const useModal = () => {
  const [modal, setModal] = useSyncedState<ModalState>(SYNC_KEYS.shared.ui.modal.isOpened, {
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
