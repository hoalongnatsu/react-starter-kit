import { Avatar as A } from "antd";
import { CURRENT_ENV } from "@core/configs/env";

interface Props {
  src?: string;
  base?: boolean;
  shape?: "circle" | "square";
  size?: number;
  style?: Record<string, any>;
}

const Avatar = ({
  src,
  base = false,
  shape = "square",
  style,
  ...rest
}: Props) => {
  return (
    <A
      shape={shape}
      {...rest}
      style={style}
      src={src ? (base ? CURRENT_ENV.STORAGE_URL + src : src) : null}
    />
  );
};

export default Avatar;
