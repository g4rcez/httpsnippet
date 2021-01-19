// Type definitions for httpsnippet 1.23
// Project: https://github.com/Kong/httpsnippet
// Definitions by: Marcell Toth <https://github.com/marcelltoth>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Copy and paste from https://github.com/DefinitelyTyped/DefinitelyTyped
// Just make a update for my personal project

import { Har, Request } from "har-format";

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = HTTPSnippet;

/*~ Write your module's methods and properties in this class */
declare class HTTPSnippet {
  constructor(data: HTTPSnippet.Data);

  convert(target: Languages, options?: HTTPSnippet.Options): string | false;

  convert(
    target: Languages,
    client?: HttpClient,
    options?: HTTPSnippet.Options
  ): string | false;

  static addTarget(target: HTTPSnippet.Target): void;

  static addTargetClient(
    target: string,
    client: HTTPSnippet.TargetClient
  ): void;

  static availableTargets: string[];

  static extName(target: string): string;
}

declare namespace HTTPSnippet {
  type Data = Har | HttpSnippetRequest;

  type Options = object;

  interface TargetClientInfo {
    key: string;
    title: string;
    link?: string;
    description?: string;
  }

  interface TargetClient {
    (source: Request, options: Options): string;
    info: TargetClientInfo;
  }

  interface TargetInfo<C extends string> {
    key: string;
    title: string;
    extname: string;
    default: C;
  }

  type Target<C extends string = string> = {
    info: TargetInfo<C>;
  } & Record<C, TargetClient>;
}

export type HttpMethods =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

interface HttpSnippetRequest {
  /** Request method (`GET`, `POST`, ...). */
  method: HttpMethods;
  /** Absolute URL of the request (fragments are not included). */
  url: string;
  /** Request HTTP Version. */
  httpVersion?: "HTTP/1.0" | "HTTP/1.1" | "HTTP/2.0";
  /** List of cookie objects. */
  cookies?: Cookie[];
  /** List of header objects. */
  headers?: Header[];
  /** List of query parameter objects. */
  queryString?: QueryString[];
  /** Posted data info. */
  postData?: PostData;
  /**
   * Total number of bytes from the start of the HTTP request message until
   * (and including) the double CRLF before the body.
   *
   * Set to `-1` if the info is not available.
   */
  headersSize?: number;
  /**
   * Size of the request body (POST data payload) in bytes.
   *
   * Set to `-1` if the info is not available.
   */
  bodySize?: number;
  /**  A comment provided by the user or the application */
  comment?: string;
}

export type Languages =
  | "c"
  | "clojure"
  | "csharp"
  | "go"
  | "http"
  | "java"
  | "javascript"
  | "kotlin"
  | "node"
  | "objc"
  | "ocaml"
  | "php"
  | "powershell"
  | "python"
  | "r"
  | "ruby"
  | "shell"
  | "swift";
export type HttpClient =
  | "cohttp"
  | "native"
  | "python3"
  | "requests"
  | "helpers"
  | "clj_http"
  | "curl"
  | "wget"
  | "httpie"
  | "httr"
  | "okhttp"
  | "unirest"
  | "asynchttp"
  | "nethttp"
  | "okhttp"
  | "http2"
  | "curl"
  | "helpers"
  | "http1"
  | "restmethod"
  | "webrequest"
  | "common"
  | "http1.1"
  | "nsurlsession"
  | "helpers"
  | "restsharp"
  | "httpclient"
  | "axios"
  | "fetch"
  | "xhr"
  | "jquery"
  | "axios"
  | "native"
  | "request"
  | "unirest"
  | "fetch"
  | "nsurlsession"
  | "helpers"
  | "libcurl"
  | "native";
