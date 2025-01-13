"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/Controllers/clientController.ts
var clientController_exports = {};
__export(clientController_exports, {
  default: () => clientController_default
});
module.exports = __toCommonJS(clientController_exports);

// src/Services/clientService.ts
var import_whatsapp_web = __toESM(require("whatsapp-web.js"));
var qrcode = __toESM(require("qrcode-terminal"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var { Client, LocalAuth } = import_whatsapp_web.default;
var ClientService = class {
  clientServer() {
    return __async(this, null, function* () {
      try {
        const path = process.env.ROTA;
        this.client = new Client({
          webVersionCache: {
            type: "remote",
            remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.24.7.72.html"
          },
          puppeteer: {
            headless: true,
            executablePath: path,
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-accelerated-2d-canvas",
              "--disable-gpu",
              "--window-size=800,600",
              "--disable-application-cache",
              "--disk-cache-size=0",
              "--media-cache-size=0"
            ]
          },
          authStrategy: new LocalAuth({ dataPath: ".wwebjs_auth" })
        });
        this.client.on("qr", (qr) => {
          qrcode.generate(qr, { small: true });
        });
        this.client.on("ready", () => {
          console.log("Client is ready!");
        });
        yield this.client.initialize();
      } catch (err) {
        console.error("Error initializing client:", err);
        throw err;
      }
    });
  }
};
var clientService_default = new ClientService();

// src/Controllers/clientController.ts
var clientController = class {
  clientWpp(req, res) {
    return __async(this, null, function* () {
      try {
        yield clientService_default.clientServer();
        res.status(200).send("WhatsApp client initialized successfully");
      } catch (error) {
        console.error("Error initializing WhatsApp client:", error);
        res.status(500).send("Failed to initialize WhatsApp client");
      }
    });
  }
};
var clientController_default = new clientController();
