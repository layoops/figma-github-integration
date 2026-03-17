import { clsx } from 'clsx';

import classes from './github-entity-title.module.css';

interface GithubEntityTitleProps {
  login: string;
  title?: string;
  href?: string;
}

export const GithubEntityTitle = ({ login, title, href }: GithubEntityTitleProps) => {
  return (
    <div className={clsx(classes['project-title'])}>
      <span>{login}</span>
      <span>/</span>
      <span>
        {href ? (
          <a className={classes['project-title-link']} href={href}>
            {title}
          </a>
        ) : (
          <strong className={classes['project-title-strong']}>{title}</strong>
        )}
      </span>
    </div>
  );
};
