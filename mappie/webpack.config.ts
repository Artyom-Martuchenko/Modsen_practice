import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { ResetCenterView } from 'utils/ResetCenterView/ResetCenterView';

type Mode = 'development' | 'production'

interface EnvVariables {
    mode: Mode,
    port: number,
}

export default (env : EnvVariables) => {

    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry:{
            index: path.resolve(__dirname, 'src', 'index.tsx'),
            indexCSS: path.resolve(__dirname, 'public', 'index.css'),
            App: path.resolve(__dirname, 'src', 'components', 'App', 'App.tsx'),
            AppCSS: path.resolve(__dirname, 'src', 'components', 'App', 'App.css'),
            SideBar: path.resolve(__dirname, 'src', 'components', 'SideBar', 'SideBar.tsx'),
            SideBarCSS: path.resolve(__dirname, 'src', 'components', 'SideBar', 'SideBar.css'),
            Map: path.resolve(__dirname, 'src', 'components', 'Map', 'Map.tsx'),
            MapCSS: path.resolve(__dirname, 'src', 'components', 'Map', 'Map.css'),
            FirstSideBar: path.resolve(__dirname, 'src', 'components', 'FirstSideBar', 'FirstSideBar.tsx'),
            FirstSideBarCSS: path.resolve(__dirname, 'src', 'components', 'FirstSideBar', 'FirstSideBar.css'),
            List: path.resolve(__dirname, 'src', 'components', 'List', 'List.tsx'),
            ListCSS: path.resolve(__dirname, 'src', 'components', 'List', 'List.css'),
            Card: path.resolve(__dirname, 'src', 'components', 'Card', 'Card.tsx'),
            CardCSS: path.resolve(__dirname, 'src', 'components', 'Card', 'Card.css'),
            ListInfrastructure: path.resolve(__dirname, 'src', 'components', 'ListInfrastructure', 'ListInfrastructure.tsx'),
            ResetCenterView: path.resolve(__dirname, 'src', 'utils', 'ResetCenterView', 'ResetCenterView.tsx'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][contenthash:8].js',
            clean: true,
        },
        plugins:[
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            isProd && new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.css$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
                        "css-loader"
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node-modules/,
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            plugins: [new TsconfigPathsPlugin({    
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
            })],
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            open: true,
            port: env.port ?? 3000,// npm run start -- --env port=5000
        } : undefined,
    }
    return config;
}