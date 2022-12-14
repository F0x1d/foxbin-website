import * as React from 'react'
import { useState, useEffect } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import DoneIcon from '@mui/icons-material/Done'
import AccountIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'

import publish from '../utils/publish'
import request from '../utils/apiUtils'
import useCookie from '../lib/useCookie'

import { useRouter } from 'next/router'

function authRequest(urlEnding, username, password, setLoading, setAccessToken) {
    setLoading(true)

    request('https://foxbin.f0x1d.com/users/' + urlEnding, {
        method: "POST",
        headers: { "Content-Type": "application/json", "charset": "UTF-8" },
        body: JSON.stringify({ "username": username, "password": password })
    }, (json) => {
        setLoading(false)
        setAccessToken(json.accessToken)
    }, (error) => {
        setLoading(false)
        alert(error)
    })
}

function LoginDialog({ open, onClose, setLoading, setAccessToken, setName }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return(
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Login</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    foxbin account can be used to save your notes
                </DialogContentText>

                <TextField 
                    fullWidth 
                    value={username} 
                    onChange={(event) => { setUsername(event.target.value) }} 
                    label="Login" 
                    margin="dense" 
                />
                <TextField 
                    fullWidth 
                    type="password"
                    value={password} 
                    onChange={(event) => { setPassword(event.target.value) }} 
                    label="Password" 
                    margin="dense" 
                />
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={() => { 
                        onClose()
                        setName(username)
                        authRequest('register', username, password, setLoading, setAccessToken)
                    }}
                >
                    Register
                </Button>

                <Button 
                    onClick={() => { 
                        onClose()
                        setName(username)
                        authRequest('login', username, password, setLoading, setAccessToken) 
                    }}
                >
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function MainPage() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')

    const [accessToken, setAccessToken] = useCookie('foxbin_token', '')
    const [name, setName] = useCookie('foxbin_name', '')

    const router = useRouter()

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        foxbin
                    </Typography>
                    { accessToken !== undefined && (
                        <IconButton
                            size="large"
                            color="inherit"
                            edge="end"
                            onClick={() => {
                                if (accessToken === '') {
                                    setLoginOpen(true)
                                } else {
                                    router.push('/account')
                                }
                            }}
                        >
                            { accessToken === '' ? <LoginIcon /> : <AccountIcon /> }
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />

            <TextField 
                fullWidth 
                label="Slug" 
                margin="dense" 
                value={slug} 
                onChange={(event) => { setSlug(event.target.value) }} 
            />
            
            <TextField 
                multiline 
                fullWidth 
                label="Content" 
                margin="dense" 
                value={content} 
                onChange={(event) => { setContent(event.target.value) }} 
            />

            <Fab 
                color="primary" 
                sx={{ position: "fixed", bottom: (theme) => theme.spacing(2), right: (theme) => theme.spacing(2) }}
                onClick={() => { 
                    publish(slug, content, accessToken, setLoading, 'create', (json) => { router.push('/' + json.slug) }) 
                }}
            >
                <DoneIcon />
            </Fab>

            <LoginDialog 
                open={loginOpen} 
                onClose={(value) => setLoginOpen(false)} 
                setLoading={setLoading} 
                setAccessToken={setAccessToken} 
                setName={setName}
            />

            <Backdrop 
                open={loading} 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress />
            </Backdrop>
        </Box>
    )
}

export default MainPage