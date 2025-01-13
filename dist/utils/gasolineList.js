"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/gasolineList.ts
var gasolineList_exports = {};
__export(gasolineList_exports, {
  gasolineGroup: () => gasolineGroup
});
module.exports = __toCommonJS(gasolineList_exports);
var gasolineGroup = {
  gasolinaComum: [
    "GASOLINA COMUM"
  ],
  gasolinaAditivada: [
    "GASOLINA COMUM ADITIVADA",
    "GASOLINA ADITIVADA",
    "GASOLINA C ADITIVADA",
    "GASOLINA COMUM  ADITIVADA"
  ],
  gasolinaPremium: [
    "GASOLINA PREMIUM PODIUM",
    "GASOLINA SUPRA",
    "GASOLINA PREMIUM C ADIT PODIUM",
    "GASOLINA PODIUM",
    "GASOLINA PREMIUM",
    "GASOLINA C PREMIUM PODIUM ADITIVADA"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gasolineGroup
});
