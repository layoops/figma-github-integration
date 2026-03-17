import { Text } from '@primer/react';

import './html-body.css';

import { useTranslation } from '@/shared/lib/contexts';

type HTMLBodyProps = {
  html: string;
};

const addTargetBlankToLinks = (html: string) => {
  return html.replace(/<a\b(?![^>]*\btarget=)[^>]*>/gi, (match) =>
    match.replace('<a', '<a target="_blank" rel="noopener noreferrer"')
  );
};

export const HTMLBody = ({ html }: HTMLBodyProps) => {
  const { t } = useTranslation();

  if (html) {
    return (
      <div
        className={'html-body'}
        dangerouslySetInnerHTML={{
          __html: addTargetBlankToLinks(html),
        }}
      />
    );
  }

  return (
    <div className={'html-body'}>
      <Text as="p" size="small" style={{ fontStyle: 'italic' }} className="muted-text">
        {t('uiComponents.htmlBody.emptyText')}
      </Text>
    </div>
  );
};
