import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const { userLogin, admiLogin } = useAuthStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
        rememberMe,
        type: isAdminLogin ? "admin" : "client",
      };

      if (isAdminLogin) {
        await admiLogin(payload);
        navigate("/admin/dashboard");
        setIsLoading(false);
      } else {
        await userLogin(payload);
        navigate("/user-page");
        setIsLoading(false);
      }
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
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
  };

  const loginBoxStyle = {
    backgroundColor: "rgba(252, 251, 248, 0.95)",
    borderRadius: "12px",
    padding: "48px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(166, 144, 89, 0.2)",
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        {/* Brand Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={28} color="#a69059" />
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
              marginBottom: "8px",
            }}
          >
            {isAdminLogin ? "Admin Portal" : "Client Portal"}
          </p>

          {/* Login Type Toggle */}
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(166, 144, 89, 0.1)",
              borderRadius: "8px",
              padding: "4px",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <button
              type="button"
              onClick={() => setIsAdminLogin(false)}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: !isAdminLogin ? "#a69059" : "transparent",
                color: !isAdminLogin ? "white" : "#666",
                fontSize: "0.75rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <Users size={14} />
              Client
            </button>
            <button
              type="button"
              onClick={() => setIsAdminLogin(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: isAdminLogin ? "#a69059" : "transparent",
                color: isAdminLogin ? "white" : "#666",
                fontSize: "0.75rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <Shield size={14} />
              Admin
            </button>
          </div>
        </div>

        {/* Admin Notice */}
        {isAdminLogin && (
          <div
            style={{
              backgroundColor: "rgba(166, 144, 89, 0.1)",
              border: "1px solid rgba(166, 144, 89, 0.3)",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "24px",
              fontSize: "0.75rem",
              color: "#666",
              textAlign: "center",
            }}
          >
            <Shield
              size={14}
              style={{
                marginBottom: "4px",
                display: "block",
                margin: "0 auto 4px",
              }}
            />
            <strong>Admin Access Only</strong>
            <div style={{ fontSize: "0.7rem", marginTop: "2px" }}>
              Restricted to authorized personnel only
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#161513",
                marginBottom: "8px",
              }}
            >
              {isAdminLogin ? "Admin Email" : "Email Address"}
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Mail
                size={20}
                style={{
                  position: "absolute",
                  left: "16px",
                  color: "#a69059",
                  opacity: 0.6,
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdminLogin ? "admin@luxe.com" : "your@email.com"}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  border: "1px solid rgba(166, 144, 89, 0.3)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "white",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a69059")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(166, 144, 89, 0.3)")
                }
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#161513",
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "0.75rem",
                  color: "#a69059",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Lock
                size={20}
                style={{
                  position: "absolute",
                  left: "16px",
                  color: "#a69059",
                  opacity: 0.6,
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 48px",
                  border: "1px solid rgba(166, 144, 89, 0.3)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "white",
                  transition: "all 0.2s ease",
                }}
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
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#a69059",
                }}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: isAdminLogin ? "#1f1f1f" : "#a69059",
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
                e.target.style.backgroundColor = isAdminLogin
                  ? "rgba(31, 31, 31, 0.9)"
                  : "rgba(166, 144, 89, 0.9)";
            }}
            onMouseLeave={(e) => {
              if (!isLoading)
                e.target.style.backgroundColor = isAdminLogin
                  ? "#1f1f1f"
                  : "#a69059";
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
                {isAdminLogin ? "Admin Sign In..." : "Signing In..."}
              </>
            ) : isAdminLogin ? (
              "Admin Sign In"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign Up Link - Only show for client login */}
        {!isAdminLogin && (
          <div className="flex mt-6 items-center gap-1 justify-center">
            <p
              style={{
                fontSize: "0.875rem",
                color: "#666",
                marginBottom: "8px",
              }}
            >
              Don't have an account?
            </p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
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
              Create your LUXE account
            </button>
          </div>
        )}

        {/* Admin Info - Only show for admin login */}
        {isAdminLogin && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "0.75rem", color: "#999" }}>
              <strong>Default Admin Credentials:</strong>
              <br />
              Email: admin@luxe.com
              <br />
              Password: admin123
            </p>
          </div>
        )}

        {/* Terms */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(166, 144, 89, 0.1)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#999",
              lineHeight: 1.5,
            }}
          >
            By signing in, you agree to our{" "}
            <button
              type="button"
              onClick={() => navigate("/terms")}
              style={{
                background: "none",
                border: "none",
                color: "#a69059",
                cursor: "pointer",
                fontSize: "0.75rem",
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
                fontSize: "0.75rem",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </button>
          </p>
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

export default LoginPage;
