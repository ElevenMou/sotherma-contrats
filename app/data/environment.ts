export const getEnvironment = () => {
  return {
    AuthAPI: {
      base: "auth",
      endpoints: {
        authenticate: "/authenticate",
      },
    },
    UserAPI: {
      base: "user",
      endpoints: {
        userInfo: "/current_user_details",
      },
    },
  };
};
