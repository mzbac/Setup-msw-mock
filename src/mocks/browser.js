import { setupWorker } from "msw";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

export const mock = {
  start: () => {
    worker.start({
      onUnhandledRequest: "warn",
    });
  },
};
