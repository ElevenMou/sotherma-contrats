export const getEnvironment = () => {
  return {
    AuthAPI: {
      base: "auth",
      endpoints: {
        authenticate: "/authenticate",
        userInfo: "/current_user_details",
      },
    },
  };
};
