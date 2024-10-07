import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const requiredEnvVariables = ["NODE_ENV"];

const checkEnvVariables = (variables: string[]) => {
  try {
    const missingVariables = variables.filter(
      (variable) => !process.env[variable]
    );
    if (missingVariables.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVariables.join(", ")}`
      );
    }
  } catch (error: any) {
    throw error.message;
  }
};

checkEnvVariables(requiredEnvVariables);

// export const timezone = process.env.TZ;
export const environment = process.env.NODE_ENV;
// export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "secret";
