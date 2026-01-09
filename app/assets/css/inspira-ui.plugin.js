// Wrapper to expose setupInspiraUI as default export for Tailwind v4 @plugin directive
// The @plugin directive requires a default export, but @inspira-ui/plugins uses named exports
import { setupInspiraUI } from '@inspira-ui/plugins'

export default setupInspiraUI
