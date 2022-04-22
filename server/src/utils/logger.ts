import pino from "pino";
import { isTypeQueryNode } from "typescript";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
