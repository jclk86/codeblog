import { ThemeContext, themes } from 'context/ThemeContext';
import { useState, useContext, useMemo } from 'react';

// useMemo: if component is rerendered, but has the same theme values, you don't want 
// the themes to be rerendered/reexecuted. 

// Responsible for keeping theme and toggling theme. 
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  }
  // return same object if no change in values in dependencies. If changed, then re-execute. 
  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme
    }
  }, [theme, toggleTheme]); // if these values will not change, themeAPI will not be re-executed.
  // Ensure you're using ThemeContext.Provider to provide the theme. It is a part of createContext's value;
  return (
    <ThemeContext.Provider value={themeAPI}>
      {children}
    </ThemeContext.Provider>
  )
}
// helper function to consume context 
// https://reactjs.org/docs/hooks-reference.html#usecontext
// anywhere you use useTheme, it gives you access to the value supplied in ThemeContext.Provider value={themeAPI}
// that object being themeAPI
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;

//default value of ThemeContext (value={}) is whatever you passed in createContext, which should at least be empty {}

// useContext: 
// Accepts a context object (the value returned from React.createContext) and returns the current 
  // context value for that context. The current context value is determined by the value prop of the 
  // nearest <MyContext.Provider> above the calling component in the tree.

// When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a rerender 
  // with the latest context value passed to that MyContext provider.