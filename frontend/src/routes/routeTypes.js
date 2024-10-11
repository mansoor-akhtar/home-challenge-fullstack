export const ROUTE_TYPES = {
    public: "public",
    session: "session",
    private: "private",
    integrationApps : "integrationApps"
  };
export const isPrivate = (routeType) => routeType === ROUTE_TYPES.private;
export const isPublic = (routeType) => routeType === ROUTE_TYPES.public;
  
  