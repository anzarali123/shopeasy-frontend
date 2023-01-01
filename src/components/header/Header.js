import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hidden links/HiddenLinks";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const logo = (
  <Link to="/">
    <h2>
      shop<span>Easy</span>
    </h2>
  </Link>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ``);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const fixNavbar = () => {
    if (window.scrollY > 50) setScrollPage(true);
    else setScrollPage(false);
  };

  window.addEventListener("scroll", fixNavbar);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName(null);
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setLoading(false);
        toast.success("Signout Successfull...");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          <div className={styles.logo}>{logo}</div>
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo} <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <AdminOnlyLink>
                  <Link to="/admin/home">
                    <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>
              </li>

              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to="/contact">
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink className={activeLink} to="/login">
                    Login
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>
                </ShowOnLogin>

                <ShowOnLogin>
                  <NavLink className={activeLink} to="/order-history">
                    My Orders
                  </NavLink>
                </ShowOnLogin>

                <ShowOnLogin>
                  <NavLink onClick={logoutUser}>Logout</NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
