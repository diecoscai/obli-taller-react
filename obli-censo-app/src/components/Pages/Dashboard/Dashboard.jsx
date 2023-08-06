import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import Main from './Main';

const Dashboard = () => {
  const userLogged = useSelector((state) => state.user.userLogged);

  return (
    <>
      <Main />
    </>
  );
};

export default Dashboard;
