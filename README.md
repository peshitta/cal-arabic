# cal-arabic

[![npm version](https://badge.fury.io/js/cal-arabic.svg)](https://badge.fury.io/js/cal-arabic)
[![npm module downloads](http://img.shields.io/npm/dt/cal-arabic.svg)](https://www.npmjs.org/package/cal-arabic)
[![Build Status](https://travis-ci.org/peshitta/cal-arabic.svg?branch=master)](https://travis-ci.org/peshitta/cal-arabic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peshitta/cal-arabic/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/peshitta/cal-arabic.svg)](https://david-dm.org/peshitta/cal-arabic)
[![devDependencies Status](https://david-dm.org/peshitta/cal-arabic/dev-status.svg)](https://david-dm.org/peshitta/cal-arabic?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/peshitta/cal-arabic/badge.svg?branch=master)](https://coveralls.io/github/peshitta/cal-arabic?branch=master)

CAL Code to Arabic Unicode conversion

## Installation

In order to use this library, [Node.js](https://nodejs.org) should be installed. 
Then run:
```
npm install cal-arabic --save
```

Following bundles are available:
* `cal-arabic.js` - UMD ES5 version for use in browser, node, etc.
* `cal-arabic.min.js` - minified version of `cal-arabic.js`
* `cal-arabic.esm.js` - ES6 module version, suitable for bundling with other 
libraries and applications

The package could also be downloaded directly from:
[https://registry.npmjs.org/cal-arabic/-/cal-arabic-1.0.3.tgz](https://registry.npmjs.org/cal-arabic/-/cal-arabic-1.0.3.tgz)

## More information

[Peshitta App](https://peshitta.github.io)

[Beth Mardutho](https://sedra.bethmardutho.org/about/fonts)

[CAL](http://cal1.cn.huc.edu/searching/fullbrowser.html)

## License

[MIT](https://github.com/peshitta/cal-arabic/blob/master/LICENSE)

## Contributing

The final goal for this work is to learn the Word of God as recorded by
[Peshitta](https://en.wikipedia.org/wiki/Peshitta).
You are welcomed to improve this implementation or provide feedback. Please
feel free to [Fork](https://help.github.com/articles/fork-a-repo/), create a
[Pull Request](https://help.github.com/articles/about-pull-requests/) or
submit [Issues](https://github.com/peshitta/cal-arabic/issues).
Thank you!

## Development

```
npm install
```
```
npm run build
```

## API Reference

* [calArabic](#module_calArabic)
    * [.mapper](#module_calArabic.mapper) : <code>Mapper</code>
    * [.toArabic](#module_calArabic.toArabic) ⇒ <code>string</code>

<a name="module_calArabic.mapper"></a>

### calArabic.mapper : <code>Mapper</code>
Arabic Mapper

**Kind**: static constant of [<code>calArabic</code>](#module_calArabic)  
<a name="module_calArabic.toArabic"></a>

### calArabic.toArabic ⇒ <code>string</code>
Convert from CAL to Arabic

**Kind**: static constant of [<code>calArabic</code>](#module_calArabic)  
**Returns**: <code>string</code> - the input word converted to Arabic Unicode  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | input word in CAL code transliteration |

