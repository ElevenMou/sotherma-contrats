import Pagination from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";

const requests = [
  {
    id: 1,
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    site: "Site A",
    profile: "Profile A",
    numberOfProfiles: 5,
    contractType: "Intérimaire",
    isDefined: true,
  },
  {
    id: 2,
    startDate: "2023-02-01",
    endDate: "2023-02-28",
    site: "Site B",
    profile: "Profile B",
    numberOfProfiles: 10,
    contractType: "CDD",
    isDefined: false,
  },
  {
    id: 3,
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    site: "Site C",
    profile: "Profile C",
    numberOfProfiles: 15,
    contractType: "Intérimaire",
    isDefined: true,
  },
  {
    id: 4,
    startDate: "2023-04-01",
    endDate: "2023-04-30",
    site: "Site D",
    profile: "Profile D",
    numberOfProfiles: 20,
    contractType: "CDD",
    isDefined: false,
  },
  {
    id: 5,
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    site: "Site E",
    profile: "Profile E",
    numberOfProfiles: 25,
    contractType: "Intérimaire",
    isDefined: true,
  },
];

const RequestsList = () => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date de début</TableHead>
          <TableHead>Date de fin</TableHead>
          <TableHead>Site</TableHead>
          <TableHead>Profil recherché</TableHead>
          <TableHead>Nombre de profils</TableHead>
          <TableHead>Type de contrat</TableHead>
          <TableHead>Défini</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow
            key={request.id}
            onClick={() => navigate(`/requests/${request.id}`)}
            className="cursor-pointer"
          >
            <TableCell>{request.startDate}</TableCell>
            <TableCell>{request.endDate}</TableCell>
            <TableCell>{request.site}</TableCell>
            <TableCell>{request.profile}</TableCell>
            <TableCell>{request.numberOfProfiles}</TableCell>
            <TableCell>{request.contractType}</TableCell>
            <TableCell>{request.isDefined ? "Oui" : "Non"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <Pagination
              totalItems={requests.length}
              itemsPerPage={3}
              currentPage={1}
              onPageChange={(page) => console.log(page)}
              label="requests"
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RequestsList;
