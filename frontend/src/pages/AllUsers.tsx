import moment from "moment";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ChangeUserRole from "../components/ChangeUserRole";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const AllUsers = () => {
  const [allUser, setAllUsers] = useState<User[]>([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAllUsers();
    })();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg max-w-6xl mx-auto my-8 overflow-x-auto">
      <table className="w-full min-w-[700px] border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-linear-to-r from-orange-400 to-red-500 text-white text-lg rounded-xl">
            <th className="py-3 px-4 rounded-l-xl">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4 rounded-r-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => (
            <tr
              key={el._id}
              className="bg-slate-50 hover:bg-orange-50 transition rounded-xl shadow border border-slate-100"
            >
              <td className="py-2 px-4 font-semibold text-slate-700 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-slate-800 font-medium">{el?.name}</td>
              <td className="py-2 px-4 text-slate-700">{el?.email}</td>
              <td className="py-2 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${el.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{el?.role}</span>
              </td>
              <td className="py-2 px-4 text-slate-500 text-sm">{moment(el?.createdAt).format("LL")}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition shadow"
                  onClick={() => {
                    setUpdateUserDetails(el);
                    setOpenUpdateRole(true);
                  }}
                  title="Edit user role"
                >
                  <MdModeEdit size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
