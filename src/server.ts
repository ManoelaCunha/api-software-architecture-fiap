import app from "./app";
import dotenv from "dotenv";

import { AppDataSource } from "./adapter/infrastructure/database/data-source";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    const PORT: string = process.env.PORT ?? "3000";
    app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err);
  });
