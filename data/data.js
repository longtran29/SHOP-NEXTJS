import { FaUserTag } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { BiSolidCategory, BiSolidReport } from "react-icons/bi";
import { TbBrandEnvato } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";

export const sideBarData = [
    {
        title: "Dashboard",
        icon: <AiFillDashboard /> ,
        link: "/admin/dashboard"
    },
    {
        title: "Sản phẩm",
        icon: <HiTemplate /> ,
        link: "/admin/products"
    },
    {
        title: "Khách hàng",
        icon: <FaUserTag /> ,
        link: "/admin/customers"
    },
    {
        title: "Danh mục",
        icon: <BiSolidCategory /> ,
        link: "/admin/categories"
    },
    {
        title: "Hãng sản xuất",
        icon: <TbBrandEnvato /> ,
        link: "/admin/brands"
    },
    {
        title: "Bài viết",
        icon: <BsFillPostcardHeartFill /> ,
        link: "/admin/blogs"
    },
    {
        title: "Thống kê",
        icon: <BiSolidReport /> ,
        link: "/admin/report"
    }
]