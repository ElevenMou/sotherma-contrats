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

const employees = [
  {
    matricule: "123456",
    department: "IT",
    lastName: "Doe",
    firstName: "John",
    email: "john.doe@gmail.com",
    site: "New York",
    profile: "Admin",
  },
  {
    matricule: "123457",
    department: "HR",
    lastName: "Smith",
    firstName: "Jane",
    email: "jane.smith@gmail.com",
    site: "Los Angeles",
    profile: "User",
  },
  {
    matricule: "123458",
    department: "Finance",
    lastName: "Brown",
    firstName: "Mike",
    email: "mike.brown@gmail.com",
    site: "Chicago",
    profile: "User",
  },
  {
    matricule: "123459",
    department: "Marketing",
    lastName: "Johnson",
    firstName: "Emily",
    email: "emily.johnson@gmail.com",
    site: "Houston",
    profile: "Admin",
  },
];

const EmployeesList = () => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matricule</TableHead>
          <TableHead>Département</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>email</TableHead>
          <TableHead>Site</TableHead>
          <TableHead>Profile</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow
            key={employee.matricule}
            onClick={() => navigate(`/admin/employees/${employee.matricule}`)}
            className="cursor-pointer hover:bg-muted/50"
          >
            <TableCell>{employee.matricule}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.lastName}</TableCell>
            <TableCell>{employee.firstName}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.site}</TableCell>
            <TableCell>{employee.profile}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>
            <Pagination
              totalItems={employees.length}
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

export default EmployeesList;
