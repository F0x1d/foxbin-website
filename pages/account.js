import * as React from 'react'
import { useState, useEffect } from 'react' 

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ClearIcon from '@mui/icons-material/Clear'

import { useLocalStorage } from '../lib/useLocalStorage'
import { goBackOrReplace } from '../utils/routerUtils'

import { useRouter } from 'next/router'

function AccountPage() {
    const [accessToken, setAccessToken] = useLocalStorage('foxbinToken', '')
    const [name, setName] = useLocalStorage('foxbinName', '')

    const router = useRouter()

    if (accessToken === '') {
        router.replace('/')
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => { goBackOrReplace(router, "/") }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Button 
                variant="outlined" 
                startIcon={<ClearIcon />} 
                color="error" 
                onClick={() => {
                    setAccessToken('')
                    goBackOrReplace(router, "/")
                }}
            >
                Logout
            </Button>

            <Typography variant="h5" component="div" sx={{ flexGrow: 1, mt: 2 }}>
                I hope i will find time to add saved notes here...
            </Typography>
        </Box>
    )
}

export default AccountPage