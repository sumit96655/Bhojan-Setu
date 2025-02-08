"use client"

import { useState, useEffect } from "react"
import {  deleteUser, get } from '../services/ApiEndpoint'


const UserManagement = () => {
  const [users, setUsers] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const request = await get("/api/admin/getuser")
      const response = request.data
                if (request.status===200) {
                   setUsers(response.users)
                  //  console.log(response.users)
                }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }


  const handleEditUser = (user) => {
    setSelectedUser(user)
  }

  const handleSuspendUser = async (id) => {
    if (window.confirm("Are you sure you want to suspend this user?")) {
      try {
        const request=await deleteUser(`/api/admin/delet/${id}`)
            const response=request.data
            if (request.status===200) {
              toast.success(response.message)
              // console.log(response)
            }
        fetchUsers()
      } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
          }
        console.error("Error suspending user:", error)
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((elem,index)=> (
            <tr key={index} className="border-b">
              <td className="p-2">{elem.name}</td>
              <td className="p-2">{elem.email}</td>
              <td className="p-2">{elem.role}</td>
              <td className="p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleSuspendUser(user._id)}>
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form>
              {/* Add form fields for editing user details */}
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

