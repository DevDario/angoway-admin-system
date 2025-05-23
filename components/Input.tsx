import { Controller } from "react-hook-form";
import "./Input.css";

type InputProps = {
  name: string;
  control: any;
  placeholder: string;
  error?: string;
  type: string;
};

const Input: React.FC<InputProps> = ({
  name,
  control,
  placeholder,
  error,
  type,
}) => {
  return (
    <div className="input-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder={placeholder}
            type={type}
            className={`input ${error ? "input-error" : ""}`}
          />
        )}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
