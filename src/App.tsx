import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Router from './Router.tsx';
import { GlobalStyle } from './styles/global.styled.ts';
import { defaultTheme } from './styles/themes/defaultTheme.ts';
import { CyclesContextProvider } from './contexts/CyclesContext.tsx';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
