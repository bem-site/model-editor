module.exports = function (config) {
    config.nodes('src/*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/file-provider'), { target: '?.bemdecl.js' }],
            [require('enb-bem-techs/techs/files')],
            [require('enb-bem-techs/techs/deps')],
            [require('enb-bemxjst/techs/bemtree'), { devMode: false }],
            [require('enb-diverse-js/techs/browser-js'), { target: '?.pre.js' }],
            [require('enb-modules/techs/prepend-modules'), {
                target: '?.js',
                source: '?.pre.js'
            }],
            [require('enb-stylus/techs/css-stylus'), { target: '?.noprefix.css' }],
            [require('enb-bemxjst/techs/bemhtml'), { devMode: false }]
        ]);

        nodeConfig.addTargets([
            '?.min.css',
            '?.min.bemtree.js',
            '?.min.js',
            '?.min.bemhtml.js'
        ]);
    });

    config.nodes('src/common.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-bem-techs/techs/levels'), { levels: getDesktops(config) }],
            [require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: [ 'last 2 versions', 'ie 10', 'ff 24', 'opera 12.16' ],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });

    config.mode('development', function (modeConfig) {
        config.nodes('src/*.bundles/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '?.min.css' }],
                [require('enb/techs/file-copy'), { sourceTarget: '?.bemtree.js', destTarget: '?.min.bemtree.js' }],
                [require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '?.min.js' }],
                [require('enb/techs/file-copy'), { sourceTarget: '?.bemhtml.js', destTarget: '?.min.bemhtml.js' }]
            ]);
        });
    });

    config.mode('production', function () {
        config.nodes('src/*.bundles/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '?.min.css' }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.bemtree.js', destTarget: '?.min.bemtree.js' }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '?.min.js' }],
                [require('enb-borschik/techs/borschik'), { sourceTarget: '?.bemhtml.js', destTarget: '?.min.bemhtml.js' }]
            ]);
        });
    });
};

function getDesktops(config) {
    return [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        'src/common.blocks',
    ].map(function (level) {
            return config.resolvePath(level);
        });
}
