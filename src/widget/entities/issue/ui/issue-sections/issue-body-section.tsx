import { BODY_MAX_HEIGHT } from '../../../../shared/lib/const';
import {
  Button,
  CustomText,
  IconButton,
  IssueBodyHeader,
  IssueContentBody,
} from '../../../../shared/ui/components';
import { IconExternal } from '../../../../shared/ui/icons';
import { AutoLayout, useSyncedState } from '../../../../widget-components';

interface IssueBodySectionProps extends AutoLayoutProps {
  header: {
    left: {
      text?: string;
      avatarUrl?: string;
    };
    right?: {
      text?: string;
      icon?: { src?: string; url?: string };
    };
  };
  expanded?: boolean;
  content?: string;
  type: 'body' | 'comment';
  id: string;
}

export const IssueBodySection = ({
  content,
  header,
  type = 'body',
  key,
  ...rest
}: IssueBodySectionProps) => {
  const bodyMaxHeightKey = type + key + 'bodyMaxHeight';
  const [bodyMaxHeight, setBodyMaxHeight] = useSyncedState<number | null>(
    bodyMaxHeightKey,
    BODY_MAX_HEIGHT
  );

  const expandBody = () => {
    setBodyMaxHeight((prev) => (prev === null ? BODY_MAX_HEIGHT : null));
  };

  return (
    <IssueContentBody {...rest}>
      <IssueBodyHeader
        hidden={!header}
        left={{
          name: header.left.text,
          avatarUrl: header.left.avatarUrl,
        }}
        right={{
          text: { text: header.right?.text },
          icon: {
            src: header.right?.icon?.src,
            url: header.right?.icon?.url,
          },
        }}
      />

      <AutoLayout width={'fill-parent'} maxHeight={bodyMaxHeight}>
        <CustomText size="extra-small">{content}</CustomText>
      </AutoLayout>

      <AutoLayout width="fill-parent" maxHeight={bodyMaxHeight}>
        <AutoLayout width={'fill-parent'}>
          <Button
            onClick={expandBody}
            size="extra-small"
            appearance="secondary"
            text={bodyMaxHeight ? 'More' : 'Less'}
          />
        </AutoLayout>
        <IconButton
          hidden={Boolean(bodyMaxHeight)}
          onClick={() => {}}
          href={header.right?.icon?.url}
          size="extra-small"
          appearance="secondary"
          iconSrc={IconExternal()}
        />
      </AutoLayout>
    </IssueContentBody>
  );
};
