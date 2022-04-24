import {sassPlugin} from 'esbuild-sass-plugin'
import {build, BuildOptions, serve} from "esbuild";
import * as fs from "fs";


const commonOption: BuildOptions = {
    entryPoints: ['assets/main.ts', 'assets/redirector.ts', "assets/scss/main.scss", 'assets/katex.css'],
    target: "esnext",
    bundle: true,
    sourcemap: true,
    minify: true,
    outdir: "public/assets",
    plugins: [sassPlugin()],
    loader: {
        ".ttf": "file",
        ".woff": "file",
        ".woff2": "file",
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
        serve({
            port: 1234,
            servedir: "public"
        }, commonOption).catch((e) => {
            console.error(e)
            process.exit(1)
        }).then(data => console.log(data))
        break
    default:
        console.log(process.argv)
}


