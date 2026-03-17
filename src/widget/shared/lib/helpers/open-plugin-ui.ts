import { waitForTask } from '../../../widget-components';

export const openPluginUI = (input: {
  routeName: string;
  props: any;
  other?: Record<string, any>;
  options: Pick<ShowUIOptions, 'visible'>;
}) => {
  const {
    routeName,
    props,
    options: { visible },
    other,
  } = input;
  waitForTask(
    new Promise(() => {
      figma.showUI(`${__uiFiles__['main']}`, {
        width: 440,
        height: 540,
        visible,
      });
      figma.ui.postMessage(
        { type: 'route-update', data: { route: routeName, props }, ...other },
        { origin: '*' }
      );
    })
  );
};
