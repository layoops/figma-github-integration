import { clsx } from 'clsx';

import classes from './form-title.module.css';

interface FormTitleProps {
  text: string;
}

export const FormTitle = ({ text }: FormTitleProps) => {
  return (
    <div className={clsx(classes['form-title'])}>
      <span>{text}</span>
    </div>
  );
};
