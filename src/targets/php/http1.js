/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var helpers = require('./helpers')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    noTags: false,
    closingTag: false
  }, options)

  var code = new CodeBuilder(opts.indent)

  if (!opts.noTags) {
    code.push('<?php')
        .blank()
  }

  if (!~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(util.format('HttpRequest::methodRegister(\'%s\');', source.method))
  }

  code.push('$request = new HttpRequest();')
      .push(util.format('$request->setUrl(%s);', helpers.convert(source.url)))

  if (~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(util.format('$request->setMethod(HTTP_METH_%s);', source.method.toUpperCase()))
  } else {
    code.push(util.format('$request->setMethod(HttpRequest::HTTP_METH_%s);', source.method.toUpperCase()))
  }

  code.blank()

  if (Object.keys(source.queryObj).length) {
    code.push(util.format('$request->setQueryData(%s);', helpers.convert(source.queryObj, opts.indent)))
        .blank()
  }

  if (Object.keys(source.headersObj).length) {
    code.push(util.format('$request->setHeaders(%s);', helpers.convert(source.headersObj, opts.indent)))
        .blank()
  }

  if (Object.keys(source.cookiesObj).length) {
    code.push(util.format('$request->setCookies(%s);', helpers.convert(source.cookiesObj, opts.indent)))
        .blank()
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.push(util.format('$request->setContentType(%s);', helpers.convert(source.postData.mimeType)))
          .push(util.format('$request->setPostFields(%s);', helpers.convert(source.postData.paramsObj, opts.indent)))
          .blank()
      break

    default:
      if (source.postData.text) {
        code.push(util.format('$request->setBody(%s);', helpers.convert(source.postData.text)))
            .blank()
      }
  }

  code.push('try {')
      .push(1, '$response = $request->send();')
      .blank()
      .push(1, 'echo $response->getBody();')
      .push('} catch (HttpException $ex) {')
      .push(1, 'echo $ex;')
      .push('}')

  if (opts.closingTag) {
    code.blank()
        .push('?>')
  }

  return code.join()
}

module.exports.info = {
  key: 'http1',
  title: 'HTTP v1',
  link: 'http://php.net/manual/en/book.http.php',
  description: 'PHP with pecl/http v1'
}