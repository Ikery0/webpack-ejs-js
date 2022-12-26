const webpackConfig = (MODE) => {
  // productionのときはソースマップを利用しない
  const enabledSourceMap = MODE === 'development';

  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

  //ベースファイルのパス設定
  const srcPaths = {
    js: `${__dirname}/src/assets/js/`,
    ejs: `${__dirname}/src/ejs/`,
    sass: `${__dirname}/src/assets/sass/`,
  };

  //ejsビルド
  const entriesHTML = WebpackWatchedGlobEntries.getEntries([`${srcPaths.ejs}**/*.ejs`], {
    ignore: `${srcPaths.ejs}**/_*.ejs`,
  })();
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader');
  const htmlGlobPlugins = (entries) => {
    return Object.keys(entries).map(
      (key) =>
        new HtmlWebpackPlugin({
          //出力ファイル名
          filename: `${key}.html`,
          //ejsファイルの読み込み
          template: htmlWebpackPluginTemplateCustomizer({
            htmlLoaderOption: {
              //ファイル自動読み込みと圧縮を無効化
              sources: false,
              minimize: false,
            },
            templatePath: `${srcPaths.ejs}${key}.ejs`,
          }),
  
          //JS・CSS自動出力と圧縮を無効化
          inject: false,
          minify: false,
        }),
    );
  };
  
  const entriesJS = WebpackWatchedGlobEntries.getEntries([`${srcPaths.js}**/**.js`], {
    ignore: `${srcPaths.js}**/_*.js`,
  })();
  
  //sassファイル分割
  const entriesScss = WebpackWatchedGlobEntries.getEntries([`${srcPaths.sass}**/**.scss`], {
    ignore: `${srcPaths.sass}**/_*.scss`,
  })();
  
  const cssGlobPlugins = (entriesScss) => {
    return Object.keys(entriesScss).map(
      (key) =>
        new MiniCssExtractPlugin({
          //出力ファイル名
          filename: `assets/css/${key}.css`,
        }),
    );
  };
  
  return {
    mode: MODE,
    devtool: 'source-map',
  
    // エントリーポイント
    entry: entriesJS,
  
    output: {
      path: `${__dirname}/dist/`,
      filename: 'assets/js/[name].js',
      clean: true, //clean up dist folder when you build
    },
  
    // 実行時にブラウザが自動的に localhost:8080 を開く
    devServer: {
      port: 8000,
      hot: true, //
      static: `${__dirname}/dist`,
      open: true,
      watchFiles: ['src/**/*.ejs', 'src/**/*.scss'],
    },
    target: 'web', //ローカルサーバのリロードを有効化する
  
    module: {
      rules: [
        //ejs
        {
          test: /\.ejs$/i,
          use: ['html-loader', 'template-ejs-loader'],
        },
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          use: [
            {
              // Babel を利用する
              loader: 'babel-loader',
              // Babel のオプションを指定する
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
        // Sassファイルの読み込みとコンパイル
        {
          test: /\.scss/, // 対象となるファイルの拡張子
          use: [
            // CSSファイルを書き出すオプションを有効にする
            {
              loader: MiniCssExtractPlugin.loader,
            },
            // CSSをバンドルするための機能
            {
              loader: 'css-loader',
              options: {
                // オプションでCSS内のurl()メソッドを取り込む
                url: false,
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,
  
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },
  
            // PostCSSのための設定
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: enabledSourceMap,
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', { grid: true }],
                    ['postcss-normalize-charset', {}],
                    ['postcss-sort-media-queries', {}],
                  ],
                },
              },
            },
  
            {
              loader: 'sass-loader',
              options: {
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,
              },
            },
          ],
        },
  
        {
          test: /\.scss$/,
          use: 'glob-import-loader',
        },
  
        //CSS内の画像読み込み設定
        // {
        //   test: /\.(gif|png|jpg|svg|webp)$/,
        //   // 閾値以上だったら埋め込まずファイルとして分離する
        //   type: 'asset',
        //   parser: {
        //     dataUrlCondition: {
        //       // 4KB以上だったら埋め込まずファイルとして分離する
        //       maxSize: 4 * 1024,
        //     },
        //   },
        //   //書き出し設定
        //   generator: {
        //     filename: 'assets/images/[name][ext]',
        //   },
        // },
  
        //CSS内のWebfont読み込み設定
        // {
        //   test: /\.(ttf|otf|eot|woff|woff2)$/,
        //   // 閾値以上だったら埋め込まずファイルとして分離する
        //   type: 'asset',
        //   parser: {
        //     dataUrlCondition: {
        //       // 4KB以上だったら埋め込まずファイルとして分離する
        //       maxSize: 4 * 1024,
        //     },
        //   },
        //   //書き出し設定
        //   generator: {
        //     filename: 'assets/fonts/[name][ext]',
        //   },
        // },
      ],
    },
  
    plugins: [
      // CSSファイルを外だしにするプラグイン
      ...cssGlobPlugins(entriesScss),
  
      ...htmlGlobPlugins(entriesHTML),
  
      new CopyPlugin({
        patterns: [
          //画像コピー
          {
            from: `${__dirname}/src/assets`,
            to: `${__dirname}/dist/assets`,
          },
        ],
      }),
    ],
  
    // node_modules を監視（watch）対象から除外
    watchOptions: {
      ignored: /node_modules/,
    },
  
    // ES5(IE11等)向けの指定
    //target: ['web', 'es5'],
  };
}

module.exports = { webpackConfig };



