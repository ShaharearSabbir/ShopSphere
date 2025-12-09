import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// env variable name goes here
const envVariables = [
  "NAME",
  "VERSION",
  "ENV",
  "PORT",
  "CONNECTION_SRT",
  "JWT_SECRET",
] as const;

type Config = Record<(typeof envVariables)[number], string>;

const config: Config = {} as Config;

envVariables.forEach((env) => {
  if (typeof process.env[env] !== "string") {
    throw new Error(`Please add ${env} on environment variables`);
  }

  config[env] = process.env[env];
});

export default config;
