import styles from "./auth.module.scss";
import { Card, Loader } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const defaultState = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      return navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        toast.success("Login Successfully...");
        redirectUser();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successfully...");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <section className={`${styles.auth} container`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400px" />
        </div>
        <Card>
          <div className={`${styles.form}`}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                name="email"
                value={user.email}
                required
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={user.password}
                required
                placeholder="password"
                onChange={handleChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or-- </p>
            </form>
            <button
              onClick={signInWithGoogle}
              className="--btn --btn-primary --btn-danger --btn-block"
            >
              <FaGoogle style={{ marginRight: "10px" }} /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account? </p>
              <Link to="/register">Register</Link>{" "}
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
