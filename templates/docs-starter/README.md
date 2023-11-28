## docs-starter

A docs template by vitepress

## Try it now!

```bash
$ pnpm create un
# or
$ pnpm create un [my-project] -t docs-starter
```

Init git hook(optional)

```shell
$ pnpm git-hook-init
```

## Development

```shell
$ pnpm dev
```

## Build

Build your documentation

```shell
$ pnpm build
```

## Publish

Publish your document by [gh-pages](https://github.com/tschaub/gh-pages)

**Note**: 

* Make sure that remote repository is linked (git remote add origin xxxx)
* Keep the repository's name same as the `package.json`'s name

Then

```shell
$ pnpm deploy:docs
```

Then visit `https://[your-username].github.io/[your-repo-name]/`