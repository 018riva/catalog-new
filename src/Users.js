import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        index: index + 1,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  return (
    <div sx={{ textAlign: "center" }}>
      <Typography variant="h2" sx={{ marginBottom: "1rem", textDecoration: "underline #0288d1", mx: "auto", width: "fit-content" }}>
        Users
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "600px", margin: "0 auto", marginBottom: "1rem" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0288d1" }}>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell>{user.index}</TableCell>
                <TableCell>{user.email || "Anonymous User"}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
