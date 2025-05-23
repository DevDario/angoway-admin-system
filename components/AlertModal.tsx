import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./AlertModal.css";
import ModalButton from "./ModalButton";

interface AlertModalProps {
  text: string;
  type: "error" | "warning";
}

const AlertModal: React.FC<AlertModalProps> = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={`modal-container ${isVisible ? "visible" : "hidden"}`}>
      <div className="modal-content">
        <div className={`icon-container ${type}`}>
          <FontAwesomeIcon
            icon={type === "error" ? faTimes : faWarning}
            color="#FFF"
            width={30}
            height={30}
          />
        </div>
        <p className="modal-text">{text}</p>
        <ModalButton text="Fechar" onClick={() => setIsVisible(false)} />
      </div>
    </div>
  );
};

export default AlertModal;
