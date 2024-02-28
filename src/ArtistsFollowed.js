import axios from "axios";

async function fetchFollowedArtists(token, limit = 50) {
  let followedArtists = [];
  let offset = 0;
  while (true) {
    const res = await axios.get(
      `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const artists = res.data.artists.items.map((artist) => [
      artist?.name,
      artist?.id,
      artist?.images[2].url,
    ]);
    followedArtists.push(...artists);

    if (res.data.artists.next) {
      offset += limit;
    } else {
      break;
    }
  }
  return followedArtists;
}

export default fetchFollowedArtists;
