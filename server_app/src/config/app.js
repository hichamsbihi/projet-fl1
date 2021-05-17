
import {STATIC_CONFIGS} from "../core/constants";

export const DB_DSL = process.env.DB_DSL || STATIC_CONFIGS.DB_DSL_STATIC;
export const SERVER_HOST = process.env.SERVER_HOST || STATIC_CONFIGS._SERVER_HOST_STATIC;
export const SERVER_PORT = process.env.SERVER_PORT || STATIC_CONFIGS._SERVER_PORT_STATIC;

export const USER_SECRET_KEY = process.env.USER_SECRET_KEY || STATIC_CONFIGS.USER_SECRET_STATIC;