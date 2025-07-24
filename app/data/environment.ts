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
        delegationUsers: "/get-delegation-users",
        setDelegated: "/set-is-delegated",
        setActiveStatus: "/set-is-active",
      },
    },
    DepartmentsAPI: {
      base: "department",
      endpoints: {
        departmentsList: "/getAllDepartments",
        getList: "/list?startIndex=<startIndex>&maxRecords=<maxRecords>",
        save: "/save",
        details: "/details?guid=<guid>",
      },
    },
    DepartmentManagementAPI: {
      base: "department-management",
      endpoints: {
        details: "/details?guid=<guid>",
        save: "/save",
        getUsersList: "/getUsersList",
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
          "/getListByUser?startIndex=<startIndex>&maxRecords=<maxRecords>&isCompleted=<isCompleted>",
        listToValidate:
          "/getListToValidateByUser?startIndex=<startIndex>&maxRecords=<maxRecords>",
        acceptRequest: "/accept",
        rejectRequest: "/reject",
        saveRequest: "/save",
        requestDetails: "/details?guid=<guid>",
        timeline: "/timeline?guid=<guid>",
        getProfileFile: "/getProfileFile?guid=<guid>",
        notifyProvider: "/notifyProvider",
      },
    },
    ContractsAPI: {
      base: "contract",
      endpoints: {
        list: "/getList?startIndex=<startIndex>&maxRecords=<maxRecords>",
        contractDetails: "/getDetails?guid=<guid>",
        save: "/save",
        close: "/close?guid=<guid>&closingReason=<closingReason>",
        closeRequest: "/close_request",
        extend: "/extend?guid=<guid>&newEndDate=<newEndDate>",
        details: "/getDetails?guid=<guid>",
        getCandidateCV: "/getCandidateCV?guid=<guid>",
        closingRequests:
          "/getClosingContractRequestList?startIndex=<startIndex>&maxRecords=<maxRecords>",
        approveRequest: "/approveClosingContract?guid=<guid>",
        rejectRequest: "/rejectClosingContract?guid=<guid>",
      },
    },
    NotificationsAPI: {
      base: "notifications",
      endpoints: {
        numberOfNotifications: "/user-notifications-number",
        notificationsList:
          "/user-notifications?startIndex=<startIndex>&maxRecords=<maxRecords>",
      },
    },
  };
};

export const generateUrl = (url: string, params: Record<string, string>) => {
  let generatedUrl = url;

  // Replace provided params
  for (const key in params) {
    generatedUrl = generatedUrl.replace(
      new RegExp(`<${key}>`, "g"),
      params[key]
    );
  }

  // Remove any remaining <param> patterns
  generatedUrl = generatedUrl.replace(/<[^>]+>/g, "");

  // Clean up malformed query strings
  // Remove empty parameters (e.g., "param1=&param2=" or "param1=")
  generatedUrl = generatedUrl.replace(
    /[?&]([^=&]*=(&|$))/g,
    (match, p1, p2) => {
      return p2 === "&" ? "&" : "";
    }
  );

  // Remove duplicate & or ? characters
  generatedUrl = generatedUrl.replace(/[&]{2,}/g, "&");
  generatedUrl = generatedUrl.replace(/[?]{2,}/g, "?");

  // Fix cases where & appears right after ?
  generatedUrl = generatedUrl.replace(/\?&/, "?");

  // Remove trailing ? or & characters
  generatedUrl = generatedUrl.replace(/[?&]+$/, "");

  // If we ended up with no query parameters but still have a ?, remove it
  if (generatedUrl.endsWith("?")) {
    generatedUrl = generatedUrl.slice(0, -1);
  }

  return generatedUrl;
};
