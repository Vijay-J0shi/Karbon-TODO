import { Link, useNavigate } from 'react-router-dom';
// import { FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import todoIcon from '../assets/todolist2.svg';
import { CiLogout } from "react-icons/ci";
import { useAuth0 } from '@auth0/auth0-react'
import { MdLogin } from "react-icons/md"

export default function Navbar({ user }) {
  const { serverUrl } = useContext(authDataContext);
  const { isAuthenticated ,logout} =useAuth0();
  const handleLogout = async () => {
  try {
    
    await axios.post(
      `${serverUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  
    toast.success('Logout Successfully');
    if(isAuthenticated){
      logout({ logoutParams: { returnTo: window.location.origin } })
    }else
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  return (
    <nav
      className="h-15 sm:h-[60px] top-0 flex justify-between items-center shadow-md pr-[2%]"
      style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-primary)',
        padding: '1rem',
        fontFamily: 'var(--ff)',
        fontSize: 'var(--fs-base)',
        lineHeight: 'var(--lh)',
      }}
    >
      <div className="flex items-center gap-4">
     
        <img src={todoIcon} alt="TOdo Icon" className=' w-[70px] h-[50px] '/>
        <h1 className=' font-bold'>KarbonTODO</h1>
      </div>
      <div className="space-x- flex gap-[30px]">
        {!user ? (
          <>
            <Link
              to="/login"
              style={{
                color: 'var(--color-primary)',
                fontSize: 'var(--fs-base)',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              <MdLogin className='size-[30px]' />
               Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: 'var(--color-primary)',
                fontSize: 'var(--fs-base)',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              <MdLogin className='size-[30px]' />
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontSize: 'var(--fs-base)',
              cursor: 'pointer',
            }}
            className="hover:underline"
          ><CiLogout  className=' size-[40px]'/>
          </button>
        )}
      </div>
    </nav>
  );
}
