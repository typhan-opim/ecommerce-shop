import SummaryApi from "@/common";
import Context from "@/context";
import { postData } from "@/services/apiService";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ResponseSignIn = {
  success: boolean;
  error: boolean;
  data: string;
  expiresAt: number;
  message: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  type ContextType = {
    fetchUserDetails: () => void;
    fetchUserAddToCart: () => void;
  } | null;
  const context = useContext(Context) as ContextType;
  const fetchUserDetails = context?.fetchUserDetails || (() => {});
  const fetchUserAddToCart = context?.fetchUserAddToCart || (() => {});

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataApi = await postData<ResponseSignIn>(SummaryApi.signIN.url, data);

    if (dataApi.success) {
      localStorage.setItem("auth-store", JSON.stringify(dataApi.data));
      //toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  // console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-7 w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-slate-100">
          <div className="w-24 h-24 mx-auto mb-2">
            <img
              src={"./assets/signin.gif"}
              alt="login icons"
              className="object-cover w-full h-full rounded-full shadow-lg border-4 border-orange-100"
            />
          </div>

          <form
            className="pt-6 flex flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className="text-slate-500 text-sm transition-all pointer-events-none"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className={`py-3 peer w-full px-4 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent`}
                placeholder=" "
                autoComplete="off"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-slate-500 text-sm transition-all pointer-events-none"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className={`py-3 peer w-full px-4 rounded-lg border border-slate-200 bg-slate-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-base transition placeholder-transparent pr-12`}
                  placeholder=" "
                  autoComplete="current-password"
                />
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
            </div>
            {/* <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto hover:underline hover:text-orange-600 text-sm font-medium mt-1"
            >
              Forgot password?
            </Link> */}
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 w-full rounded-full font-semibold text-lg shadow hover:scale-[1.03] transition-all mt-2 tracking-wide">
              Login
            </button>
          </form>
          <p className="my-5 text-center text-slate-500">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-orange-600 hover:text-orange-700 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
