import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { Card, Loader } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const defaultState = {
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [user, setUser] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, cPassword } = user;
    if (password !== cPassword) {
      toast.error("Password do not match");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        toast.success("Your account has been created successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <section className={`${styles.auth} container`}>
        <Card>
          <div className={`${styles.form}`}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
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
              <input
                type="password"
                name="cPassword"
                value={user.cPassword}
                required
                placeholder="Confirm password"
                onChange={handleChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to="/login"> Login</Link>{" "}
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width="400px" />
        </div>
      </section>
    </>
  );
};

export default Register;
