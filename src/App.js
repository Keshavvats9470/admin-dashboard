import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import axios from 'axios';
import EditModal from './EditModal'; // Import the new EditModal component

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (selectedRows) => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
          {isEditModalOpen && (
            <EditModal
              user={editingUser}
              onClose={handleCloseEditModal}
              onSave={handleSaveEdit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
