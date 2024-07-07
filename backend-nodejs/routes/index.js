import routeUsers from "./users.js";

export default function router(app) {
  app.use('/', routeUsers);
}