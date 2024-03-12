import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom';
import HomePage from 'scenes/homepage'; // the main purpose of jsconfig.json is depicted here . if we not use jsconfig.json then we have to write the path like this ../scenes/homepage
import LoginPage from 'scenes/loginpage';
import ProfilePage from 'scenes/profilepage';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {CssBaseline,ThemeProvider} from '@mui/material';
import {themeSettings} from './theme';
import {createTheme} from '@mui/material/styles';


function App() {
  const mode=useSelector((state)=>state.mode);  // it grabs the state for different modes
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const isAuth=Boolean(useSelector((state)=>state.token)); // it checks whether token exists or not
   // CSSbaseline is used to remove the default css and resets to new css created by material ui.
   // it makes sure that material ui css is applied throughout the application.
  return (
    <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={isAuth ?<HomePage /> : <Navigate to="/"/>} />
      <Route path="/profile/:userId" element={isAuth ?<ProfilePage /> : <Navigate to="/"/>} />
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
