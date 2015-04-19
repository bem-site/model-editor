modules.define('application', ['i-bem__dom', 'BEMHTML'], function (provide, BEMDOM, BEMHTML) {
    'use strict';
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    console.log('application block initialization');

                    var Application = new Backbone.Marionette.Application();
                    var AppController = Backbone.Marionette.Controller.extend({
                        displayBooks : function (){
                            console.log("I will display books...");
                        } });
                    var AppRouter = Backbone.Marionette.AppRouter.extend({
                        controller :  AppController,
                        appRoutes: {
                            "": "displayBooks"
                        }
                    });
                    Application.addInitializer(function () {
                        var controller = new AppController();
                        var router = new AppRouter({ controller:controller });
                        console.log("hello from the addInitializer.");
                    });
                    Application.on('initialize:after', function () {
                        if (Backbone.history) {
                            Backbone.history.start();
                        }
                        console.log("hello from the initialize:after.");
                    });
                    Application.start();
                }
            }
        }
    }));
});
