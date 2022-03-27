import React, { useState } from 'react';
import './styles.css';
import Header from './Header';
import { Container, createTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/system';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';





function App() {

  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleToggleDarkMode={handleToggleDarkMode}/>
      <Container>
        <Route path='/' exact component={HomePage}/>
        <Route path='/catalog' exact component={Catalog}/>
        <Route path='/catalog/:id' component={ProductDetails}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/Contact' component={ContactPage}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
