

import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';

function Customers(props) {

    console.log("Da vao user");
    return (
        <div>
            Danh sach khach hang
            
        </div>
    );
}

Customers.getLayout = page => <AdminLayout>{page}</AdminLayout>

export default Customers;