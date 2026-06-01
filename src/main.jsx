import React from 'react'
import ReactDOM from 'react-dom/client'
import mixpanel from 'mixpanel-browser'
import { hotjar } from 'react-hotjar'
import App from './App'
import './index.css'

const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN
const hotjarId = Number(import.meta.env.VITE_HOTJAR_ID)
const hotjarVersion = Number(import.meta.env.VITE_HOTJAR_SV)

if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: false,
    track_pageview: true,
    autocapture: true,
    record_sessions_percent: 100,
  })
  mixpanel.track('app_loaded')
}

if (hotjarId) {
  hotjar.initialize(hotjarId, hotjarVersion)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
