var path = require('path'),
    fs = require('fs'),
    Logger = require('bem-site-logger'),
    Server = require('../src/server');

try {
    var config,
        logger,
        server;

    config = JSON.parse(fs.readFileSync('./configs/config.json', { encoding: 'utf-8' }));
    logger = Logger.setOptions(config.logger).createLogger(module);

    logger
        .info('-- initialize model editor --')
        .debug('configuration parameters:')
        .debug('path: %s', config.path || 'N/A')
        .debug('port: %s', config.port || 'N/A');

    server = new Server(config);
    server.start();
} catch (error) {
    throw error;
}
