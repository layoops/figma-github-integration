import { ArrowLeftIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import { useCanGoBack, useRouter } from '@tanstack/react-router';

import { useTranslation } from '@/shared/lib/contexts';

export function GoBackButton() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { t } = useTranslation();

  const handleGoBack = () => {
    if (canGoBack) {
      router.history.back();
    }
  };

  return (
    <IconButton
      disabled={!canGoBack}
      size="small"
      variant="invisible"
      icon={ArrowLeftIcon}
      onClick={handleGoBack}
      aria-label={t('header.navigation.backButton.tooltipText')}
    />
  );
}
