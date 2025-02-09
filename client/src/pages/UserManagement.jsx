"use client"

import { useState, useEffect } from "react"
import { deleteUser, get, put } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    contact: '',
    role: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (selectedUser) {
      setEditForm({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        contact: selectedUser.contact || '',
        role: selectedUser.role || ''
      })
    }
  }, [selectedUser])

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await put(`/api/admin/users/${selectedUser._id}`, editForm)
      if (response.status === 200) {
        toast.success("User updated successfully")
        setSelectedUser(null)
        fetchUsers()
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error(error.response?.data?.message || "Failed to update user")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const fetchUsers = async () => {
    try {
      const request = await get("/api/admin/getuser")
      const response = request.data
      if (request.status === 200) {
        setUsers(response.users)
        //  console.log(response.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  // Filter users based on search term
  const filteredUsers = users ? users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
  }

  const handleSuspendUser = async (id) => {
    if (window.confirm("Are you sure you want to suspend this user?")) {
      try {
        const request = await deleteUser(`/api/admin/delet/${id}`)
        const response = request.data
        if (request.status === 200) {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{users?.length || 0}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-500">NGOs</div>
          <div className="text-2xl font-bold">
            {users?.filter(user => user.role === 'ngo').length || 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-500">Donors</div>
          <div className="text-2xl font-bold">
            {users?.filter(user => user.role === 'donor').length || 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-500">Volunteers</div>
          <div className="text-2xl font-bold">
            {users?.filter(user => user.role === 'volunteer').length || 0}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Contact</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                  <td className="p-4 text-sm text-gray-900">{user.name}</td>
                  <td className="p-4 text-sm text-gray-500">{user.email}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'ngo' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'donor' ? 'bg-green-100 text-green-800' :
                            user.role === 'volunteer' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                      }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{user.contact || 'N/A'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSuspendUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  {searchTerm ? 'No users found matching your search' : 'No users available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={editForm.contact}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="user">User</option>
                  <option value="ngo">NGO</option>
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

