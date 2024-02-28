import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [active, setactive] = useState(false);
  window.addEventListener("scroll", function () {
    if (this.window.scrollY > 10) {
      setactive(true);
    } else {
      setactive(false);
    }
  });

  const [name, setName] = useState("");
  useEffect(function () {
    async function getUser() {
      const res = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData_profile = res.data;
      setName(userData_profile.display_name);
    }
    getUser();
  }, []);

  return (
    <div>
      <div
        className={`${
          active
            ? "h-20 items-center bg-black flex flex-row p-5 w-full justify-between fixed top-0 left-0 shadow-xl"
            : "h-20 items-center bg-black flex flex-row p-5 opacity-80 justify-between"
        } z-40`}
      >
        <div className="flex flex-row">
          <img
            className="h-14 pl-5"
            src="/images/Logo.png"
            alt="spotify-logo"
          ></img>
          <h1 className="font-mono text-white text-4xl m-2">
            Welcome {name}
          </h1>
        </div>
        <div>
          <button onClick={Logout}>
            <img
              className="h-14"
              src="/images/Logout.png"
              alt="logout-button"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
