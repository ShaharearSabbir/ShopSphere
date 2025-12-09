import app from "./app";
import config from "./config";

const port = config.PORT;

app.listen(port, () => {
  console.log(`${config.NAME} is running on http://localhost:${port}`);
});
