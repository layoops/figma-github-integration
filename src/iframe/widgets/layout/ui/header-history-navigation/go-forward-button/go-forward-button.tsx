import { ArrowRightIcon, SyncIcon } from '@primer/octicons-react';
import { IconButton } from '@primer/react';
import { useRouter, useRouterState } from '@tanstack/react-router';

export function GoForwardButton() {
  const router = useRouter();
  const { location } = useRouterState();

  const history = router.history;

  const stateIndexKey = '__TSR_index';
  const canGoForward = location.state[stateIndexKey] !== history.length - 1;

  const Icon = canGoForward ? ArrowRightIcon : SyncIcon;
  const ariaLabel = canGoForward ? 'Go forward' : 'Refresh page';

  const onClick = canGoForward ? () => router.history.forward() : () => router.invalidate();

  return (
    <IconButton
      size="small"
      variant="invisible"
      icon={Icon}
      onClick={onClick}
      aria-label={ariaLabel}
    />
  );
}
