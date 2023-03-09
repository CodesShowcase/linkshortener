import { useState } from 'react'
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField
  } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import clipboard from 'clipboard-copy'


  const Home = () => {
  const [err, setErr] = useState('')
  const [shortLink, setShortLink] = useState('')

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
      <CssBaseline />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
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
        <TextField
          margin="normal"
          fullWidth
          id="shortURL"
          name="shortURL"
          label="Short URL"
          value={shortLink}
          disabled
          sx={{ alignSelf: 'flex-end', width: '80%' }}
        />
        <Button
          onClick={() => { clipboard(shortLink) }}
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 1, width: '20%' }}
        >
          <ContentCopyIcon />
        </Button>
      </Box>
    </Container>
  )
}

export default Home