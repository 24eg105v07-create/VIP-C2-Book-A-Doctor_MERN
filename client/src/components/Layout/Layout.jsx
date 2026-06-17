import {
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaBell,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { logout } from "../../redux/features/authSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const userMenu = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: <FaUserMd />,
  },

  ...(user?.isDoctor
    ? []
    : [
        {
          name: "Apply Doctor",
          path: "/apply-doctor",
          icon: <FaUserMd />,
        },
      ]),

  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaCalendarAlt />,
  },

  {
    name: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaHome />,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: <FaUsers />,
    },
  ];

  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/doctor",
      icon: <FaHome />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <FaCalendarAlt />,
    },
  ];

  let menuToRender = userMenu;

  if (user?.role === "admin") {
    menuToRender = adminMenu;
  }

  if (user?.role === "doctor") {
    menuToRender = doctorMenu;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}

      <div className="sidebar">
        <div className="logo">
          Book A Doctor
        </div>

        {menuToRender.map((menu) => (
          <div
            key={menu.path}
            className={`menu-item ${
              location.pathname ===
              menu.path
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(menu.path)
            }
          >
            <span
              style={{
                marginRight: "10px",
              }}
            >
              {menu.icon}
            </span>

            {menu.name}
          </div>
        ))}

        <div
          className="menu-item"
          onClick={handleLogout}
        >
          <FaSignOutAlt
            style={{
              marginRight: "10px",
            }}
          />

          Logout
        </div>
      </div>

      {/* Main Area */}

      <div className="main-content">
        <div className="header">
          <h3>
            Welcome, {user?.name}
          </h3>

          <h4>
            Role : {user?.role}
          </h4>
        </div>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;