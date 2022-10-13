import { StyleProp, TextStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style?: StyleProp<TextStyle>;
  size?: number;
};

const Icon = (props: IconProps) => {
  const { style, size, ...rest } = props;
  return (
    <FontAwesome
      size={size ?? 30}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
};

export default Icon;
