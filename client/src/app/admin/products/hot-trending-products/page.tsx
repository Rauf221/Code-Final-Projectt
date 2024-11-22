import ProductManagementTable from "@/AdminPanel/components/ProductTables/HotTrendingProducts";
import CustomAdminLayout from "@/pages/Admin Panel/admin";
import { Link } from "lucide-react";

export default function Admin() {
    return (
        <CustomAdminLayout>   
           <ProductManagementTable/>
        </CustomAdminLayout> 
    )   

}   