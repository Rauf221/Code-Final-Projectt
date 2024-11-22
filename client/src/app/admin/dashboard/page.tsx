import UserManagementTable from "@/AdminPanel/components/CustomersTable/Customers";
import AdminDashboard from "@/AdminPanel/dashboard/contactus";
import CustomAdminLayout from "@/pages/Admin Panel/admin";


export default function Admin() {
    return (
        <CustomAdminLayout>   
           <AdminDashboard/>
        </CustomAdminLayout> 
    )   

}   