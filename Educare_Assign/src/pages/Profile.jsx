import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "",
    email: "",
  };

  return (
    <div className="profile-page">
      <div className="header">
        <h2>Account Settings</h2>
      </div>

      <div className="profile-content">
        <div className="profile-top">
          <div className="avatar">
            {(user.fullName || "U")
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="user-info">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <p className="description">
      Welcome to PopX!
Your profile has been created successfully. Explore the app, manage your account, and personalize your experience anytime.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Button
            text="Logout"
            variant="secondary"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;