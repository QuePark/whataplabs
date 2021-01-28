const express = require("express");
const indexRouter = require("./routes/index");

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.set("port", port);
app.listen(app.get("port"), () => {
	console.log(`app is listening in PORT ${app.get("port")}`);
});
