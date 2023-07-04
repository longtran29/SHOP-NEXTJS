

import AdminLayout from '@/layouts/AdminLayout';
import { Button } from 'antd';
import Modal from 'antd/es/modal/Modal';
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
             <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal className='p-4 mt-20'
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <label>Nhap username</label>
        <label>Nhap password</label>
        <input placeholder="dit me may" />
      </Modal>
            
        </div>
    );
}

Customers.getLayout = page => <AdminLayout>{page}</AdminLayout>

export default Customers;