import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
    acceptTerms: false,
  });
  const { signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    const payload = {
      ...formData,
      name: formData.firstName + formData.lastName,
    };
    console.log(payload);
    try {
      await signup(payload);
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  };

  const signupBoxStyle = {
    backgroundColor: "rgba(252, 251, 248, 0.95)",
    borderRadius: "12px",
    padding: "48px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(166, 144, 89, 0.2)",
    overflowY: "auto",
    maxHeight: "90vh",
  };

  const inputContainerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "1px solid rgba(166, 144, 89, 0.3)",
    borderRadius: "8px",
    fontSize: "0.95rem",
    backgroundColor: "white",
    transition: "all 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={signupBoxStyle}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                letterSpacing: "0.3em",
                color: "#161513",
              }}
            >
              LUXE
            </h1>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#7c786e",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Join Our Exclusive Circle
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#a69059",
              fontStyle: "italic",
            }}
          >
            Create your account for personalized service
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#161513",
                  marginBottom: "6px",
                }}
              >
                First Name *
              </label>
              <div style={inputContainerStyle}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    left: "16px",
                    color: "#a69059",
                    opacity: 0.6,
                  }}
                />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                  }
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#161513",
                  marginBottom: "6px",
                }}
              >
                Last Name *
              </label>
              <div style={inputContainerStyle}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    left: "16px",
                    color: "#a69059",
                    opacity: 0.6,
                  }}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                  }
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#161513",
                marginBottom: "6px",
              }}
            >
              Email Address *
            </label>
            <div style={inputContainerStyle}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "16px",
                  color: "#a69059",
                  opacity: 0.6,
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                }
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#161513",
                  marginBottom: "6px",
                }}
              >
                Phone Number
              </label>
              <div style={inputContainerStyle}>
                <Phone
                  size={18}
                  style={{
                    position: "absolute",
                    left: "16px",
                    color: "#a69059",
                    opacity: 0.6,
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                  }
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#161513",
                  marginBottom: "6px",
                }}
              >
                Birth Date
              </label>
              <div style={inputContainerStyle}>
                <Calendar
                  size={18}
                  style={{
                    position: "absolute",
                    left: "16px",
                    color: "#a69059",
                    opacity: 0.6,
                  }}
                />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                  }
                />
              </div>
              <p
                style={{ fontSize: "0.7rem", color: "#999", marginTop: "4px" }}
              >
                For personalized birthday offers
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#161513",
                marginBottom: "6px",
              }}
            >
              Password *
            </label>
            <div style={inputContainerStyle}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "16px",
                  color: "#a69059",
                  opacity: 0.6,
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength="8"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#a69059",
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p style={{ fontSize: "0.7rem", color: "#999", marginTop: "4px" }}>
              Minimum 8 characters with letters and numbers
            </p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#161513",
                marginBottom: "6px",
              }}
            >
              Confirm Password *
            </label>
            <div style={inputContainerStyle}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "16px",
                  color: "#a69059",
                  opacity: 0.6,
                }}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#a69059",
                  opacity: 0.6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "16px",
              }}
            >
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#a69059",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <span>
                Yes, I'd like to receive exclusive offers, style tips, and early
                access to new collections via email.
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#a69059",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <span>
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => navigate("/terms")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#a69059",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => navigate("/privacy")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#a69059",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </button>
                . *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: "#a69059",
              color: "white",
              border: "none",
              padding: "16px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.2s ease",
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading)
                e.target.style.backgroundColor = "rgba(166, 144, 89, 0.9)";
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.target.style.backgroundColor = "#a69059";
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid white",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <p
            style={{ fontSize: "0.875rem", color: "#666", marginBottom: "8px" }}
          >
            Already have an account?
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.875rem",
              color: "#a69059",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Sign in to your account
          </button>
        </div>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(166, 144, 89, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#a69059",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            Benefits of joining LUXE:
          </p>
          <ul
            style={{
              fontSize: "0.75rem",
              color: "#666",
              paddingLeft: "20px",
              lineHeight: 1.6,
            }}
          >
            <li>Exclusive member-only offers</li>
            <li>Early access to new collections</li>
            <li>Personalized style recommendations</li>
            <li>Free shipping on all orders</li>
            <li>Birthday surprise gift</li>
            <li>Priority customer service</li>
          </ul>
        </div>
      </div>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SignupPage;
