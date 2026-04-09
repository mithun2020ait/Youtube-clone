class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        erroes = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.errors = erroes
        this.data = null
        this.message = message
        this.success = false

        if(stack) {
            this.stack = stack
        } else {
            error.capctureStackTrace(this, this.constructor)
        }
    }
}