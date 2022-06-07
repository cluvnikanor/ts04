import { Link } from "react-router-dom";

interface NavbarProps {
  navbarMessage: string;
  isLogin: boolean;
  logout: () => void;
}

function Navbar({ navbarMessage, isLogin, logout }: NavbarProps) {

  const links = [
    {
      id: 5,
      path: '/users',
      text: 'משתמשים',
    },
    {
      id: 3,
      path: '/mandala',
      text: 'מנדלות',
    },
    {
      id: 4,
      path: isLogin ? '/' : '/login',
      text: isLogin ? 'יציאה' : 'כניסה',
    },
    {
      id: 2,
      path: '/',
      text: 'בית',
    },
    {
      id: 1,
      path: '/user',
      text: 'שלום ' + navbarMessage,
    },
  ]

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        {links.map(link =>
          <li key={link.id}>
            {link.text == 'יציאה' ?
              <Link
                onClick={logout}
                to={link.path} className="nav-link">
                {link.text}
              </Link>
              :
              <Link
                to={link.path} className="nav-link">
                {link.text}
              </Link>
            }
          </li>
        )}
        {/* {navbarMessage} */}
      </div>
    </nav>
  )
}
export default Navbar;