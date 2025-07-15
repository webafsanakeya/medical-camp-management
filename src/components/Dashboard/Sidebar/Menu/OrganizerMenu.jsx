import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const OrganizerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Camp"
        address="add-camp"
      />
      <MenuItem icon={MdHomeWork} label="Manage Camps" address="manage-camps" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Registered"
        address="manage-registered"
      />
    </>
  );
};

export default OrganizerMenu;
