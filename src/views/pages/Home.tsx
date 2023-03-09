import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
  } from '@mui/material'

interface PushProps {
  title: string
}


const Home = (props: PushProps) => {
  const [err, setErr] = useState('')
  const [shortLink, setShortLink] = useState('Test')

  // Eyecandy
  console.log(err)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const longURL = data.get('url')
    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${longURL}&logstats=1`, {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }
      const result = await response.json()
      setShortLink(result.shorturl)
      console.log(result)

    } catch (err) {
      let errorMessage = "Failed to do something exceptional";
      if (err instanceof Error) {
        errorMessage = err.message
      }
      setErr(errorMessage)
    }

  }

  return (
    <Container component="main" maxWidth="xs" className="auth-form">
      <Typography variant="h2" className="auth-header">{props.title}</Typography>
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="url"
          label="URL"
          name="url"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Shorten URL
        </Button>
        <Typography variant="h1" component="h2">
          {shortLink}
        </Typography>
      </Box>
    </Container>
  )
}

export default Home