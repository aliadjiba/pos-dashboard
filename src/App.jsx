import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveAppBar from './components/AppBar';
import { Navbar } from './components';
import Router from './routes';
import styled from '@emotion/styled';
import { purple,grey } from '@mui/material/colors';

const theme = createTheme({
  styles:{
    border: {
      main: `1px solid ${grey[300]}`,
      radius:`8px`
    },
  },
  palette: {
    primary: purple,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root:({theme})=> ({
          boxShadow: 'none',
          background:theme.palette.common.white,
        }),
      },
    },
  },
});

const Root = styled('div')({
  padding:'0',
  display:'flex',
  flexDirection:'row',
  minHeight:'100vh'
})
const Container = styled('div')({
  width:'calc(100% - 65px)',
  minHeight:'100vh',
  background:'#fafafa',
  display:'flex',
  flexDirection:'column'
})
const Main = styled('main')({
  height:'100%'
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <CssBaseline />
        <Navbar />
        <Container>
          <ResponsiveAppBar />
          <Main>
            <Router />
          </Main>
        </Container>
      </Root>
    </ThemeProvider>
  );
}
