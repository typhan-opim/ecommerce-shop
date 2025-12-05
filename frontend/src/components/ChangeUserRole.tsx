import { useState } from "react";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "@/common";
import ROLE from "@/common/role";
import { postData } from '@/services/apiService';

interface ChangeUserRoleProps {
  name: string;
  email: string;
  role: string;
  userId: string;
  onClose: () => void;
  callFunc: () => void;
}

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
}: ChangeUserRoleProps) => {
  const [userRole, setUserRole] = useState(role);

  const roleOptions = Object.values(ROLE).map((el) => ({ value: el, label: el.charAt(0).toUpperCase() + el.slice(1) }));

  const handleOnChangeSelect = (option: { value: string; label: string } | null) => {
    if (option) setUserRole(option.value);
  };

  const updateUserRole = async () => {

    const responseData = await postData<any>(
      SummaryApi.updateUser.url,
      {
        userId: userId,
        role: userRole,
      }
    );

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }

    console.log("role updated", responseData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative mx-auto bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-orange-600 text-2xl p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-2xl font-bold text-slate-800 text-center tracking-wide">
          Change User Role
        </h1>
        <div className="grid md:grid-cols-2">
          <div>
            <span className="block text-slate-500 text-sm font-medium">
              Name
            </span>
            <span className="block text-base font-semibold text-slate-700">
              {name}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 text-sm font-medium">
              Email
            </span>
            <span className="block text-base font-semibold text-slate-700">
              {email}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="text-slate-600 font-medium mb-1">Role</label>
          <Select
            classNamePrefix="react-select"
            options={roleOptions}
            value={roleOptions.find((opt) => opt.value === userRole)}
            onChange={handleOnChangeSelect}
            isSearchable={false}
            styles={{
              control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: '#f59e42', minHeight: '44px' }),
              option: (base, state) => ({ ...base, color: state.isSelected ? '#fff' : '#1e293b', backgroundColor: state.isSelected ? '#f59e42' : state.isFocused ? '#fef3c7' : '#fff', fontWeight: 500 }),
            }}
          />
        </div>
        <button
          className="w-full mt-6 py-2 rounded-full bg-orange-600 text-white text-lg font-semibold shadow hover:bg-orange-700 transition"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
