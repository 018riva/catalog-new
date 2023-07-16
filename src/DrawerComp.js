import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
            <ListItemButton>
                <Link to="/" style={{color: 'black' }}> Home </Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/movies" style={{color: 'black' }}> Movies </Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/actors" style={{color: 'black' }}> Actors </Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/login" style={{color: 'black' }}> Profile </Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/users" style={{color: 'black' }}> Users </Link>
            </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "inherit", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;