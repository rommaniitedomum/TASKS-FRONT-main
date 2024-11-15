import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navMenus } from "../utils/data";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";

{
  /* <RiLoginBoxFill />  <RiLogoutBoxFill />*/
}

// 구글 로그인 절차
// 1. 구글 클라이언트 ID 발급
// 2. @react-oauth/google 라이브러리 설치 및 임포트
// 3. GoogleOAuthProvider 컴포넌트로 로그인 버튼 감싸기
// 4. clientId props로 구글 클라이언트 ID 전달
// 5. GoogleLogin 컴포넌트로 요청 및 응답 로직 처리
// 6. onSucess, onError 콜백 함수로 로그인 성공 및 실패 처리

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const user = useSelector((state) => state.auth.authData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { given_name } = user || {};
  const [authSign, setAuthSign] = useState(
    window.innerWidth < 1024 ? (
      <RiLoginBoxFill />
    ) : (
      <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm">Google Login</span>
      </button>
    )
  );

  const handleAuthSign = () => {
    if (window.innerWidth < 1024) {
      setAuthSign(<RiLoginBoxFill />);
    } else {
      setAuthSign(
        <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm">Google Login</span>
        </button>
      );
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleAuthSign);

    // clean up
    return () => {
      window.removeEventListener("resize", handleAuthSign);
    };
  }, []);

  const handleLoginSucess = useCallback(
    (response) => {
      try {
        const decoded = jwtDecode(response.credential);
        dispatch(login({ authData: decoded }));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Login Handling Error: ", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  const handleLoginError = (error) => {
    console.log("error: ", error);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuthenticated(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl hidden lg:block">
          <Link to="/">MARSHALL</Link>
        </h2>
      </div>

      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300 ${
              menu.idx === menuIdx ? "bg-gray-950" : ""
            }`}
          >
            <Link
              to={menu.to}
              className="flex gap-4 items-center py-2 lg:px-10 px-2"
            >
              {menu.icon} <span className="hidden lg:inline">{menu.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {isAuthenticated ? (
        <div className="w-4/5 flex justify-center">
          <button
            className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full"
            onClick={handleLogoutClick}
          >
            <FcGoogle className="w-5 h-5 hidden lg:inline" />
            <span className="text-sm">
              <span className="hidden lg:inline">{given_name}님 </span>Logout
            </span>
          </button>
        </div>
      ) : (
        <div className="w-4/5 flex justify-center login-btn">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleLoginSucess}
              onError={handleLoginError}
            />
            {authSign}
          </GoogleOAuthProvider>
        </div>
      )}
    </nav>
  );
};

export default Navbar;