import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "@/common";
import imageTobase64 from "@/helpers/imageTobase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imagePic = await imageTobase64(file);
    setData((preve) => ({
      ...preve,
      profilePic: typeof imagePic === "string" ? imagePic : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-7 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-slate-100">
          <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full shadow-lg border-4 border-orange-100 mb-2 group">
            <img
              src={data.profilePic || "./assets/signin.gif"}
              alt="login icons"
              className="object-cover w-full h-full"
            />
            <label className="absolute bottom-0 left-0 w-full bg-black/60 text-xs text-white text-center py-2 cursor-pointer opacity-80 group-hover:opacity-100 transition-opacity">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>

          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="peer w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent"
                placeholder=" "
                autoComplete="off"
              />
              <label className={`absolute left-4 top-0.5 text-slate-500 text-sm transition-all pointer-events-none
                ${data.name ? 'top-0.5 text-xs' : 'top-3.5 text-base'}
                peer-focus:top-0.5 peer-focus:text-xs
              `}>Name</label>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="peer w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent"
                placeholder=" "
                autoComplete="off"
              />
              <label className={`absolute left-4 text-slate-500 text-sm transition-all pointer-events-none
                ${data.email ? 'top-0.5 text-xs' : 'top-3.5 text-base'}
                peer-focus:top-0.5 peer-focus:text-xs
              `}>Email</label>
            </div>
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="peer w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent pr-12"
                placeholder=" "
                autoComplete="new-password"
              />
              <label className={`absolute left-4 top-0.5 text-slate-500 text-sm transition-all pointer-events-none
                ${data.password ? 'top-0.5 text-xs' : 'top-3.5 text-base'}
                peer-focus:top-0.5 peer-focus:text-xs
              `}>Password</label>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-slate-400 hover:text-orange-600"
                onClick={() => setShowPassword((preve) => !preve)}
                tabIndex={0}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className="peer w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent pr-12"
                placeholder=" "
                autoComplete="new-password"
              />
              <label className={`absolute left-4 top-0.5 text-slate-500 text-sm transition-all bg-white pointer-events-none
                ${data.confirmPassword ? 'top-0.5 text-xs' : 'top-3.5 text-base'}
                peer-focus:top-0.5 peer-focus:text-xs
              `}>Confirm Password</label>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-slate-400 hover:text-orange-600"
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                tabIndex={0}
                role="button"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 w-full rounded-full font-semibold text-lg shadow hover:scale-[1.03] transition-all mt-2 tracking-wide">
              Sign Up
            </button>
          </form>
          <p className="my-5 text-center text-slate-500">
            Already have an account?{' '}
            <Link
              to={"/login"}
              className="text-orange-600 hover:text-orange-700 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
