import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AlertChip.css";

type AlertChipProps = {
  id: number;
  message: string;
  timestamp: string;
  onClick: () => void;
};

export default function AlertChip({
  id,
  message,
  timestamp,
  onClick,
}: AlertChipProps) {
  return (
    <div className="alert-chip">
      <div className="alert-chip-container">
        <div className="alert-id-box">
          <h1 className="alert-id">#{id}</h1>
        </div>
        <div className="alert-message-body">
          <p className="alert-message">{message}</p>
        </div>
        <div className="alert-timestamp-body">
          <h2 className="alert-timestamp">{timestamp}</h2>
          <button
            className="alert-view-button"
            title="visualizar"
            onClick={onClick}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              width={15}
              height={15}
              color="#FCFCFB"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
