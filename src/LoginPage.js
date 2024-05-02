import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const CLIENT_ID = "b146be616aa741cc8af6f8804011cc2e";
  const REDIRECT_URI = "spotify-analysis.netlify.app";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-top-read",
    "user-follow-read",
    "user-read-recently-played",
    "user-read-currently-playing",
    "user-read-playback-state",
  ];

  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);
  const navigate = useNavigate();

  if (token) {
    navigate("/HomePage");
  }

  return (
    <div>
      <div className="bg_login_img">
        <div className="h-20 items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-row p-5 opacity-80">
          <img
            className="h-14 pl-5"
            src="/images/Logo.png"
            alt="spotify-logo"
          ></img>
          <h1 className="font-mono text-white text-4xl">
            Spotify User Analysis
          </h1>
        </div>
        <div className="flex flex-row gap-20 m-20">
          <div className=" p-10 h-500 w-300 m-10 ml-30  flex flex-col gap-4 items-center">
            <h1 className="font-mono text-black text-xl">
              Get To Know About Your Taste Of Music
            </h1>
            <img
              className="h-20"
              src="/images/LogoFull.png"
              alt="spotify-logo"
            ></img>
          </div>
          <div className="bg-white p-10 h-400 w-120 m-10 rounded flex flex-col items-center">
            <p className="font-mono text-black text-5xl m-2 font-bold">Login</p>
            <h2 className="font-mono text-black text-xl m-5">
              To See A Analysis Of Your Spotify Usage
            </h2>
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
                "%20"
              )}`}
            >
              <img
                className="h-14"
                src="/images/Login.png"
                alt="login-img"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

//add logout button in homepage that rediret=cts to loging page and sets token=""
