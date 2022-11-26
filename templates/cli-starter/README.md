## cli-starter

A command line tool template.

## Try it now!

[Create repo from this template on Github](https://github.com/peterroe/cli-starter/generate)

Or:

```bash
$ npx degit peterroe/cli-starter my-cli
$ cd my-cli
$ git init
$ pnpm i    # npm install -g pnpm
```

## Development

Modify `package.json` 

```diff
{
- "name": "cli-starter",
+ "name": "my-cli",
  "bin": {
-    "cli-starter": "./bin/index.mjs"
+    "my-cli": "./bin/index.mjs"
  },
```

Then you can link your cli tool to global

```shell
$ pnpm stub
$ pnpm link --global
```

## Example

This command will help you understand **how cli tool works**:

```bash
$ my-cli -h # show help
$ my-cli -v # show version
$ my-cli lint one two --name peterroe # demo usage
```

And then you can rewrite `src/index.ts` to what you want

Here are some projects that use `cli-starter`: [renames](https://github.com/peterroe/renames)、[tind](https://github.com/peterroe/tind)

More usage about `cac` please see [cac](https://github.com/cacjs/cac#simple-parsing)

## Build && Publish

Build it:

```shell
$ pnpm build
```

Publish to npm:

```shell
$ git remote add origin xxx # make sure you have bound a repo
$ git push origin main 
$ pnpm release # or npm publish directly
```

## Try yourself!

Install **your own** command line tool:

```
$ npm install -g xxx
$ xxx -h
$ xxx -v
```

Then use it...