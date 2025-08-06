import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./presentation/swagger/swagger.json";

import { customerRouter } from "./presentation/customer/customer.router";
import { productRouter } from "./presentation/product/product.router";
import { orderRouter } from "./presentation/order/order.router";
import { errorHandler } from "./presentation/_errors/errorHandler";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());

customerRouter(app);
productRouter(app);
orderRouter(app);

app.use(errorHandler);

export default app;
