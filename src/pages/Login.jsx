import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticateUser } from "../data/dummyUsers";

const Login = () => {
  const [error, setError] = useState(null);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      const userRole = auth.user.role;
      const roleRouteMap = {
        admin: "admin",
        user: "user",
        contractor: "contractor",
      };

      const rolePath = roleRouteMap[userRole] || "admin";
      navigate(`/${rolePath}/dashboard`, { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    const { email, password } = data;

    try {
      // Authenticate user with dummy data
      const authenticatedUser = authenticateUser(email, password);

      if (authenticatedUser) {
        // Set user data in Redux store
        dispatch(
          setUser({
            role: authenticatedUser.role,
            email: authenticatedUser.email,
            name: authenticatedUser.name,
          })
        );

        // Show success toast
        toast.success(`Welcome, ${authenticatedUser.name}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to the appropriate dashboard
        navigate(`/${authenticatedUser.route}/dashboard`);
      } else {
        // Show error toast for invalid credentials
        toast.error("Incorrect email or password. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Show error toast for any unexpected errors
      toast.error("An error occurred during login. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="login-page">
      {/* Main Container with Curved Separation */}
      <div className="login-container">
        {/* Left Panel - Green Section */}
        <div className="left-panel">
          <div className="left-content">
            {/* Logo Section */}
            <div className="logo-section">
              <div className="logo-icon">
                <div className="flame-icon">🔥</div>
        </div>
              <h1 className="brand-name">ITEC Institute</h1>
          </div>

          {/* Welcome Message */}
            <div className="welcome-section">
              <h2 className="welcome-title">Welcome Back!</h2>
              <p className="welcome-description">
                To stay connected with us please login with your personal info
              </p>
            </div>

            {/* Sign In Button */}
            <button className="signin-button">
              SIGN IN
            </button>

            {/* Footer */}
            <div className="footer-text">
              <span>CREATOR HERE</span>
              <span className="separator">|</span>
              <span>DIRECTOR HERE</span>
            </div>
          </div>
        </div>

        {/* Right Panel - White Section */}
        <div className="right-panel">
          <div className="right-content">
            {/* Title */}
            <h1 className="page-title">ITEC</h1>
            
            {/* Subtitle */}
            <p className="page-subtitle">É um prazer ter você!</p>

          {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              {/* Email Input */}
              <div className="input-group">
              <input
                type="email"
                  placeholder="Email........."
                  className="form-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                  <span className="error-text">{errors.email.message}</span>
              )}
            </div>

              {/* Password Input */}
              <div className="input-group">
              <input
                type="password"
                  placeholder="Password........."
                  className="form-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                  <span className="error-text">{errors.password.message}</span>
              )}
            </div>

              {/* Forgot Password Link */}
              <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot your password?
                </Link>
              </div>

            {/* Login Button */}
            <button
              disabled={auth.loading}
              type="submit"
                className="login-button"
            >
                {auth.loading ? "LOGGING IN..." : "LOG IN"}
            </button>

              {/* Sign Up Link */}
              <div className="signup-section">
                <p className="signup-text">
                  Don't have an account? <Link to="/signup" className="signup-link">sign up</Link>
                </p>
            </div>
          </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Custom Styles */}
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', 'Roboto', 'Inter', sans-serif;
          padding: 20px;
        }

        .login-container {
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .left-panel {
          flex: 0 0 45%;
          background: linear-gradient(135deg, #58398D 40%, #58398D 100%);
          position: relative;
          border-radius: 20px 0 0 20px;
        }

        .left-panel::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(135deg, #58398D 70%, #58398D 100%);
          border-radius: 0 50% 50% 0;
          transform: translateX(50px);
        }

        .left-content {
          padding: 60px 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .logo-section {
          margin-bottom: 40px;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .flame-icon {
          font-size: 40px;
          color: #228B22;
        }

        .brand-name {
          color: white;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          letter-spacing: 1px;
        }

        .welcome-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .welcome-title {
          color: white;
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .welcome-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          line-height: 1.5;
          margin: 0;
          max-width: 300px;
        }

        .signin-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 15px 40px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .signin-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 40px;
        }

        .separator {
          color: rgba(255, 255, 255, 0.5);
        }

        .right-panel {
          flex: 1;
          background: white;
          position: relative;
          border-radius: 0 20px 20px 0;
        }

        .right-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100%;
          background: white;
          border-radius: 50% 0 0 50%;
          transform: translateX(-50px);
        }

        .right-content {
          padding: 60px 80px 60px 120px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .page-title {
          color: #EA5B28;
          font-size: 48px;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-transform: lowercase;
        }

        .page-subtitle {
          color: #666;
          font-size: 16px;
          margin: 0 0 40px 0;
          font-weight: 400;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
          max-width: 400px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-input {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 18px 20px;
          font-size: 16px;
          color: #333;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Segoe UI', 'Roboto', 'Inter', sans-serif;
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-input:focus {
          border-color: #2E8B57;
          background: white;
          box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.1);
        }

        .error-text {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
        }

        .forgot-password {
          text-align: right;
        }

        .forgot-link {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #2E8B57;
        }

        .login-button {
          background: #EA5B28;
          border: none;
          border-radius: 15px;
          padding: 18px 30px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .login-button:hover {
          background: #228B22;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(46, 139, 87, 0.3);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .signup-section {
          text-align: center;
          margin-top: 20px;
        }

        .signup-text {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .signup-link {
          color: #2E8B57;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .signup-link:hover {
          color: #228B22;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            height: auto;
            border-radius: 15px;
          }

          .left-panel {
            flex: none;
            border-radius: 15px 15px 0 0;
          }

          .left-panel::after {
            display: none;
          }

          .right-panel {
            border-radius: 0 0 15px 15px;
          }

          .right-panel::before {
            display: none;
          }

          .right-content {
            padding: 40px 30px;
          }

          .left-content {
            padding: 40px 30px;
          }

          .welcome-title {
            font-size: 28px;
          }

          .page-title {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
