import { ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { User } from './models/user';
import * as DailyEntriesApi from "./network/dataEntries_api";
import DashboardPage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFountPage';
import RegisterPage from './pages/RegisterPage';
import styles from "./styles/App.module.css";
import { themeSettings } from './theme';
import EntriesPage from './pages/EntriesPage';


function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await DailyEntriesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch(error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <div>
        <NavBar 
          loggedInUser={loggedInUser}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route 
              path='/dashboard'
              element={<DashboardPage loggedInUser={loggedInUser} />}
            />
            <Route 
              path='/entries'
              element={<EntriesPage />}
            />
            <Route 
              path='/login'
              element={<LoginPage 
                onLoginSuccessful={(user) => {
                setLoggedInUser(user);
              }}
            />}
            
            />
            <Route 
              path='/register'
              element={<RegisterPage 
                onRegisterSuccessful={(user) => {
                  setLoggedInUser(user);
              }}
            />}
            />
            <Route
              path='/*'
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>
      </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
