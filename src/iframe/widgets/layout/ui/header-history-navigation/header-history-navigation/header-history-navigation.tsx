import { GoBackButton } from '../go-back-button';
import { GoForwardButton } from '../go-forward-button';
import { LinkToHomePage } from '../link-to-home-page';
import classes from './header-history-navigation.module.css';

export const HeaderHistoryNavigation = () => {
  return (
    <div className={classes['header-history-navigation']}>
      <LinkToHomePage />
      <GoBackButton />
      <GoForwardButton />
    </div>
  );
};
