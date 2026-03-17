import { waitForTask } from '../../../widget-components';

export const setAsyncStorage = ({
  key,
  value,
  close = false,
}: {
  key: string;
  value: any;
  close?: boolean;
}) => {
  waitForTask(
    new Promise((resolve) => {
      setTimeout(async () => {
        await figma.clientStorage.setAsync(key, value);
        close && figma.closePlugin();
        resolve(null);
      }, 0);
    })
  );
};
