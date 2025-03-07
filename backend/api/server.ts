import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import indexRouter from "./routes/index";
import authRouter from "./routes/authRoutes";
import ticketRouter from "./routes/ticketRoutes";

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(
      cors({
        origin: [
          "https://support-ticketing-system-h65b.vercel.app",
          "https://support-ticketing-system-web.onrender.com",
          "http://localhost:3000",
        ],
        credentials: true,
      })
    )
    .use(helmet())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

  // routes
  app.use("/", indexRouter);
  app.use("/api/auth", authRouter);
  app.use("/api", ticketRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err: Error, req: express.Request, res: express.Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(500);
    res.render("error");
  });
  return app;
};
