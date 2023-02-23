## Diff-checker

![img](https://raw.githubusercontent.com/peterroe/static-img/master/20230201004613.png)

## Todo

* `preeval diff`
* `preeval "*/packages/*.ts"`
* `preeval src/index.ts`

### Public Structure

```ts
interface Data {
  fileName: string
  codeContent: string
}

interface NameMap {
  fileName: string
  codeContent: string
  suggestions: string
}

interface Plugin {
  autoDetectLang: boolean
  language?: string
  name: string
  run: () => Data[]
}
```