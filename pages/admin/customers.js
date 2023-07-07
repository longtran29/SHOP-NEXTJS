

import AdminLayout from '@/layouts/AdminLayout';
import React, { useState } from 'react';

function Customers(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    console.log("Da vao user");
    return (
        <div>
       
        </div>
    );
}

Customers.getLayout = page => <AdminLayout>{page}</AdminLayout>

export default Customers;