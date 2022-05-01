import { Link } from "react-router-dom";

interface NavbarProps {
  headerMessage: string;
  isLogin: boolean;
  logout: () => void;
}

function Navbar({ headerMessage, isLogin, logout }: NavbarProps) {

  const links = [
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
      id: 5,
      path: '/Admin',
      text: 'כלי ניהול',
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
        {headerMessage}
      </div>
    </nav>
  )
}
export default Navbar;