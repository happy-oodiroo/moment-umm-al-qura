[![NPM version][npm-version-image]][npm-url] [![MIT License][license-image]][license-url]

moment-umm-al-qura
==============

A Hijri (Based on Umm al-Qura calculations) calendar system plugin for moment.js.

About
-----

Hijri is the Islamic lunar calendar used by Muslims to determine the proper days on which to observe the annual fasting, to attend Hajj, and to celebrate other Islamic holidays and festivals. More information about Hijri can be found at [wikipedia](https://en.wikipedia.org/wiki/Islamic_calendar).

This plugin adds Hijri calendar support to [momentjs](http://momentjs.com) library.

Where to use it?
---------------

Like `momentjs`, `moment-umm-al-qura` works in browser and in Node.js.

### Node.js

```shell
npm install moment-umm-al-qura
```


```js
var moment = require('moment-umm-al-qura');
moment().format('iYYYY/iM/iD');
```

### Browser
```html
<script src="moment.js"></script>
<script src="moment-umm-al-qura.js"></script>
<script>
	moment().format('iYYYY/iM/iD');
</script>
```

### Require.js

```js
require.config({
  paths: {
    "moment": "path/to/moment",
    "moment-umm-al-qura": "path/to/moment-umm-al-qura"
  }
});
define(["moment-umm-al-qura"], function (moment) {
  moment().format('iYYYY/iM/iD');
});
```

API
---

This plugin tries to mimic `momentjs` api. Basically, when formatting or parsing a string, add an `i` to the format token such as 'iYYYY' or 'iM'. For example:

```js
m = moment('1410/8/28', 'iYYYY/iM/iD'); // Parse a Hijri date.
m.format('iYYYY/iM/iD [is] YYYY/M/D'); // 1410/8/28 is 1990/3/25

m.iYear(); // 1410
m.iMonth(); // 7
m.iDate(); // 28
m.iDayOfYear(); // 236
m.iWeek(); // 35
m.iWeekYear(); // 1410

m.add(1, 'iYear');
m.add(2, 'iMonth');
m.add(1, 'idate');
m.format('iYYYY/iM/iD'); // 1411/10/29

m.iMonth(11);
m.startOf('iMonth');
m.format('iYYYY/iM/iD'); // 1411/12/1

m.iYear(1392);
m.startOf('iYear');
m.format('iYYYY/iM/iD'); // 1420/1/1

moment('1436/1/30', 'iYYYY/iMM/iDD').isValid(); // false (This month is only 29 days).
moment('1436/2/30', 'iYYYY/iMM/iDD').isValid(); // true (This month is 30 days).

moment('1436/2/6 16:40', 'iYYYY/iM/iD HH:mm').format('YYYY-M-D HH:mm:ss'); // 2014-11-28 16:40:00

moment('2014-11-28 16:40:00', 'YYYY-M-D HH:mm:ss').endOf('iMonth').format('iYYYY/iM/iD HH:mm:ss'); // 1436/2/30 23:59:59

// Complex parse:
moment('1990 5 25', 'YYYY iM D').format('YYYY/MM/DD'); // 1990/03/25
```

To use the Arabic locale:
- Load [moment-with-locales](http://momentjs.com/downloads/moment-with-locales.js).
- Set the global or local locale to `ar-SA` see [here](http://momentjs.com/docs/#/i18n/changing-locale/).
- use it normally :+1: 

Here is example:
```html
    <!-- 1- Load the moment-with-locales -->
    <script src="http://momentjs.com/downloads/moment-with-locales.min.js"></script>
    <script src="https://raw.githubusercontent.com/happy-oodiroo/moment-umm-al-qura/master/moment-umm-al-qura.js"></script>
    
    <script>
      moment.locale('ar-SA');// 2- Set the global locale to `ar-SA`
      m = moment();
      m.format('iYYYY/iM/iDهـ الموافق YYYY/M/Dم'); //3- use it normally 
      //١٤٣٧/٨/١٧هـ الموافق ٢٠١٦/٥/٢٤م
    </script>
```

Acknowledgements
-------
This project was built from the great work done by [@xsoh](https://github.com/xsoh) whose behind [moment-hijri](https://github.com/xsoh/moment-hijri) project. 

License
-------

MIT

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/moment-umm-al-qura
[npm-version-image]: http://img.shields.io/npm/v/moment-umm-al-qura.svg?style=flat

