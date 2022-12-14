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
import EditIcon from '@mui/icons-material/Edit'

import getNoteFromServer from '../utils/getNoteFromServer'
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

function NotePage({ note }) {
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

                    
                    { note.editable && (
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => { router.push('/e/' + router.query.slug) }}
                        >
                            <EditIcon />
                        </IconButton>
                    )}

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

            <div style={{ whiteSpace: "pre", fontFamily: "monospace", overflowX: "auto", overflowY: "hidden" }}>{note.content}</div>

            <AlertDialog open={dialogOpened} onClose={(value) => { setDialogOpened(false) }} />
        </Box>
    )
}

export async function getServerSideProps({ req, res, params }) {
    return await getNoteFromServer(req, res, params)
}

export default NotePage