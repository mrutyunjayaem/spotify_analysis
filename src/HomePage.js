import React, { useEffect, useState } from "react";
//import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

function HomePage() {
  const [top_artist, setArtist] = useState([]);
  const [top_tracks, setTracks] = useState([]);
  const [recent_tracks, setRecentTracks] = useState([]);
  const [follow_artists, setFollowArtists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [artistRes, tracksRes, recentTracksRes, followArtistsRes] =
          await Promise.all([
            axios.get(
              "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.get(
              "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.get(
              "https://api.spotify.com/v1/me/player/recently-played?limit=10",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ),
            axios.get("https://api.spotify.com/v1/me/following?type=artist", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
          ]);
        setArtist(artistRes.data.items.slice(0, 5));
        setTracks(tracksRes.data.items.slice(0, 5));
        setRecentTracks(recentTracksRes.data.items.slice(0, 5));
        setFollowArtists(followArtistsRes.data.artists.items.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg_hp_img ">
        <Header />
        <div className="m-5">
          <h2 className="text-start font-mono font-bold mt-0">
            Your Current Top Songs
          </h2>
          <div className="flex flex justify-around">
            {top_tracks.map((track, index) => (
              <div
                key={index}
                className="bg-black h-80 w-64 m-3 border border-black items-center"
              >
                <img
                  className="m-10 size-40"
                  src={track?.album?.images[1]?.url}
                  alt="song-cover"
                />
                <p className="text-white font-mono m-10 text-2xl text-center text-ellipsis line-clamp-2">
                  {track?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-start font-mono font-bold mt-0 ml-10">
            Your Current Top Artists
          </h2>
          <div className="flex flex-row">
            <div>
              <div className="bg-black h-48 w-96 m-10 flex flex justify-around gap-3 rounded-[10px]">
                <div>
                  <img
                    src={top_artist[0]?.images[2]?.url}
                    className="my-10 m-3"
                    alt="artist-img"
                  ></img>
                </div>
                <div className="my-10 m-3">
                  <p className="font-mono text-white">{top_artist[0]?.name}</p>
                  <p className="font-mono text-white">
                    Popularity : {top_artist[0]?.popularity}
                  </p>
                  <p className="font-mono text-white">
                    Genres :{top_artist[0]?.genres[0]}
                  </p>
                </div>
              </div>
              <div className="bg-black h-48 w-96 m-10 flex flex justify-around gap-3 rounded-[10px]">
                <div>
                  <img
                    src={top_artist[2]?.images[2]?.url}
                    className="my-10 m-3"
                    alt="artist-img"
                  ></img>
                </div>
                <div className="my-10 m-3">
                  <p className="font-mono text-white">{top_artist[2]?.name}</p>
                  <p className="font-mono text-white">
                    Popularity : {top_artist[2]?.popularity}
                  </p>
                  <p className="font-mono text-white">
                    Genres :{top_artist[2]?.genres[0]}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-black h-48 w-96 m-10 flex flex justify-around gap-3 rounded-[10px]">
                <div>
                  <img
                    src={top_artist[1]?.images[2]?.url}
                    className="my-10 m-3"
                    alt="artist-img"
                  ></img>
                </div>
                <div className="my-10 m-3">
                  <p className="font-mono text-white">{top_artist[1]?.name}</p>
                  <p className="font-mono text-white">
                    Popularity : {top_artist[1]?.popularity}
                  </p>
                  <p className="font-mono text-white">
                    Genres :{top_artist[1]?.genres[0]}
                  </p>
                </div>
              </div>

              <div className="bg-black h-48 w-96 m-10 flex flex justify-around gap-3 rounded-[10px]">
                <div>
                  <img
                    src={top_artist[3]?.images[2]?.url}
                    className="my-10 m-3"
                    alt="artist-img"
                  ></img>
                </div>
                <div className="my-10 m-3">
                  <p className="font-mono text-white">{top_artist[3]?.name}</p>
                  <p className="font-mono text-white">
                    Popularity : {top_artist[3]?.popularity}
                  </p>
                  <p className="font-mono text-white">
                    Genres :{top_artist[3]?.genres[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg_2">
        <div>
          <div className="mt-20">
            <h2 className="fancy font-mono">Recently Played Tracks</h2>
            <div className="flex justify-around m-3">
              {recent_tracks.map((track, index) => (
                <div
                  key={index}
                  className="bg-black h-80 w-64 m-3 rounded-[35px] items-center hover:shadow-xl"
                >
                  <img
                    className="m-10 size-40"
                    src={track?.track?.album?.images[1]?.url}
                    alt="song-cover"
                  />
                  <p className="text-white font-mono m-10 text-2xl text-center text-ellipsis line-clamp-2">
                    {track?.track?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 ">
          <h2 className="fancy font-mono">Artists You Follow</h2>
          <div className="flex justify-center">
            {follow_artists.map((artist, index) => (
              <div key={index} className="bg-black h-80 w-64 m-3">
                <img
                  className="m-5 size-40"
                  src={artist?.images[2]?.url}
                  alt="ArtistImage"
                />
                <h1 className="text-white font-mono text-xl text-center">
                  {artist?.name}
                </h1>
              </div>
            ))}
          </div>

          <div className="font-mono text-black no-underline text-xl text-center hover:font-bold cursor-pointer ">
            <Link to="/AritstsFollowedPage">&lt;VIEW ALL&gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
