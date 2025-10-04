import { App } from '../theme-default/App'
import { renderToString } from 'react-dom/server'

export const renderSSRPage = () => {
  return renderToString(<App />)
}
