import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import "express-async-errors";
import { artistRouter } from "./api/routes/artist.routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
// **** Init express **** //

const app = express();

// **** Set basic express settings **** //
app.use("/artist", artistRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

export default app;