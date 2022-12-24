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

import DoneIcon from '@mui/icons-material/Done'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import publish from '../../utils/publish'
import getNoteFromServer from '../../utils/getNoteFromServer'
import useCookie from '../../lib/useCookie'
import { goBackOrReplace, hasBackStack } from '../../utils/routerUtils'

import { useRouter } from 'next/router'

function EditPage({ note }) {
    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState(note.content)

    const [accessToken, setAccessToken] = useCookie('foxbin_token', '', (token) => {}, () => {
        router.replace('/')
    })

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
                        onClick={() => { goBackOrReplace(router, '/') }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {router.query.slug}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <TextField 
                fullWidth 
                label="Slug" 
                margin="dense" 
                value={router.query.slug}
                disabled={true}
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
                    publish(router.query.slug, content, accessToken, setLoading, 'edit', (json) => { 
                        if (hasBackStack()) {
                            router.back()
                        } else {
                            router.replace('/' + json.slug)
                        }
                    })
                }}
            >
                <DoneIcon />
            </Fab>

            <Backdrop 
                open={loading} 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress />
            </Backdrop>
        </Box>
    )
}

export async function getServerSideProps({ req, res, params }) {
    return await getNoteFromServer(req, res, params)
}

export default EditPage