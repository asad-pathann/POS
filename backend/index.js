import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./Routes/UserRoutes/UserRoutes.js";
import { authHandler } from "./middlewares/authHandler.js";
import { ConnectDb } from "./Connection/Connect.js";
import { OrderRoutes } from "./Routes/orderRoutes.js";
import { productRouter } from "./Routes/ProductRouter.js";
import { PaymentRoute } from "./Routes/paymentRouter.js";

dotenv.config();

const app = express();
ConnectDb();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRoutes);
app.use("/api/products", productRouter);

app.use("/api/payments", PaymentRoute);

app.use(authHandler);
app.listen(process.env.PORT, () =>
  console.log(`Server Started On Port:${process.env.PORT.cyan}`),
);
