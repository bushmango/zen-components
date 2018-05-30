// Advanced error handling
import { createLogger } from './../logger'
const logger = createLogger('unhandled-errors')
export function start(isProduction: boolean) {
  logger.x('Handling unhandled errors', 'Production?', isProduction)
  window.onerror = function unhandledErrorHandler(
    message,
    source,
    lineno,
    colno,
    error: any
  ) {
    logger.x('Unhandled error')
    if (!isProduction) {
      const el = document.getElementById('uncaught-error-reporter')
      if (el) {
        el.style.display = 'block'
      }
    }
    // return true
  }
}
// function testError() {
//   let test: any = ''
//   test.toFixed(123)
// }
// setTimeout(() => {
//   testError()
// }, 3000);
