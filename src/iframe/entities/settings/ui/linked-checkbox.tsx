import type { CheckboxProps } from '@/shared/ui/components';

import { useModal } from '@/shared/lib/hooks/use-modal';
import { githubLinkingPRToIssueDocumentationLink } from '@/shared/lib/links';
import { ButtonIcon, Checkbox, CustomButtonLink } from '@/shared/ui/components';
import { Modal } from '@/shared/ui/components/modal/modal';
import { InfoIcon } from '@/shared/ui/icons';

export const LinkedCheckbox = ({ ...rest }: CheckboxProps) => {
  const { modalVisible: modalVisible, showModal: showModal, closeModal: closeModal } = useModal();

  const onDocumentationClick = () => {
    window.open(githubLinkingPRToIssueDocumentationLink, '_blank');
  };
  return (
    <>
      <Checkbox
        size="medium"
        {...rest}
        rightChildren={
          <ButtonIcon type="button" appearance="ghost" size="medium" onClick={showModal}>
            <InfoIcon />
          </ButtonIcon>
        }
      />
      {modalVisible && (
        <Modal title="Linking pull request to issue" onClose={closeModal}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p>
              Linking PR/Issue serves as the bridge between issues and pull requests, creating a
              seamless connection between the two.
            </p>
            <p>This linkage finds its place in the &apos;Relatives&apos; section of the widget</p>
            <p>
              For a more comprehensive understanding, detailed documentation is available{' '}
              <CustomButtonLink onClick={onDocumentationClick} text="here" />.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};
