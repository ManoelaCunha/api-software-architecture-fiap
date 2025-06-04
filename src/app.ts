import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./adapter/api/swagger/swagger.json";

import { customerRouter } from "./adapter/api/customer/customer.router";
import { productRouter } from "./adapter/api/product/product.router";
import { orderRouter } from "./adapter/api/order/order.router";
import { errorHandler } from "./adapter/api/_errors/errorHandler";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());

customerRouter(app);
productRouter(app);
orderRouter(app);

app.use(errorHandler);

export default app;
