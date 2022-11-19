
import { getErrorMessage } from './message'


function showError(response:any) {
    if (response.data) {
        const data = response.data
        if (data.error) {
            const message = getErrorMessage(data.error)
            return message
        } else {
            return "error en la operacion"
            // toast.error('Error en la operación')
        }
    }
}


export { showError }