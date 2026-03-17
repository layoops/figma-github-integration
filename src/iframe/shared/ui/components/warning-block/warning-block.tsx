import { ButtonLink } from '..';
import classes from './warning-block.module.css';

export const WarningBlock = () => {
  return (
    <div className={classes['warning-block']}>
      <p>To continue using the application, please enter your access token on the Settings page.</p>
      <ButtonLink to="/settings" appearance="primary" size="large">
        Go to Settings
      </ButtonLink>
    </div>
  );
};
