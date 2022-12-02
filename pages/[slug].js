import * as React from 'react'
import { useState, useEffect } from 'react' 

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import WarningIcon from '@mui/icons-material/Warning'

import { goBackOrReplace } from '../utils/routerUtils'

import { useRouter } from 'next/router'

function AlertDialog({ open, onClose }) {
    return(
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Information</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    This is user-generated content. If you think it breaks any laws, contact me on i@f0x1d.com
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose() }}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

function NotePage({ data }) {
    const [dialogOpened, setDialogOpened] = useState(false)

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
                        {router.query.slug}
                    </Typography>

                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={() => { setDialogOpened(true) }}
                    >
                        <WarningIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <p style={{ whiteSpace: "pre", fontFamily: "monospace" }}>{data.note.content}</p>

            <AlertDialog open={dialogOpened} onClose={(value) => { setDialogOpened(false) }} />
        </Box>
    )
}

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const response = await fetch("https://foxbin.f0x1d.com/get/" + context.params.slug)
    const data = await response.json()

    if (data.error) {
        return {
            notFound: true
        }
    }
  
    return { 
        props: { 
            data
        } 
    }
}

export default NotePage