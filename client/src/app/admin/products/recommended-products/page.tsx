
import RecommendedProductManagementTable from "@/AdminPanel/components/ProductTables/RecommendedProducts";
import CustomAdminLayout from "@/pages/Admin Panel/admin";
import { Link } from "lucide-react";

export default function Admin() {
    return (
        <CustomAdminLayout>   
           <RecommendedProductManagementTable/>
        </CustomAdminLayout> 
    )   

}   