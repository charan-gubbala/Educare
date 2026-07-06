import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <div className="landing-content">

        <div className="bottom-content">

          <h1>Welcome to PopX</h1>

          <p>
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit.
          </p>

          <Button
            text="Create Account"
            onClick={() => navigate("/signup")}
          />

          <div style={{ height: "12px" }} />

          <Button
            text="Already Registered? Login"
            variant="secondary"
            onClick={() => navigate("/login")}
          />

        </div>

      </div>

    </div>
  );
};

export default Landing;