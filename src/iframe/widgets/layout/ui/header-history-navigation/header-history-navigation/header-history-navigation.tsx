import { GoBackButton } from '../go-back-button';
import classes from './header-history-navigation.module.css';
export const HeaderHistoryNavigation = () => {
  return (
    <div className={classes['header-history-navigation']}>
      <GoBackButton />
      {/* <GoForwardButton /> */}
    </div>
  );
};
