import { ArtistsRepository } from "../../infrastructure/ArtistsRepository";
import { IArtist } from "../dto/IArtist";
import { IArtistMatch } from "../dto/IArtistResponse";
import { ErrorResponse } from "../errorType/ErrorResponse";

export class LoadArtistsUseCase {
  constructor(private readonly artistsRepository = new ArtistsRepository()) {}

  public async execute(
    artistName: string,
    fileName: string
  ): Promise<IArtist[] | ErrorResponse> {
    const artistSearchResult = await this.artistsRepository.loadArtists(
      artistName
    );
    if (artistSearchResult instanceof ErrorResponse) {
      return artistSearchResult;
    }
    const mappedArtists: IArtist[] = artistSearchResult.map(
      (artist: IArtistMatch) => {
        const smallImage = artist.image.find((img) => img.size == "small");
        const image = artist.image.find((img) => img.size == "medium");
        return {
          name: artist.name,
          mbid: artist.mbid,
          url: artist.url,
          image_small: smallImage?.["#text"] || "",
          image: image?.["#text"] || "",
        };
      }
    );
    this.artistsRepository.saveToCsv(mappedArtists, fileName);
    return mappedArtists;
  }
}
