import { useCallback, useState } from 'react';

export type useModalReturnType = {
  modalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
};

export type useModalProps = {
  /**
   * Initial state of the modal
   */
  defaultVisible?: boolean;
};

export const useModal = ({ defaultVisible = false }: useModalProps = {}): useModalReturnType => {
  const [modalVisible, setVisible] = useState(defaultVisible);

  const showModal = useCallback(() => setVisible(true), [modalVisible]);
  const closeModal = useCallback(() => setVisible(false), [modalVisible]);

  return {
    modalVisible,
    showModal,
    closeModal,
  };
};
