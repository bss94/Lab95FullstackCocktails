import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute.tsx';
import { Typography } from '@mui/material';
import { selectUser } from './features/Users/usersSlice.ts';
import { useAppSelector } from './app/hooks.ts';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import Layout from './UI/Layout/Layout.tsx';
import Cocktails from './features/Cocktails/Cocktails.tsx';
import NewCocktail from './features/Cocktails/NewCocktail.tsx';
import MyCocktails from './features/Cocktails/MyCocktails.tsx';
import OneCocktail from './features/Cocktails/OneCocktail.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Cocktails />} />
        <Route path="/cocktail/:id" element={<OneCocktail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/new-cocktail"
          element={
            <ProtectedRoute isAllowed={user !== null}>
              <NewCocktail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-cocktails"
          element={
            <ProtectedRoute isAllowed={user !== null}>
              <MyCocktails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
              <div />
            </ProtectedRoute>
          }
        >
          <Route path="coctails" element={<div />} />
          <Route path="users" element={<div />} />
        </Route>

        <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
      </Routes>
    </Layout>
  );
};

export default App;
