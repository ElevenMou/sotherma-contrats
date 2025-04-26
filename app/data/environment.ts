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
        userDetails: "/details?guid=<guid>",
        save: "/save",
      },
    },
    DepartmentsAPI: {
      base: "department",
      endpoints: {
        departmentsList: "/getAllDepartments",
      },
    },
    SitesAPI: {
      base: "site",
      endpoints: {
        sitesList: "/getAllSites",
      },
    },
    RequestsAPI: {
      base: "request",
      endpoints: {
        listByUser:
          "/getListByUser?startIndex=<startIndex>&maxRecords=<maxRecords>",
        listToValidate:
          "/getListToValidateByUser?startIndex=<startIndex>&maxRecords=<maxRecords>",
        acceptRequest: "/accept",
        rejectRequest: "/reject",
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
