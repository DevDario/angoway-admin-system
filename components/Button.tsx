import React from "react";
import "./Button.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: IconProp;
  iconColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  icon,
  iconColor
}: ButtonProps) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ color: iconColor ? iconColor : "#0C6DFF", marginLeft:"8px"}}
          width={13}
          height={13}
        />
      )}
    </button>
  );
};

export default Button;
