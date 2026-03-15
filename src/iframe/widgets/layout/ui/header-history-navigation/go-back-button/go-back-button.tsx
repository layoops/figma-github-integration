import { ArrowLeftIcon, MarkGithubIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import { Link, useCanGoBack, useNavigate, useRouter, useRouterState } from '@tanstack/react-router';

import { useTranslation } from '@/shared/lib/contexts';

import classes from './go-back-button.module.css';

export function GoBackButton() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const { t } = useTranslation();

  const handleGoBack = () => {
    if (canGoBack) {
      router.history.back();
    } else {
      navigate({ to: '/', replace: true });
    }
  };

  if (!canGoBack || location.pathname === '/') {
    return (
      <Link to="/" className={classes.logo}>
        <MarkGithubIcon size={28} />
      </Link>
    );
  }

  return (
    <IconButton
      size="small"
      variant="invisible"
      icon={ArrowLeftIcon}
      onClick={handleGoBack}
      aria-label={t('header.navigation.backButton.tooltipText')}
    />
  );
}
