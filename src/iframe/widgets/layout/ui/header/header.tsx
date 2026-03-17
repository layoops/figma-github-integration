import { useRef, useState } from 'react';
import { GearIcon, PencilIcon, PersonIcon, SignOutIcon } from '@primer/octicons-react';
import { ActionList, ActionMenu, Avatar, IconButton, LinkButton, Tooltip } from '@primer/react';
import { useHotkey } from '@tanstack/react-hotkeys';
import { Link, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';

import { useRevokeAccess } from '@/features/auth';
import { SearchEntityForm } from '@/features/search';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';
import { useKeyboardShortcuts } from '@/shared/lib/hooks/use-keyboard-shortcuts';

import { HeaderHistoryNavigation } from '../header-history-navigation';
import classes from './header.module.css';

export const Header = () => {
  const { t } = useTranslation();
  const { viewer, githubAccessToken, isLoading } = useAppContext();
  const revokeAccess = useRevokeAccess();

  const prevFocusedElementRef = useRef<HTMLElement | null>(null);
  const searchEntityFormRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement | null>(null);

  const { location } = useRouterState();

  const isHome = location.pathname === '/';
  const hasAccessToken = Boolean(githubAccessToken);
  const hasViewer = Boolean(githubAccessToken);

  useKeyboardShortcuts(searchInputRef, prevFocusedElementRef);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const showSearch = !isHome && githubAccessToken;

  useHotkey(
    'Escape',
    () => {
      searchInputRef.current?.blur();

      if (prevFocusedElementRef.current) {
        prevFocusedElementRef.current.focus();
        prevFocusedElementRef.current = null;
      }
    },
    { target: searchEntityFormRef }
  );

  return (
    <header className={clsx(classes.header, isSearchFocused && classes['header-search-focused'])}>
      <div className={clsx(classes['left-part'], isSearchFocused && classes['side-hidden'])}>
        {githubAccessToken && <HeaderHistoryNavigation />}
      </div>
      <div
        ref={searchEntityFormRef}
        className={clsx(classes['search-wrapper'])}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsSearchFocused(false);
          }
        }}
      >
        {showSearch && <SearchEntityForm ref={searchInputRef} size="small" />}
      </div>
      <div className={clsx(classes['right-part'], isSearchFocused && classes['side-hidden'])}>
        {!isLoading && !hasViewer && (
          <LinkButton size="small" variant="invisible" as={Link} to={ROUTES_MAP[ROUTES.AUTH]}>
            {t('header.signInButton.title')}
          </LinkButton>
        )}
        <ActionMenu>
          <ActionMenu.Anchor>
            {viewer?.login ? (
              <Tooltip text={t('header.menu.anchorButton.tooltipText')} type="description">
                <button type="button" className={classes['avatar-button']}>
                  <Avatar size={28} src={viewer?.avatarUrl} />
                </button>
              </Tooltip>
            ) : (
              <IconButton
                size="small"
                disabled={isLoading}
                icon={hasAccessToken ? GearIcon : PersonIcon}
                aria-label={t('header.menu.anchorButton.tooltipText')}
              />
            )}
          </ActionMenu.Anchor>

          <ActionMenu.Overlay width="medium" style={{ zIndex: 5 }}>
            <ActionList>
              {hasViewer && (
                <ActionList.LinkItem as={Link} to={ROUTES_MAP[ROUTES.SETTINGS]}>
                  {t('header.menu.items.settings.title')}
                  <ActionList.LeadingVisual>
                    <GearIcon />
                  </ActionList.LeadingVisual>
                </ActionList.LinkItem>
              )}
              <ActionList.LinkItem as={Link} to={ROUTES_MAP[ROUTES.DOCS]}>
                {t('header.menu.items.documentation.title')}
                <ActionList.LeadingVisual>
                  <PencilIcon />
                </ActionList.LeadingVisual>
              </ActionList.LinkItem>
              {hasViewer && (
                <>
                  <ActionList.Divider />
                  <ActionList.Item variant="danger" onSelect={revokeAccess}>
                    {t('header.menu.items.signOut.title')}
                    <ActionList.LeadingVisual>
                      <SignOutIcon />
                    </ActionList.LeadingVisual>
                  </ActionList.Item>
                </>
              )}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </div>
    </header>
  );
};
