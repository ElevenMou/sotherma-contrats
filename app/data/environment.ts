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
        usersList: "/getList?startIndex=<startIndex>&maxRecords=<maxRecords>",
      },
    },
  };
};

export const generateUrl = (url: string, params: Record<string, string>) => {
  let generatedUrl = url;
  for (const key in params) {
    generatedUrl = generatedUrl.replace(`<${key}>`, params[key]);
  }
  return generatedUrl;
};
