import logger from "jet-logger";
import server from "./server";
import { normalizePort } from "./utils/normalizePort";
import dotenv from "dotenv";

// **** Start server **** //
dotenv.config();

const port = normalizePort(process.env.PORT || "3001");
const msg = `Express server started on port: ${port.toString()}`;
server.listen(port, () => logger.info(msg));
