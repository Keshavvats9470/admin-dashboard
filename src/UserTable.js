import React, { useState, useEffect } from 'react';

const UserTable = ({ users, onDelete, onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const pageSize = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredUsers.length / pageSize);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleCheckboxChange = (userId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((id) => id !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    const handleDeleteSelected = () => {
        onDelete(selectedRows);
        setSelectedRows([]);
    };

    return (
        <div className='max-w-7xl mx-auto justify-center bg-gray-100 h-screen'>

            <form className='p-3 items-center'>
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div class="relative items-center">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input id="default-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />

                </div>
            </form>


            <div className='relative overflow-x-auto shadow-md'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className=' text-sm text-gray-200 tracking-[2px] uppercase bg-[#00187C]'>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <input
                                    type="checkbox"
                                    onChange={() => setSelectedRows([])}
                                    checked={selectedRows.length === 0}
                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                                />
                            </th>
                            <th scope="col" className="px-6 py-3 hidden">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user) => (
                            <tr
                                key={user.id}
                                className={`odd:bg-white even:bg-gray-50 border-b ${selectedRows.includes(user.id) ? 'selected' : ''}`}
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(user.id)}
                                        checked={selectedRows.includes(user.id)}
                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                                    />
                                </td>
                                <td className="px-6 py-4 hidden">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <div className='flex items-center '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-500 rounded-full">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                        <button className="edit" onClick={() => onEdit(user.id)}>
                                            Edit
                                        </button>
                                    </div>
                                    <div className='flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-red-400 rounded-full">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                        <button className="delete " onClick={() => onDelete([user.id])}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-evenly p-3 bg-[#282828] items-center md:gap-0 lg:gap-0 xl:gap-0 gap-1'>
                <div className='flex md:gap-6 lg:gap-6 xl:gap-6 gap-5 max-w-3xl w-full'>
                    <p className='text-gray-400 md:text-sm lg:text-sm xl:text-sm text-xs md:border-b md:border-gray-400 lg:border-b lg:border-gray-400 xl:border-b xl:border-gray-400 border-none'>{`${selectedRows.length} rows selected out of ${filteredUsers.length}`}</p>
                    <button
                        className="delete-selected px-3 flex gap-1 items-center text-xs font-semibold bg-[#51f2b8]/80 py-1 rounded-full "
                        onClick={handleDeleteSelected}
                        disabled={selectedRows.length === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 md:block lg:block xl:block hidden">
                            <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                        </svg>

                        Delete Selected
                    </button>
                </div>
                <button
                    className="first-page p-1 bg-[#51f2b8] rounded-full"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fill-rule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clip-rule="evenodd" />
                    </svg>

                </button>
                <button
                    className="previous-page p-1 bg-[#51f2b8] rounded-full"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>

                </button>
                <span className='text-gray-400 text-md font-normal '>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="next-page p-1 bg-[#51f2b8] rounded-full"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>

                </button>
                <button
                    className="last-page p-1 bg-[#51f2b8] rounded-full"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>


        </div>
    );
};

export default UserTable;
