// import dotenv from "dotenv";
// import dbConnect from "./db/index.js";
// import { app } from "./app.js";

// dotenv.config();

// const PORT = process.env.PORT || 3000;

// dbConnect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("MongoDB Connection Error", error);
//   });

import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import app from "./app.js";

dotenv.config();

// connect DB ONCE
await dbConnect();

export default app;
