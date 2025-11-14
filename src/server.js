import app from "./app.js";

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 3000}`);
});

export default server;