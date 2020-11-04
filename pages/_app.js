
import ThemeProvider from 'providers/ThemeProvider';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { 
  faSun,
  faMoon,
  faBorderAll, 
  faList, 
  faSortNumericDown, 
  faSortNumericUp 
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false; // because importing styles.css from fontawesome below. 
library.add(
  faSun, 
  faMoon, 
  faList, 
  faBorderAll, 
  faSortNumericDown, 
  faSortNumericUp
  ); // the values are now 'list' and 'border-all', minus the 'fa'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/darcula.css'
import 'styles/index.scss';
import "react-toggle/style.css"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
