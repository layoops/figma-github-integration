import { MarkGithubIcon } from '@primer/octicons-react';
import { Link } from '@tanstack/react-router';

import classes from './link-to-home-page.module.css';

export const LinkToHomePage = () => {
  return (
    <Link to="/" className={classes['link-to-home-page']}>
      <MarkGithubIcon size={28} />
    </Link>
  );
};
