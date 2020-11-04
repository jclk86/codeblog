import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from 'components/ThemeToggle';
// import { useTheme } from 'providers/ThemeProvider';

// useTheme provides themeAPI - object of theme and toggleTheme
// ***useTheme is now being passed to navBar component via props***
function BlogNavbar({theme, toggleTheme}) {
  // this is the hook needed to access the values from ThemeProvider at root of app. Need in all components
  // useContext will take value from nearest provider and if values change, will rerender. 
  // const { theme, toggleTheme } = useTheme();
  return (
    <Navbar
      variant={theme.type}
      className="fj-navbar fj-nav-base"
      bg="transparent"
      expand="lg" >
      <Navbar.Brand className="fj-navbar-brand">
        <Link href="/">
          <a style={{color: theme.fontColor}}>Filip-Jerga</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        {/* div */}
          <ThemeToggle onChange={toggleTheme}/>
          <Nav.Link
            as={() => 
              <Link href='/'>
                <a className="fj-navbar-item fj-navbar-link">Home</a>
              </Link>
            }
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default BlogNavbar;
