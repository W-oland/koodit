const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    loger.info('Body:', request.body)
    logger.info('-----')
    next()
}

