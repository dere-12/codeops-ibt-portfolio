import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import styles from "./Login.module.css";

function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? "/menu";

  async function handleLogin() {
    await login("0912345678");

    navigate(from, {
      replace: true,
    });
  }

  return (
    <section className={styles.loginCon}>
      <h2>Login</h2>

      <p>You need to sign in before checkout.</p>

      <button onClick={handleLogin}>Sign In</button>
    </section>
  );
}

export default Login;
