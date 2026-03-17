import { AutoLayout, Line } from '../../../../widget-components';
import { Button } from '../button';

interface TabProps extends AutoLayoutProps {
  text: string;
  state: 'default' | 'selected';
}

export const Tab = ({ state, text, ...rest }: TabProps) => {
  return (
    <AutoLayout name="Tab" direction="vertical" spacing={8} {...rest} width="hug-contents">
      <Button
        fontWeight="semi-bold"
        onClick={() => {}}
        appearance="ghost"
        width="hug-contents"
        size="extra-small"
        text={text}
      />
      <Line
        opacity={state !== 'selected' ? 0 : 1}
        stroke={'#EA9375'}
        strokeWidth={2}
        length={'fill-parent'}
      />
    </AutoLayout>
  );
};
