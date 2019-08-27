const { env } = process;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStarts = function (message) {
  console.info('===================================');
  console.info(message);
  console.info('===================================');
};

export default {
  mongodbUri: 'mongodb://localhost:27017/test',
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};

//Mon-Fri, Sun 4 pm - 12 pm / Sat 12 pm - 10:30 pm