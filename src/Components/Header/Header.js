import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

function Header() {
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to leave this page?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        firebase.auth().signOut()
        history.push('/login')
      }
    }); 
  }

  return (
    <div className="headerParentDiv container-fluid">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'><OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className='login_logout'>{ user ? `Welcome ${user.displayName}` : <Link to='/login'>Login</Link>}</span>
          <hr />
        </div>
          {user && <span className='login_logout' onClick={handleLogout}> Logout</span>}
          <Link to='/create'>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
