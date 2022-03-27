import { AppBar, Switch, Toolbar, Typography } from "@material-ui/core";

interface Props {
    handleToggleDarkMode: () => void;
}

export default function Header({handleToggleDarkMode}: Props) {

    return(
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    ReStore
                </Typography>
                <Switch color='default' onChange={handleToggleDarkMode}/>
            </Toolbar>
        </AppBar>
    )
}