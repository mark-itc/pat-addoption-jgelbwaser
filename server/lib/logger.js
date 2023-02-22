const winston = require('winston');
const fs = require('fs');

const errorLogFile = './logs/error.log';
const combinedLogFile = './logs/combined.log';

// const myFormatFile = winston.format.printf(({ level, message, timestamp, stack }) => {
//   const log = { level, message, timestamp };
//   if (stack) log.stack = stack;
//   return JSON.stringify(log);
// });


// const myFormatConsole = winston.format.printf(({ level, message, timestamp, stack }) => {
//   if (stack) {
//     stack = stack.replace(/\n/g, '\n    '); // Replace all occurrences of \n with line breaks
//   }
//   return `${timestamp} [${level}] ${message} ${stack ? `\n    ${stack}` : ''}`;
// });



//LOGGER

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: errorLogFile, level: 'error' }),
    new winston.transports.File({ filename: combinedLogFile })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.errors({ stack: true }),
    )
  }));
}


// CREATE LOG FILES AND FOLDER IF DON'T EXIST:

  function createFileIfDoesNotExists(filePath) {
      if (!fs.existsSync(filePath)) {
          // If not, create the file
          fs.closeSync(fs.openSync(filePath, 'w'));
        }
  }
  createFileIfDoesNotExists(errorLogFile);
  createFileIfDoesNotExists(combinedLogFile)
  
  function handleError (error) {
    logger.error({error: error.stack })
  }; 

  
  module.exports.handleError = handleError;
  module.exports.logger = logger;