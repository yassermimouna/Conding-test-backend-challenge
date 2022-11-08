import { Router } from "express";
import { getArtists } from "../controllers/artist.controller";

export const artistRouter = Router();

/* GET artists by name route. */
artistRouter.get("/:artistName/:fileName", getArtists);
