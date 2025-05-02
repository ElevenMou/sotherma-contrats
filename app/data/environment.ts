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
        getList: "/list?startIndex=<startIndex>&maxRecords=<maxRecords>",
      },
    },
    SitesAPI: {
      base: "site",
      endpoints: {
        allSites: "/getAllSites",
        sitesList: "/getList?startIndex=<startIndex>&maxRecords=<maxRecords>",
        siteDetails: "/details?guid=<guid>",
        saveSite: "/save",
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
        saveRequest: "/save",
        requestDetails: "/details?guid=<guid>",
      },
    },
    ContractsAPI: {
      base: "contract",
      endpoints: {
        list: "/getList?startIndex=<startIndex>&maxRecords=<maxRecords>",
        contractDetails: "/getDetails?guid=<guid>",
        save: "/save",
        close: "/close?guid=<guid>",
        extend: "/extend?guid=<guid>&newEndDate=<newEndDate>",
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
