import SideBar from '../Dashboard/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div className="container-fluid dashboard">
        <SideBar />
        <div className="col-9= mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
