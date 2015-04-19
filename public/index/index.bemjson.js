module.exports = {
    block: 'page',
    title: 'BEM Site model editor',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: '' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: './public/index/_index.css' },
        { elem: 'css', url: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' }
    ],
    scripts: [
        { elem: 'js', url: './libs/jquery/dist/jquery.js' },
        { elem: 'js', url: './libs/underscore/underscore.js' },
        { elem: 'js', url: './libs/backbone/backbone.js' },
        { elem: 'js', url: './libs/marionette/lib/backbone.marionette.js' },
        { elem: 'js', url: './public/index/_index.js' }
    ],
    content: {
        block: 'application'
        //content: [
        //    {
        //        block: 'header',
        //        mix: { block: 'app', elem: 'header' },
        //        title: 'User\'s issues'
        //    },
        //    // Обязательный элемент блока app,
        //    // в него будут вставляться таблицы
        //    {
        //        elem: 'content'
        //    }
        //]
    }
};

