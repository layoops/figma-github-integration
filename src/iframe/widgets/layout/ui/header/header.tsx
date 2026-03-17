import { GithubUser } from '../github-user';
import { PageNavigation } from '../page-navigation';
import classes from './header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <GithubUser />
      <PageNavigation />
    </header>
  );
};
