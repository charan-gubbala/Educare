import "./Button.css";

const Button = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant}`}
      onClick={variant === "disabled" ? undefined : onClick}
      disabled={variant === "disabled"}
    >
      {text}
    </button>
  );
};

export default Button;