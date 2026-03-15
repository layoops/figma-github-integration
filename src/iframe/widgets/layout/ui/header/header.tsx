import { GearIcon, PencilIcon, PersonIcon, SignOutIcon } from '@primer/octicons-react';
import { ActionList, ActionMenu, Avatar, IconButton, LinkButton, Tooltip } from '@primer/react';
import { Link, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';

import { useRevokeAccess } from '@/features/auth';
import { SearchEntityForm } from '@/features/search';
import { ROUTES, ROUTES_MAP } from '@/global-shared/routes-map';
import { useAppContext, useTranslation } from '@/shared/lib/contexts';

import { HeaderHistoryNavigation } from '../header-history-navigation';
import classes from './header.module.css';

export const Header = () => {
  const { t } = useTranslation();
  const { viewer, githubAccessToken, isLoading } = useAppContext();
  const revokeAccess = useRevokeAccess();

  const { location } = useRouterState();
  const isHome = location.pathname === '/';
  const hasAccessToken = Boolean(githubAccessToken);
  const hasViewer = Boolean(githubAccessToken);

  return (
    <header className={clsx(classes.header)}>
      <div className={classes['left-part']}>{githubAccessToken && <HeaderHistoryNavigation />}</div>
      <div className={clsx(classes['search-wrapper'])}>
        {!isHome && githubAccessToken && <SearchEntityForm size="small" />}
      </div>
      <div className={classes['right-part']}>
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

          <ActionMenu.Overlay width="medium">
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
