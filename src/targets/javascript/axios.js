/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
"use strict";

var util = require("util");
var stringifyObject = require("stringify-object");
var CodeBuilder = require("../../helpers/code-builder");

module.exports = function (source, options) {
  var opts = Object.assign(
    {
      indent: "  ",
    },
    options
  );

  var code = new CodeBuilder(opts.indent);

  code.push('import axios from "axios";').blank();

  var reqOpts = {
    method: source.method,
    url: source.url,
  };

  if (Object.keys(source.queryObj).length) {
    reqOpts.params = source.queryObj;
  }

  if (Object.keys(source.allHeaders).length) {
    reqOpts.headers = source.allHeaders;
  }

  switch (source.postData.mimeType) {
    case "application/x-www-form-urlencoded":
      reqOpts.data = source.postData.paramsObj;
      break;

    case "application/json":
      if (source.postData.jsonObj) {
        reqOpts.data = source.postData.jsonObj;
      }
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

      reqOpts.data = "[form]";
      break;

    default:
      if (source.postData.text) {
        reqOpts.data = source.postData.text;
      }
  }

  code
    .push(
      "const options = %s;",
      stringifyObject(reqOpts, {
        indent: "  ",
        singleQuotes: false,
        inlineCharacterLimit: 120,
      }).replace('"[form]"', "form")
    )
    .blank();

  code.push("const request = async () => {");
  code
    .push(1, util.format("try {"))
    .push(2, util.format("const response = await axios.request(options)"))
    .push(2, "console.log(response.data);")
    .push(1, util.format("} catch (error) {"))
    .push(2, "console.error(error);");
  code.push(1, "}");
  code.push("}");
  code.push("request();");

  return code.join("\n");
};

module.exports.info = {
  key: "axios",
  title: "Axios",
  link: "https://github.com/axios/axios",
  description: "Promise based HTTP client for the browser and node.js",
};
