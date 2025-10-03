import { createRoot } from "react-dom/client"
import { App } from "../theme-default/App";
console.log("!!CSR ENTRY!!")

function renderInBrowser() {
    const containerEl = document.getElementById("root");
    if (!containerEl) {
      throw new Error("#root element not found");
    }
    createRoot(containerEl).render(<App/>);
  }
  
  renderInBrowser();