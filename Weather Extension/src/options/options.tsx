import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/roboto"
import "./options.css"
import {
  Card,
  CardContent,
  TextField,
  Stack,
  Typography,
  styled,
  Switch,
  Paper,
  Box,
  Button,
} from "@mui/material"
import {
  getStoredOptions,
  LocalStorageOtions,
  setStoredOptions,
} from "../utils/storage"

type FormState = "ready" | "saving"

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}))

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOtions | null>(null)
  const [formState, setFormState] = useState<FormState>("ready")

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    setOptions((prevOptions) => {
      if (!prevOptions) return null

      return {
        ...prevOptions,
        homeCity,
      }
    })
  }

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions((prevOptions) => {
      if (!prevOptions) return null

      return {
        ...prevOptions,
        hasAutoOverlay,
      }
    })
  }

  const handleSaveButtonClick = () => {
    if (!options) return
    setFormState("saving")
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 800)
    })
  }

  if (!options) {
    return null
  }

  const isFieldDisabled = formState === "saving"

  return (
    <Box sx={{ mx: "20%", my: "5%" }}>
      {" "}
      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Item>
              <Typography variant="h4">
                Weather Extension Options Page
              </Typography>
            </Item>
            <Item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter home city"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldDisabled}
              />
            </Item>
            <Item>
              <Typography variant="body1">
                Auto toggle overlay on website load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldDisabled}
              />
            </Item>
            <Item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Item>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<App />)
