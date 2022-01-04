import { getTopArtists } from "@/lib/spotify";

export default async (_, res) => {
  const response = await getTopArtists();
  const { items } = await response.json();

  const artists = items.slice(0, 5).map((artist) => ({
    name: artist.name,
    image: artist.images[0].url,
    link: artist.external_urls.spotify,
  }));

  console.log(artists);

  return res.status(200).json(artists);
};
