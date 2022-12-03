import * as React from 'react'
import { useState, useEffect } from 'react' 

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import Avatar from '@mui/material/Avatar'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ClearIcon from '@mui/icons-material/Clear'
import NoteIcon from '@mui/icons-material/Note'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'

import { useLocalStorage } from '../lib/useLocalStorage'
import { goBackOrReplace } from '../utils/routerUtils'
import request from '../utils/apiUtils'

import { useRouter } from 'next/router'

function fetchUserNotes(accessToken, setNotes) {
    request('https://foxbin.f0x1d.com/getAll?accessToken=' + accessToken, {}, (json) => {
        setNotes(json.notes)
    }, (error) => {
        alert(error)
    })
}

function deleteNote(accessToken, slug, setLoading, setNotes) {
    setLoading(true)

    request('https://foxbin.f0x1d.com/delete/' + slug + '?accessToken=' + accessToken, {}, (json) => {
        setLoading(false)
        setNotes((notes) => notes.filter((note, i) => note.slug !== slug))
    }, (error) => {
        setLoading(false)
        alert(error)
    })
}

function UserNote({ slug, date }, router, accessToken, setLoading, setNotes) {
    return(
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => { deleteNote(accessToken, slug, setLoading, setNotes) }}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton onClick={() => { router.push('/' + slug) }}>
                <ListItemAvatar>
                    <Avatar>
                        <NoteIcon />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={slug}
                    secondary={new Date(date).toUTCString()}
                />
            </ListItemButton>
        </ListItem>
    )
}

function AccountPage() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)

    const [accessToken, setAccessToken] = useLocalStorage('foxbinToken', '', (accessToken) => { 
        fetchUserNotes(accessToken, setNotes)
    }, () => { 
        router.replace('/')
    })
    const [name, setName] = useLocalStorage('foxbinName', '')

    const router = useRouter()

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

                    { accessToken !== undefined && (
                        <IconButton
                            size="large"
                            color="inherit"
                            edge="end"
                            onClick={() => {
                                setAccessToken('')
                                goBackOrReplace(router, "/")
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />

            <List>
                {
                    notes.map((note) => UserNote(note, router, accessToken, setLoading, setNotes))
                }
            </List>

            <Backdrop 
                open={loading} 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress />
            </Backdrop>
        </Box>
    )
}

export default AccountPage