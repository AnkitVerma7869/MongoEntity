'use client';
import React from 'react';
import TableList from '../TableList';

interface ManageEntitiesProps {
  token: string;
}

const ManageEntities: React.FC<ManageEntitiesProps> = ({ token }) => {
  return (
    <div className="bg-gray-50">
      <div>
        <TableList token={token} />
      </div>
    </div>
  );
};

export default ManageEntities; 