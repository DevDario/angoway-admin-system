import "./DashboardDataCard.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type dataCardProps = {
  label: string;
  value: string | number;
  icon?: IconProp;
  iconColor?: string;
};

export default function DashboardDataCard({
  label,
  value,
  icon,
  iconColor,
}: dataCardProps) {
  return (
    <div className="data-card-container">
      <div className="data-label">
        <div className="icon-box">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              style={{
                color: iconColor ? iconColor : "#FFF",
              }}
              width={12}
              height={12}
            />
          )}
        </div>
        <p className="label">{label}</p>
      </div>
      <div className="data">
        <h2 className="data-value">{value}</h2>
      </div>
    </div>
  );
}
