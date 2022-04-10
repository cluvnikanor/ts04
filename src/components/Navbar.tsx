import { Link } from "react-router-dom";

function Navbar() {
  const links = [
    {
      id: 1,
      path: '/tutorials',
      text: 'Tutorials',
    },
    {
      id: 2,
      path: '/add',
      text: 'Add',
    },
    {
      id: 3,
      path: '/mandala',
      text: 'Mandala',
    },
    {
      id: 4,
      path: '/login',
      text: 'Login',
    },
  ]
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        {links.map(link =>
          <li key={link.id}>
            <Link to={link.path} className="nav-link">
              {link.text}
            </Link>
          </li>
        )}
      </div>
    </nav>
  )
}
export default Navbar;