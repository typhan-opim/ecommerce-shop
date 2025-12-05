import useClickOutside from "@/helpers/useClickOutside";
import { useContext, useRef, useState } from "react";
import ROLE from "@/common/role";
import Context from "@/context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { data:user} = useCurrentUser();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);
  useClickOutside(menuRef, () => setMenuDisplay(false));
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState<string>(searchQuery);

  const handleLogout = () => {
    localStorage.removeItem("auth-store");
    window.location.reload();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="h-16 shadow-md bg-white fixed left-0 top-0 w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <Link to={"/"}>
          <img src="/assets/logo-quick.svg" alt="logo" className="h-10" />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border border-slate-300 rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none pl-2"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-10 flex items-center justify-center rounded-r-full text-slate-600 cursor-pointer">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center" ref={menuRef}>
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute left-1/2 -translate-x-1/2 top-11 min-w-[120px] bg-white rounded-xl shadow-2xl border border-slate-100 py-1.5 z-50 animate-fadeIn">
                <nav className="flex flex-col gap-0.5 px-1.5 py-0.5">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="whitespace-nowrap flex items-center gap-2 rounded-lg px-2 py-1 text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                      onClick={() => setMenuDisplay(false)}
                    >
                      <span className="i-lucide-layout-dashboard text-lg" />{" "}
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/order"
                    className="whitespace-nowrap flex items-center gap-2 rounded-lg px-2 py-1 text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                    onClick={() => setMenuDisplay(false)}
                  >
                    <span className="i-lucide-list-ordered text-lg" /> Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <svg
                width={24}
                height={24}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 0.75H3.75L5.76 10.7925C5.82858 11.1378 6.01643 11.448 6.29066 11.6687C6.56489 11.8895 6.90802 12.0067 7.26 12H14.55C14.902 12.0067 15.2451 11.8895 15.5193 11.6687C15.7936 11.448 15.9814 11.1378 16.05 10.7925L17.25 4.5H4.5M7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM15.75 15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75Z"
                  stroke="#4b5563"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <rect width={18} height={18} fill="white" />
                </defs>
              </svg>

              <div className="bg-orange-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="inline-flex gap-1 items-center px-3 py-1 rounded-full text-white bg-slate-600 hover:bg-slate-700"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M7.66667 10.1667L10.1667 7.66667M10.1667 7.66667L7.66667 5.16667M10.1667 7.66667H1M5.16667 3.70716V3.66683C5.16667 2.73341 5.16667 2.26635 5.34832 1.90983C5.50811 1.59623 5.76289 1.34144 6.0765 1.18166C6.43302 1 6.90008 1 7.8335 1H11.6668C12.6003 1 13.0663 1 13.4228 1.18166C13.7364 1.34144 13.9921 1.59623 14.1519 1.90983C14.3333 2.266 14.3333 2.73249 14.3333 3.66409V11.6696C14.3333 12.6012 14.3333 13.0671 14.1519 13.4232C13.9921 13.7368 13.7364 13.9921 13.4228 14.1519C13.0667 14.3333 12.6008 14.3333 11.6692 14.3333H7.83076C6.89916 14.3333 6.43267 14.3333 6.0765 14.1519C5.76289 13.9921 5.50811 13.7366 5.34832 13.423C5.16667 13.0665 5.16667 12.6001 5.16667 11.6667V11.625"
                      stroke="#ffffff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
