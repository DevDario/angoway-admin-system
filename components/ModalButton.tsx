import "./ModalButton.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button className="modal-button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
