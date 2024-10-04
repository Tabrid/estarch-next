import React from 'react';
import InvoiceDetail from '../../../components/invoiceDetails/page.js';

const InvoicePage = ({ params }) => {
  const { id } = params;  // Dynamic ID from the route

  return (
    <div>
      <InvoiceDetail id={id}/>
    </div>
  );
};

export default InvoicePage;