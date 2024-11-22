import OrderTable from "@/AdminPanel/components/OrdersTable/Orders";
import CustomAdminLayout from "@/pages/Admin Panel/admin";

export default function OrderAdminTable () {
    return (
        <CustomAdminLayout>
         <OrderTable/>
        </CustomAdminLayout>
    )
}