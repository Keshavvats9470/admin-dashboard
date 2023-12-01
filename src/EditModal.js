import React, { useState } from 'react';

const EditModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedUser);
        onClose();
    };

    return (
        <div aria-hidden="true" className="modal overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400/40" >
            <div className="modal-content relative p-6 w-full max-w-md max-h-full bg-white rounded-lg space-y-5 items-center">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    Edit User
                </h3>
                <hr className='border-b ' />
                <div className='flex gap-2 items-center'>
                    <label htmlFor="editName">Name:</label>

                    <input
                        type="text"
                        id="editName"
                        name="name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className='bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-600 block w-full p-1.5'
                    />
                </div>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="editEmail">Email:</label>
                    <input
                        type="text"
                        id="editEmail"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className='bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-600 block w-full p-1.5'
                    />
                </div>
                <div className='flex justify-between px-16'>
                    <button onClick={handleSave} className='bg-green-200 rounded-full px-4 py-0.5 text-sm'>Save</button>
                    <button onClick={onClose} className='bg-red-100 rounded-full px-4 py-0.5 text-sm'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
