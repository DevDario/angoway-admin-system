import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./SectionHeader.css";

type sectionHeaderProps = {
  icon: IconProp;
  title: string;
};

export default function SectionHeader({ icon, title }: sectionHeaderProps) {
  return (
    <div className="header-container">
      <div className="header-container-icon-box">
        <FontAwesomeIcon icon={icon} width={12} height={12} />
      </div>
      <h1 className="header-container-title">{title}</h1>
    </div>
  );
}
