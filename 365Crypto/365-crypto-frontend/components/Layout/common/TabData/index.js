//react-icons
import { FaRobot } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { IoMdAnalytics } from "react-icons/io";
import { ImNewspaper } from "react-icons/im";
import { BsBarChart } from "react-icons/bs";
import { HiReceiptTax, HiOutlineSpeakerphone } from "react-icons/hi";
import { BiCalendar } from "react-icons/bi";
import { CgArrowsExchange } from "react-icons/cg";

//side navigation bar elements,details
export const tabData = [
  {
    id: "1",
    title: "Hub",
    icon: <FiGrid size={"17px"} />,
    path: "/",
  },
  {
    id: "2",
    title: "Market Data",
    icon: <IoMdAnalytics size={"17px"} />,
    path: "/market-data",
  },
  {
    id: "3",
    title: "Coin Events",
    icon: <BiCalendar size={"19.5px"} />,
    path: "/coin-events",
  },
  {
    id: "4",
    title: "Crypto News",
    icon: <ImNewspaper size={"16px"} />,
    path: "/crypto-news",
  },
  {
    id: "5",
    title: "Social Feeds",
    icon: <HiOutlineSpeakerphone size={"18px"} />,
    path: "/social-feeds",
  },
  {
    id: "6",
    title: "Exchanges & Deals",
    icon: <CgArrowsExchange size={"25px"} />,
    path: "/exchanges-and-deals",
  },
  {
    id: "7",
    title: "Crypto Bots",
    icon: <FaRobot size={"18px"} />,
    path: "/crypto-bots",
  },
  {
    id: "8",
    title: "Crypto Tax",
    icon: <HiReceiptTax size={"18px"} />,
    path: "/crypto-tax",
  },
  {
    id: "9",
    title: "Charting Tools",
    icon: <BsBarChart size={"16px"} />,
    path: "/charting-tools",
  },
];
