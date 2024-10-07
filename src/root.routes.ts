import express, { NextFunction, Request, Response } from "express";
import { adminRouter } from "./Admin/admin.routes";
import { clientRouter } from "./Client/client.routes";
import { jobRouter } from "./Jobs/job.routes";
import { quotationRouter } from "./Quotation/quotation.routes";
import { writerRouter } from "./Writers/writers.routes";
const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Root Route is working" });
});

rootRouter.use("/admin", adminRouter);
rootRouter.use("/client", clientRouter);
rootRouter.use("/jobs", jobRouter);
rootRouter.use("/writer", writerRouter);
rootRouter.use("/quotation", quotationRouter);

export { rootRouter };
