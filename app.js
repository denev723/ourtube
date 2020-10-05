import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import {
  localMiddleware
} from "./middlewares";

const app = express();

app.use(helmet());
app.set("view engine", "pug")
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("dev"));
app.use(localMiddleware);
// eslint-disable-next-line func-names
app.use(function (req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://arghive.org");
  return next();
})

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app