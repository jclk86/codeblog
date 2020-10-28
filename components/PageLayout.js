import { Container } from 'react-bootstrap';
import NavBar from './Navbar';

// A wrapper 
function PageLayout({ children, className }) {
  return (
    <Container>
      <NavBar />
      <div className={`page-wrapper ${className}`}>
        {children}
      </div>
      <footer className="page-footer">
        <div>
          <a href="#">courses</a>{' | '}
          <a href="#">github</a>{' | '}
          <a href="#">facebook</a>
        </div>
      </footer>
    </Container>
  )
}

export default PageLayout