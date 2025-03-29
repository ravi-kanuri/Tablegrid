import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser, deleteUser, setPage } from "../redux/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
});

export default function UserTable() {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage } = useSelector((state) => state.user);
  const [editingUser, setEditingUser] = useState(null);
  const usersPerPage = 6;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("email", user.email);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const onSubmit = (data) => {
    dispatch(updateUser({ 
      id: editingUser.id, 
      userData: { ...data, id: editingUser.id, avatar: editingUser.avatar } 
    }));
    setEditingUser(null);
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto overflow-x-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full table-auto border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#1E90FF] text-white text-lg">
          <tr>
            <th className="px-4 py-3 text-left">Picture</th>
            <th className="px-4 py-3 text-left">First Name</th>
            <th className="px-4 py-3 text-left">Last Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-center">
                <img src={user.avatar} alt={user.first_name} className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
              </td>
              <td className="px-4 py-3 text-left">{user.first_name}</td>
              <td className="px-4 py-3 text-left">{user.last_name}</td>
              <td className="px-4 py-3 text-left">{user.email}</td>
              <td className="px-4 py-3 flex space-x-2 justify-center gap-2">
                <FaEdit className="text-xl text-blue-500 cursor-pointer" onClick={() => handleEdit(user)} />
                <FaTrash className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2 items-center mt-4">
        <FaArrowLeft className={`text-xl cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => dispatch(setPage(currentPage - 1))} />
        <span className="text-gray-700">{currentPage}</span>
        <FaArrowRight className={`text-xl cursor-pointer ${users.length < usersPerPage ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => dispatch(setPage(currentPage + 1))} />
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white p-6 rounded shadow-lg w-80 md:w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className="block border p-2 w-full mb-2 rounded" {...register("first_name")} placeholder="First Name" />
              {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
              <input className="block border p-2 w-full mb-2 rounded" {...register("last_name")} placeholder="Last Name" />
              {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
              <input className="block border p-2 w-full mb-2 rounded" {...register("email")} placeholder="Email" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">Update</button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-xl ml-2 hover:bg-gray-600" onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
