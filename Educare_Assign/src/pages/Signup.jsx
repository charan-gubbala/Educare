import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));

    const apiBase = import.meta.env.VITE_API_URL || "";

    fetch(`${apiBase}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => {});

    alert("Account Created Successfully! Check your email for the activation message.");

    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>
          Create your
          <br />
          PopX account
        </h1>

        <Input
          label="Full Name"
          required
          placeholder="Enter your name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <Input
          label="Phone number"
          required
          placeholder="Enter phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Email address"
          required
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          label="Company name"
          placeholder="Enter company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        <div className="radio-group">
          <label>
            Are you an Agency?<span>*</span>
          </label>

          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="agency"
                value="Yes"
                checked={formData.agency === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="agency"
                value="No"
                checked={formData.agency === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <Button
          text="Create Account"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Signup;