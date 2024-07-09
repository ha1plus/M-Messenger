import routeUsers from "./users.js";
import routeConversations from "./conversations.js";
import routerMessages from "./message.js";

export default function router(app) {
  app.use('/', routeUsers);
  app.use('/conversation', routeConversations);
  app.use('/message', routerMessages);
}