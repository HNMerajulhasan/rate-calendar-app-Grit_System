
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import rateCalendarLogo from '../../assets/RateCalendarLogo.svg'
import Image from 'next/image';
import my_image from '../../assets/my_image.jpg'
import Link from 'next/link';


const settings = [
  {
    id:1,
    title:'My Portfolio', 
    href:'https://merajulhasanlatestportfolio.netlify.app/'
  },
  {
    id:2,
    title:'GitHub', 
    href:'https://github.com/HNMerajulhasan'
  },
  {
    id:3,
    title:'LinkedIn', 
    href:'https://www.linkedin.com/in/h-m-merajul-hasan-62687b23a/'
  },
  
 
   ];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className='header_design'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

     <div className='navbar_design'>
     <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 10,
              // display: {},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image src={rateCalendarLogo} alt='rateCalendarLogo' className='logo_design'/>
          
          </Typography>


        

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 10,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
            Rate Calendar
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image src={my_image} alt='my_image' className='my_image'/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '65px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                   <Link href={setting.href} target='blank'>{setting.title}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </div>      

       
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
