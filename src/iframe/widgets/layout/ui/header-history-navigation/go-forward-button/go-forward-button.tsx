import { ArrowRightIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import { useRouter } from '@tanstack/react-router';

import { useTranslation } from '@/shared/lib/contexts';

export function GoForwardButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const canGoForward = router.history.location.state.__TSR_index < router.history.length - 1;

  const Icon = ArrowRightIcon;

  return (
    <IconButton
      size="small"
      variant="invisible"
      icon={Icon}
      onClick={() => router.history.forward()}
      aria-label={t('header.navigation.forwardButton.tooltipText')}
      disabled={!canGoForward}
    />
  );
}
