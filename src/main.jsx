import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HUD } from './HUD'
import { Landing } from './Landing'
import { InfoModal } from './InfoModal'
import { useStore } from './components/store'
import { InformationDialog } from './InformationDialog'
import {GameOver} from './GameOver'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <HUD />
    <Landing />
    <InfoModal />
    <InformationDialog />
    <GameOver />
  </React.StrictMode>,
)
