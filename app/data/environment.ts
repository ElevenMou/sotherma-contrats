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
        setActiveStatus: "/set-active-status",
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
          "/getListByUser?startIndex=<startIndex>&maxRecords=<maxRecords>",
        listToValidate:
          "/getListToValidateByUser?startIndex=<startIndex>&maxRecords=<maxRecords>",
        acceptRequest: "/accept",
        rejectRequest: "/reject",
        saveRequest: "/save",
        requestDetails: "/details?guid=<guid>",
        timeline: "/timeline?guid=<guid>",
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
        details: "/getDetails?guid=<guid>",
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
  for (const key in params) {
    generatedUrl = generatedUrl.replace(`<${key}>`, params[key]);
  }
  return generatedUrl;
};
