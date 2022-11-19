
const ERRORS:any = {
    40003: 'El usuario ya existe',
}

function getErrorMessage(error:any) {
    if (!ERRORS[error.code]) {
        return 'Error en la operación'
    }

    if (error.code == 40002) {
        const fields = getErrorFields(error.message)
        let message = ERRORS[error.code]
        if (fields.length > 1) {
            message.replace('el', 'los')
            message.replace('campo', 'campos')
        }
        return `${message} ${fields.join(', ')}`
    }
    return ERRORS[error.code]
}

function getErrorFields(message:any) {
    const errorFields = message.split(',')
    const fields = errorFields.map((msg:any) => msg.split(' ')[2])
    return fields
}

export { getErrorMessage }