export interface IArtistResponse {
  results: {
    artistmatches: { artist: IArtistMatch[] };
  };
}

export interface IArtistMatch {
  name: string;
  mbid: string;
  url: string;
  image: IArtistImage[];
}

export interface IArtistImage {
  "#text": string;
  size: string;
}
