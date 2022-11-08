import { IArtist } from "../application/dto/IArtist";
import {
  IArtistMatch,
  IArtistResponse,
} from "../application/dto/IArtistResponse";
import { ErrorResponse } from "../application/errorType/ErrorResponse";
import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
import { ExportToCsv } from "export-to-csv";
import * as fs from "fs";
import { backupArtists } from "./backupArtists";

dotenv.config();
const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export class ArtistsRepository {
  private axiosInstance: AxiosInstance = axios.create();

  constructor() {
    this.initAxios();
  }

  public async loadArtists(
    artistName: string
  ): Promise<IArtistMatch[] | ErrorResponse> {
    let searchResults = await this.loadArtistByName(artistName);
    if (searchResults instanceof ErrorResponse) {
      return searchResults;
    }
    while (!(searchResults as IArtistMatch[]).length) {
      const randomArtistOrder = Math.floor(
        Math.random() * backupArtists.artists.length
      );
      const backupArtist = backupArtists.artists[randomArtistOrder];
      searchResults = await this.loadArtistByName(backupArtist);
      if (searchResults instanceof ErrorResponse) {
        return searchResults;
      }
    }

    return searchResults;
  }

  public saveToCsv(artists: IArtist[], fileName: string): void {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "My Artists CSV",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    const csvFile = csvExporter.generateCsv(artists, true);
    fs.writeFileSync(`./generatedCsvFiles/${fileName}.csv`, csvFile);
  }

  private async loadArtistByName(
    artistName: string
  ): Promise<IArtistMatch[] | ErrorResponse> {
    try {
      const searchResult = await this.axiosInstance.get<IArtistResponse>(
        `/?artist=${artistName}`
      );

      return searchResult.data.results.artistmatches.artist;
    } catch (e) {
      return new ErrorResponse(500, "internal error occured during Api call !");
    }
  }

  private initAxios(): void {
    const params = {
      method: "artist.search",
      format: "json",
      api_key: apiKey,
    };
    this.axiosInstance = axios.create({ baseURL, params });
  }
}
