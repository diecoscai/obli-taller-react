import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from '../../SideBar/SideBar'
//import { onInitialLoad } from '../../../app/slices/toDosSlice'

const Dashboard = () => {
    const userLogged = useSelector(state => state.user.userLogged);

    return (
        <>
            <SideBar />
        </>
    )
}

export default Dashboard
