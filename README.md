# model-editor
WEB UI editor for bem-site model

### Model object specification

* `url` - {String} page url (required parameter)
* `oldUrls` - {Array} array of old urls. Default value - empty array `[]`
* `view` - {String} - page layout. Can be one of registered values
* `search` - {Object} - search annotation for sitemap.xml file creation
* `en` - {Object} source object for English page 
* `ru` - {Object} source object for Russian page

#### search fields: 
* `changefreq` - {String} search frequency. Default value: `weekly`
* `priority` - {Number} search priority. Number from 0 to 1.0. Default value: `0.5` 

#### language source object fields:

* `published` - {Boolean} - if true then current doc version is published. Default value - `true`
* `title` - {String} - page title (required parameter)
* `createDate` - {Number} - page creation date in milliseconds. Can be null.
* `authors` - {Array} array of string people keys. Default value - empty array `[]`
* `translators` - {Array} array of string people keys. Default value - empty array `[]`
* `tags` - {Array} array of string tags. Default value - empty array `[]`
* `sourceUrls` - {Array} of string paths to md files. 
Each of path can be full github url (as in a browser) or a full path to markdown file on local filesystem
