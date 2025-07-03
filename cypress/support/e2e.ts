import './commands'

// @ts-ignore
Cypress.on('uncaught:exception', (err: any, runnable: any) => {
  return false
})
