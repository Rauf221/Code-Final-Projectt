import UserManagementTable from "@/AdminPanel/components/CustomersTable/Customers";
import CustomAdminLayout from "@/pages/Admin Panel/admin";


export default function Admin() {
    return (
        <CustomAdminLayout>   
           <UserManagementTable/>
        </CustomAdminLayout> 
    )   

}   