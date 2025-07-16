import React from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";


const AdminMenu = () => {
  return (
    <div>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
    </div>
  );
};

export default AdminMenu;
