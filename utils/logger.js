class Logger {
  static info(message) 
  {
    console.log(`[INFO ] [${new Date().toISOString()}] ${message}`);
  }

  static warn(message)
{
    console.warn(`[WARN ] [${new Date().toISOString()}] ${message}`);
  }

  static error(message) 
  {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
  }

  static debug(message, data) 
  {
    console.debug(`[DEBUG] [${new Date().toISOString()}] ${message}`);
    if (data) {
      console.dir(data, { depth: null });
    }
  }
}

module.exports = Logger;
