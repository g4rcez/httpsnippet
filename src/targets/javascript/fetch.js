/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

"use strict";

var util = require("util");
var CodeBuilder = require("../../helpers/code-builder");

module.exports = function (source, options) {
  var opts = Object.assign(
    {
      indent: "  ",
      credentials: null,
    },
    options
  );

  var code = new CodeBuilder(opts.indent);

  options = {
    method: source.method,
    headers: source.allHeaders,
  };

  if (opts.credentials !== null) {
    options.credentials = opts.credentials;
  }

  switch (source.postData.mimeType) {
    case "application/x-www-form-urlencoded":
      options.body = source.postData.paramsObj
        ? source.postData.paramsObj
        : source.postData.text;
      break;

    case "application/json":
      options.body = JSON.stringify(source.postData.jsonObj);
      break;

    case "multipart/form-data":
      code.push("const form = new FormData();");

      source.postData.params.forEach(function (param) {
        code.push(
          "form.append(%s, %s);",
          JSON.stringify(param.name),
          JSON.stringify(param.value || param.fileName || "")
        );
      });

      code.blank();
      break;

    default:
      if (source.postData.text) {
        options.body = source.postData.text;
      }
  }

  code.push("const request = async () => {");
  code
    .push(1, util.format("try {"))
    .push(
      2,
      `const response = await fetch("${source.fullUrl}", ${JSON.stringify(
        options,
        null,
        Number.parseInt(opts.indent || 2)
      )});`
    );
  if (source.postData.mimeType === "application/json") {
    code.push(2, "const json = await response.json();");
    code.push(2, "console.log(json)");
  }
  code
    .push(2, "console.log(response);")
    .push(1, util.format("} catch (error) {"))
    .push(2, "console.error(error);");
  code.push(1, "}");
  code.push("}");
  code.push("request();");

  return code.join("\n");
};

module.exports.info = {
  key: "fetch",
  title: "fetch",
  link:
    "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
  description: "Perform asynchronous HTTP requests with the Fetch API",
};
