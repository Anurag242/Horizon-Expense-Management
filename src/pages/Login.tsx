import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFilled = email.trim() !== "" && password.trim() !== "";

  const fillDemoData = () => {
    setEmail("demo@horizon.com");
    setPassword("DemoPassword123!");
  };

  return (
    <div className={styles.container}>
      {/* Left Pane */}
      <div className={styles.leftPane}>
        <div className={styles.leftContent}>
          <div className={styles.header}>
            <div className={styles.branding}>
              <div className={styles.logoIcon}>AP</div>
              <span className={styles.logoText}>Anchor Point</span>
            </div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Manage your expense and team in easy way</p>
          </div>
          <div className={styles.illustrationWrapper}>
            <img 
              src="/illustration.png" 
              alt="Dashboard Illustration" 
              className={styles.illustrationImage}
            />
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className={styles.rightPane}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Sign in to Dashboard</h2>
          
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input 
                type="email" 
                id="email" 
                className={styles.input} 
                placeholder="Enter email here" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  className={styles.input} 
                  placeholder="Enter password here" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <a href="#" className={styles.purpleLink}>Forgot passwod?</a>
            </div>

            <button 
              type="button" 
              className={`${styles.signInBtn} ${isFilled ? styles.signInBtnActive : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (isFilled) {
                  navigate("/dashboard");
                }
              }}
            >
              {isFilled ? "Continue" : "Sign In"}
            </button>

            <div className={styles.otpLogin}>
              <a href="#" className={styles.purpleLink}>Login in through email & OTP</a>
            </div>
          </form>

          <div className={styles.dividerContainer}>
            <div className={styles.line}></div>
            <span className={styles.dividerText}>Or Login with</span>
            <div className={styles.line}></div>
          </div>

          <div className={styles.socialLogins}>
            <button type="button" className={styles.socialBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button type="button" className={styles.socialBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1h10.5v10.5H1z" fill="#f25022"/>
                <path d="M12.5 1H23v10.5H12.5z" fill="#7fba00"/>
                <path d="M1 12.5h10.5V23H1z" fill="#00a4ef"/>
                <path d="M12.5 12.5H23V23H12.5z" fill="#ffb900"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <button 
        type="button" 
        className={styles.demoFillBtn}
        onClick={fillDemoData}
      >
        ✨ Demo Fill
      </button>
    </div>
  );
}
