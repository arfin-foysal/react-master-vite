

import { AiOutlineUserAdd } from "react-icons/ai";

import { RiUserSettingsLine, RiUserStarLine } from "react-icons/ri";
import { RiUserReceived2Line, RiFileListLine } from "react-icons/ri";
import { BiBook, BiBookBookmark, BiBookContent, BiCategory } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { BiLandscape, BiBookAlt, BiBookAdd } from "react-icons/bi";
import { GoBook } from "react-icons/go";
import { MdOutlinePublishedWithChanges, MdPayments, } from "react-icons/md";
import { LuBookX } from "react-icons/lu";
import { FiBook } from "react-icons/fi";

import { BsBasket, BsDashSquare, BsFilterSquare, BsListTask, BsMinecartLoaded, BsReverseLayoutTextSidebarReverse } from "react-icons/bs";




export const navItem = [{
  title: "Master Settings",
  role: "admin",
  icon: <RiUserSettingsLine />,
  children: [
    {
      title: "Author List",
      link: "author-list",
      role: "admin",
      icon: <RiUserReceived2Line />,
    },
    {
      title: "Category List",
      link: "category-list",
      role: "admin",
      icon: <BiCategory />,
    },
    {
      title: "Sub Category List",
      link: "sub-category-list",
      role: "admin",
      icon: <BiCategory />,
    },
    {
      title: "Third Sub Category List",
      link: "third-sub-category-list",
      role: "admin",
      icon: <BiCategory />,
    },
    {
      title: "Language List",
      link: "language-list",
      role: "admin",
      icon: <IoLanguage />,
    },
    {
      title: "Country List",
      link: "country-list",
      role: "admin",
      icon: <BiLandscape />,
    },
    {
      title: "Publisher List",
      link: "publisher-list",
      role: "admin",
      icon: <MdOutlinePublishedWithChanges />,
    },
    {
      title: "Vendor List",
      link: "vendor-list",
      role: "admin",
      icon: <RiUserStarLine />,
    },
    {
      title: "User List",
      link: "user-list",
      role: "admin",
      icon: <AiOutlineUserAdd />,
    },
    // {
    //   title: "Membership Plan",
    //   link: "membership-plan-list",
    //   role: "admin",
    //   icon: <MdCardMembership />,
    // },
  ],
},
{
  title: "Item",
  role: "admin",
  icon: <BiBookAlt size={17} />,
  children: [
    {
      title: "Item List",
      link: "item-list",
      role: "admin",
      icon: <GoBook />,
    },
  ],
},
{
  title: "Inventory",
  role: "admin",
  icon: <BsMinecartLoaded />,
  children: [
    {
      title: "Order List",
      link: "order-list",
      role: "admin",
      icon: <BsReverseLayoutTextSidebarReverse size={12} />,
    },
    {
      title: "Received List",
      link: "item-received-list",
      role: "admin",
      icon: <BsFilterSquare size={12} />,
    }, {
      title: "Stock List",
      link: "Item-qty-list",
      role: "admin",
      icon: <BsBasket size={14} />,
    },
  ],
},
{
  title: "Payment",
  role: "admin",
  icon: <BsDashSquare size={13} />,
  children: [
    {
      title: "Payment List",
      link: "vandor-payment",
      role: "admin",
      icon: <MdPayments size={16} />,
    },
  ],
},
{
  title: "Borrow",
  role: "admin",
  icon: <BiBookContent />,
  children: [
    {
      title: "Borrow List",
      link: "rent-list",
      role: "admin",
      icon: <BiBookAdd />,
    },
    {
      title: "Return List",
      link: "return-list",
      role: "admin",
      icon: <BiBookBookmark />,
    },
    {
      title: "Expired List",
      link: "return-date-expired-list",
      role: "admin",
      icon: <FiBook />,
    },
    {
      title: "Damage List",
      link: "book-damage-list",
      role: "admin",
      icon: <LuBookX />,

    },
  ],
},
{
  title: "Buy List",
  link: "buy-item-list",
  role: "admin",
  icon: <BsListTask />,

}

];
