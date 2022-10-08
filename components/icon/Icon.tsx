import { StyleProp, TextStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  style?: StyleProp<TextStyle>;
};

const Icon = (props: IconProps) => {
  const {style, ...rest} = props;
  return (
    <FontAwesome size={30} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
};

export default Icon;
