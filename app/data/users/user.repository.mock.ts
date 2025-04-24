import { http, HttpResponse } from "msw";
import { getEnvironment } from "../environment";
import {
  userRoles,
  type CurrentUserInfoModel,
} from "./model/response/CurrentUserInfoResponseModel";
import type { GetUsersListResponseModel } from "./model/response/GetUsersListResponseModel";
import type { GetUserDetailsResponseModel } from "./model/response/GetUserDetailsResponseModel";

const { UserAPI } = getEnvironment();
const { base, endpoints } = UserAPI;
const baseUrl = `${import.meta.env.VITE_API_URL}/${base}`;

export const UserRepositoryMock = [
  http.get(`${baseUrl}${endpoints.userInfo}`, async () => {
    const responseDto: CurrentUserInfoModel = {
      firstName: "Moussa",
      lastName: "Saidi",
      email: "moussa.saidi.01@gmail.com",
      profile: userRoles.admin,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),

  http.get(`${baseUrl}${endpoints.usersList}`, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);
    const maxRecords = parseInt(searchParams.get("maxRecords") || "10", 10);

    const employees: Array<GetUserDetailsResponseModel> = [
      {
        code: "123466",
        department: "IT",
        lastName: "Nguyen",
        firstName: "Liam",
        email: "liam.nguyen@gmail.com",
        site: "San Diego",
        profile: "User",
        guid: "1234667890",
      },
      {
        code: "123467",
        department: "Finance",
        lastName: "Walker",
        firstName: "Ava",
        email: "ava.walker@gmail.com",
        site: "Phoenix",
        profile: "Admin",
        guid: "1234678901",
      },
      {
        code: "123468",
        department: "HR",
        lastName: "Hall",
        firstName: "Noah",
        email: "noah.hall@gmail.com",
        site: "Atlanta",
        profile: "User",
        guid: "1234689012",
      },
      {
        code: "123469",
        department: "Engineering",
        lastName: "Allen",
        firstName: "Isabella",
        email: "isabella.allen@gmail.com",
        site: "Orlando",
        profile: "User",
        guid: "1234690123",
      },
      {
        code: "123470",
        department: "Marketing",
        lastName: "Young",
        firstName: "James",
        email: "james.young@gmail.com",
        site: "Dallas",
        profile: "Admin",
        guid: "1234701234",
      },
      {
        code: "123471",
        department: "Support",
        lastName: "Hernandez",
        firstName: "Mia",
        email: "mia.hernandez@gmail.com",
        site: "Philadelphia",
        profile: "User",
        guid: "1234712345",
      },
      {
        code: "123472",
        department: "Legal",
        lastName: "King",
        firstName: "Benjamin",
        email: "ben.king@gmail.com",
        site: "San Jose",
        profile: "User",
        guid: "1234723456",
      },
      {
        code: "123473",
        department: "Sales",
        lastName: "Wright",
        firstName: "Emma",
        email: "emma.wright@gmail.com",
        site: "Charlotte",
        profile: "Admin",
        guid: "1234734567",
      },
      {
        code: "123474",
        department: "IT",
        lastName: "Lopez",
        firstName: "Lucas",
        email: "lucas.lopez@gmail.com",
        site: "Indianapolis",
        profile: "User",
        guid: "1234745678",
      },
      {
        code: "123475",
        department: "Operations",
        lastName: "Scott",
        firstName: "Amelia",
        email: "amelia.scott@gmail.com",
        site: "Columbus",
        profile: "Admin",
        guid: "1234756789",
      },
      {
        code: "123476",
        department: "Finance",
        lastName: "Green",
        firstName: "Logan",
        email: "logan.green@gmail.com",
        site: "Fort Worth",
        profile: "User",
        guid: "1234767890",
      },
      {
        code: "123477",
        department: "HR",
        lastName: "Baker",
        firstName: "Harper",
        email: "harper.baker@gmail.com",
        site: "San Antonio",
        profile: "User",
        guid: "1234778901",
      },
      {
        code: "123478",
        department: "Marketing",
        lastName: "Adams",
        firstName: "Elijah",
        email: "elijah.adams@gmail.com",
        site: "Jacksonville",
        profile: "Admin",
        guid: "1234789012",
      },
      {
        code: "123479",
        department: "Engineering",
        lastName: "Nelson",
        firstName: "Evelyn",
        email: "evelyn.nelson@gmail.com",
        site: "Nashville",
        profile: "User",
        guid: "1234790123",
      },
      {
        code: "123480",
        department: "Legal",
        lastName: "Carter",
        firstName: "Henry",
        email: "henry.carter@gmail.com",
        site: "Detroit",
        profile: "User",
        guid: "1234801234",
      },
      {
        code: "123481",
        department: "IT",
        lastName: "Mitchell",
        firstName: "Abigail",
        email: "abigail.mitchell@gmail.com",
        site: "Memphis",
        profile: "Admin",
        guid: "1234812345",
      },
      {
        code: "123482",
        department: "Finance",
        lastName: "Perez",
        firstName: "Jack",
        email: "jack.perez@gmail.com",
        site: "Oklahoma City",
        profile: "User",
        guid: "1234823456",
      },
      {
        code: "123483",
        department: "Support",
        lastName: "Roberts",
        firstName: "Scarlett",
        email: "scarlett.roberts@gmail.com",
        site: "Louisville",
        profile: "User",
        guid: "1234834567",
      },
      {
        code: "123484",
        department: "Sales",
        lastName: "Turner",
        firstName: "Sebastian",
        email: "sebastian.turner@gmail.com",
        site: "Milwaukee",
        profile: "Admin",
        guid: "1234845678",
      },
      {
        code: "123485",
        department: "HR",
        lastName: "Phillips",
        firstName: "Grace",
        email: "grace.phillips@gmail.com",
        site: "Albuquerque",
        profile: "User",
        guid: "1234856789",
      },
      {
        code: "123486",
        department: "Operations",
        lastName: "Campbell",
        firstName: "Daniel",
        email: "daniel.campbell@gmail.com",
        site: "Tucson",
        profile: "Admin",
        guid: "1234867890",
      },
      {
        code: "123487",
        department: "Engineering",
        lastName: "Parker",
        firstName: "Chloe",
        email: "chloe.parker@gmail.com",
        site: "Fresno",
        profile: "User",
        guid: "1234878901",
      },
      {
        code: "123488",
        department: "Legal",
        lastName: "Evans",
        firstName: "Matthew",
        email: "matthew.evans@gmail.com",
        site: "Mesa",
        profile: "User",
        guid: "1234889012",
      },
      {
        code: "123489",
        department: "IT",
        lastName: "Edwards",
        firstName: "Zoey",
        email: "zoey.edwards@gmail.com",
        site: "Sacramento",
        profile: "Admin",
        guid: "1234890123",
      },
      {
        code: "123490",
        department: "Finance",
        lastName: "Collins",
        firstName: "Samuel",
        email: "samuel.collins@gmail.com",
        site: "Kansas City",
        profile: "User",
        guid: "1234901234",
      },
      {
        code: "123491",
        department: "Marketing",
        lastName: "Stewart",
        firstName: "Victoria",
        email: "victoria.stewart@gmail.com",
        site: "Atlanta",
        profile: "Admin",
        guid: "1234912345",
      },
      {
        code: "123492",
        department: "Support",
        lastName: "Sanchez",
        firstName: "Nathan",
        email: "nathan.sanchez@gmail.com",
        site: "Raleigh",
        profile: "User",
        guid: "1234923456",
      },
      {
        code: "123493",
        department: "HR",
        lastName: "Morris",
        firstName: "Hannah",
        email: "hannah.morris@gmail.com",
        site: "Long Beach",
        profile: "User",
        guid: "1234934567",
      },
      {
        code: "123494",
        department: "Legal",
        lastName: "Rogers",
        firstName: "Andrew",
        email: "andrew.rogers@gmail.com",
        site: "Oakland",
        profile: "Admin",
        guid: "1234945678",
      },
      {
        code: "123495",
        department: "Sales",
        lastName: "Reed",
        firstName: "Aria",
        email: "aria.reed@gmail.com",
        site: "Minneapolis",
        profile: "User",
        guid: "1234956789",
      },
    ];

    const totalCount = employees.length;

    const paginatedEmployees = employees.slice(
      startIndex,
      startIndex + maxRecords
    );

    const responseDto: GetUsersListResponseModel = {
      totalCount,
      usersList: paginatedEmployees,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json(responseDto, {
      status: 200,
    });
  }),
];
