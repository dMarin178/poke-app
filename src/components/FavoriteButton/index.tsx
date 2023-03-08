import { Button } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { MouseEventHandler } from "react";

type Props = {
  isFavorite: boolean | undefined;
  onClick: () => (MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>) | undefined;
};

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  const Icon: any = !isFavorite ? StarOutlined : StarFilled;

  return <Button icon={<Icon />} onClick={onClick} />;
};

export default FavoriteButton;
