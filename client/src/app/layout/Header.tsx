import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";



interface Props {
    handleToggleDarkMode: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({ handleToggleDarkMode }: Props) {

    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' sx={navStyles} exact>
                        ReStore
                    </Typography>
                    <Switch color='default' onChange={handleToggleDarkMode} />
                </Box>



                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>

                    {user ? (
                        <>
                            <IconButton size='large' sx={{ color: 'inherit' }} component={Link} to="/basket">
                                <Badge badgeContent={itemCount} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                            <   SignedInMenu />
                        </>
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )
                    }

                </Box>



            </Toolbar>
        </AppBar>
    )
}