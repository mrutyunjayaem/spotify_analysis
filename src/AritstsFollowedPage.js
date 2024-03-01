import React, { useState, useEffect } from "react";
import fetchFollowedArtists from "./ArtistsFollowed";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";

// (async () => {
//     const followedArtists = await fetchFollowedArtists(localStorage.getItem("token"));
//     console.log("Followed Artists:", followedArtists);
// })();

function ArtistsFollowedPage() {
  const [followedArtists, setFollowedArtists] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      const artists = await fetchFollowedArtists(localStorage.getItem("token"));
      setFollowedArtists(artists);
    }
    fetchArtists();
  }, []);

  const FetchArtistInfo = ([artistName, artistID, artistImageURL]) => {
    setArtistInfo([artistName, artistID, artistImageURL]);
  };

  const [AboutArtist, setAboutArtist] = useState([]);
  const [Artist_Top_Tracks, setArtistTopTracks] = useState([]);
  useEffect(
    function () {
      async function getAboutArtist(id) {
        const FullURL1 = "https://api.spotify.com/v1/artists/" + id;
        const res1 = await axios.get(FullURL1, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const FullURL2 = FullURL1 + "/top-tracks?market=ES";
        const res2 = await axios.get(FullURL2, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const about_artist = res1.data;
        const artist_top_tracks = res2.data.tracks;
        setAboutArtist(() => {
          return [
            about_artist.followers.total,
            about_artist.popularity,
            about_artist.uri,
            about_artist.genres,
          ];
        });
        setArtistTopTracks(() => {
          return [
            artist_top_tracks[0].name,
            artist_top_tracks[1].name,
            artist_top_tracks[2].name,
          ];
        });
      }
      if (artistInfo[1]) {
        getAboutArtist(artistInfo[1]);
      }
    },
    [artistInfo]
  );

  return (
    <div className="bg_1">
      <Header />
      <h1 className="text-center font-mono font-bold m-10 text-4xl">
        Artists You Follow
      </h1>

      <div className="flex flex-row">
        <div className="flex flex-col gap-2 max-h-[26rem] overflow-y-scroll scroll-smooth ">
          {followedArtists.map((artist, index) => (
            <div
              key={index}
              className="h-24 w-96 mx-20 bg-white shadow-md flex justify-between"
            >
              <img
                src={artist[2]}
                alt="artistImage"
                className="size-20 mx-3 rounded-full my-2"
              />
              <div className="flex flex-col gap-2 items-stretch grow">
                <h1 className="font-mono text-2xl text-black font-bold m-2 text-center">
                  {artist[0]}
                </h1>
                <p
                  className="font-mono text-black hover:font-bold hover:text-lg text-center cursor-pointer"
                  onClick={() =>
                    FetchArtistInfo([artist[0], artist[1], artist[2]])
                  }
                >
                  View More
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-3/5 h-[30rem] rounded-lg bg-white shadow-lg p-10">
          {artistInfo[0] ? (
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-black font-mono m-3 font-medium">
                  About Artist
                </h1>
                <p className="text-black font-mono">Name : {artistInfo[0]}</p>
                <p className="text-black font-mono">
                  followers : {AboutArtist[0]}
                </p>
                <p className="text-black font-mono">
                  genres :{" "}
                  {AboutArtist[3]?.length > 0
                    ? AboutArtist[3]?.length >= 3
                      ? AboutArtist[3].slice(0, 3).join(", ")
                      : AboutArtist[3].join(", ")
                    : "null"}
                </p>
                <p className="text-black font-mono">
                  Popularity Score(100) : {AboutArtist[1]}
                </p>
                <div className="flex flex-row">
                  <p className="text-black font-mono">Spotify Page :</p>
                  <a
                    href={AboutArtist[2]}
                    className="text-blue font-mono hover:font-bold"
                  >
                    {AboutArtist[2]}
                  </a>
                </div>
                <p className="text-black font-mono">Current Top Tracks :</p>
                <p className="text-black font-mono text-ellipsis line-clamp-1">
                  ㅤㅤㅤㅤ{Artist_Top_Tracks[0]}
                </p>
                <p className="text-black font-mono text-ellipsis line-clamp-1">
                  ㅤㅤㅤㅤ{Artist_Top_Tracks[1]}
                </p>
                <p className="text-black font-mono text-ellipsis line-clamp-1">
                  ㅤㅤㅤㅤ{Artist_Top_Tracks[2]}
                </p>
              </div>
              <div>
                <img
                  src={artistInfo[2]}
                  alt="artistImage"
                  className="my-20 size-60"
                ></img>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-black font-mono m-3 font-semibold text-center">
                About Artist
              </h1>
              <p className="font-mono text-2xl text-black text-center m-5 hover:font-bold ">
                Click On The Artist To View More About Them
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-black font-mono text-lg text-center m-2 no-underline hover:font-bold cursor-pointer">
        <Link to="/HomePage">&lt; Back To HomePage &gt;</Link>
      </div>
    </div>
  );
}

export default ArtistsFollowedPage;
