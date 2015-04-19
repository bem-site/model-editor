var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    express = require('express'),
    st = require('serve-static'),
    cookieParser = require('cookie-parser'),

    _ = require('lodash'),
    vow = require('vow'),
    inherit = require('inherit'),
    Logger = require('bem-site-logger'),
    Template = require('./template'),
    Server;

module.exports = Server = inherit({

    _options: undefined,
    _logger: undefined,
    _server: undefined,
    _master: undefined,
    _template: undefined,

    __constructor: function (options) {
        var _this = this;

        this._options = options;
        this._logger = Logger.setOptions(options['logger']).createLogger(module);
        this._template = new Template({ level: 'common', bundle: 'index' });

        if (!this._options.path) {
            throw new Error('path was not set');
        }

        this._options.path = path.resolve(this._options.path);

        this._server = express();
        this._server.set('port', options['port'] || 3000);
        this._server.enable('trust proxy');

        // add enb server middleware for development environment
        if (process.env['NODE_ENV'] === 'development') {
            this._server.use(require('enb/lib/server/server-middleware').createMiddleware({
                cdir: process.cwd(),
                noLog: false
            }));
        }

        this._server.use(st(process.cwd()));
        this._server.use(function (req, res, next) {
            _this._logger.info('retrieve request %s', req.path);
            next();
        });
        this._server.use(cookieParser());
        this._server.get('/', this.getRoutes().index.bind(this));
    },

    /**
     * Returns configured application title
     * @returns {*}
     */
    getTitle: function () {
        return this._options.title;
    },

    /**
     * Returns express app function
     * @returns {Function}
     */
    getApp: function () {
        return this._server;
    },

    getRoutes: function (){
        return {
            /**
             * Index route for / requests. Returns html page with list of snapshots
             * @param {Object} req - http request object
             * @param {Object} res - http response object
             */
            index: function (req, res) {
                vow.resolve({})
                    .then(function (context) {
                        return this._template.execute(
                            _.extend({ block: 'page', view: 'index' }, { data: context }), req);
                    }, this)
                    .then(function (html) {
                        res.status(200);
                        return res.end(html);
                    })
                    .fail(function (err) {
                        res.status(500);
                        return res.end(err);
                    })
                    .done();
            }
        };
    },

    /**
     * Starts express server
     */
    start: function (callback) {
        var _this = this,
            port = this._server.get('port');
        this._template.rebuild().then(function () {
            var server = this._server.listen(port, function (err) {
                _this._logger.info('Express server listening on port %s', port);
                callback && callback(err);
            });
            this.close = function () {
                server.close();
            };
        }, this);
    }
});
