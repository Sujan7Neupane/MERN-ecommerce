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

const PORT = process.env.PORT || 8000;

// connect DB
await dbConnect();

// START SERVER (THIS WAS MISSING)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
