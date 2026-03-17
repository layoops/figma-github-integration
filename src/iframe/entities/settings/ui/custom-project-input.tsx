import type { TextInputProps } from '@/shared/ui/components';

import { useModal } from '@/shared/lib/hooks/use-modal';
import { githubProjectsFieldsDocumentationLink } from '@/shared/lib/links';
import { ButtonIcon, CustomButtonLink, TextInput } from '@/shared/ui/components';
import { Modal } from '@/shared/ui/components/modal/modal';
import { InfoIcon } from '@/shared/ui/icons';

export const CustomProjectInput = ({ ...rest }: TextInputProps) => {
  const { modalVisible: modalVisible, showModal: showModal, closeModal: closeModal } = useModal();
  const onDocumentationClick = () => {
    window.open(githubProjectsFieldsDocumentationLink, '_blank');
  };
  return (
    <>
      <TextInput
        {...rest}
        name="custom-field"
        id="custom_field"
        type="text"
        size="medium"
        fullWidth
        rightChildren={
          <ButtonIcon type="button" appearance="ghost" size="medium" onClick={showModal}>
            <InfoIcon />
          </ButtonIcon>
        }
      />
      {modalVisible && (
        <Modal title="Custom Fields" footer={undefined} onClose={closeModal}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              Custom fields are like personalized tags for your project tasks, letting you add extra
              details. When you&apos;re importing tasks, using this input ensures that your special
              field gets included.
            </p>
            <p>
              For a more comprehensive understanding, detailed documentation is available{' '}
              <span>
                <CustomButtonLink onClick={onDocumentationClick} text="here" />
              </span>
              .
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};
