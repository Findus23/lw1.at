import {sassPlugin} from 'esbuild-sass-plugin'
import {build, BuildOptions, context} from "esbuild";
import * as fs from "fs";


const commonOption: BuildOptions = {
    entryPoints: ['assets/main.ts', 'assets/redirector.ts', "assets/scss/main.scss", 'assets/katex.css'],
    target: "esnext",
    format: "esm",
    bundle: true,
    sourcemap: true,
    minify: true,
    outdir: "public/assets",
    splitting: true,
// @ts-ignore https://github.com/glromeo/esbuild-sass-plugin/issues/109
    plugins: [sassPlugin()],
    loader: {
        ".ttf": "file",
        ".woff": "file",
        ".woff2": "file",
        ".svg": "text",
        ".png": "base64"
    },
    entryNames: "[name]"
}


switch (process.argv[2]) {
    case "build":
        commonOption.metafile = true
        commonOption.entryNames = "[name]-[hash]"
        build(commonOption).then(result => {
            fs.writeFileSync(commonOption.outdir + "/meta.json", JSON.stringify(result.metafile))
        })
        break
    case "serve":
        commonOption.minify = false
        commonOption
        context(commonOption).then(ctx => {
            ctx.serve({
                port: 1234,
                servedir: "public"
            }).catch((e) => {
                console.error(e)
                process.exit(1)
            }).then(data => console.log(data))
        })
        break
    default:
        console.log(process.argv)
}


