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

// src/utils/fuelList.ts
var fuelList_exports = {};
__export(fuelList_exports, {
  fuelList: () => fuelList
});
module.exports = __toCommonJS(fuelList_exports);
var fuelList = [
  "GASOLINA COMUM",
  "OLEO DIESEL B S500 COMUM",
  "GASOLINA COMUM ADITIVADA",
  "ETANOL HIDRATADO COMBUSTIVEL",
  "GAS NATURAL VEICULAR",
  "OLEO DIESEL B S10 COMUM",
  "OLEO DIESEL B S500 ADITIVADO",
  "O.D. B S10 ADITIVADO",
  "OLEO DIESEL B S10 ADITIVADO",
  "GASOLINA ADITIVADA",
  "ETANOL ADITIVADO",
  "OLEO DIESEL B S500",
  "GASOLINA PREMIUM PODIUM",
  "DIESEL EXTRA",
  "OLEO DIESEL B S10 ADITIVADO ",
  "ALCOOL COMUM",
  "GASOLINA SUPRA",
  "TESTE",
  "GASOLINA PREMIUM C ADIT PODIUM",
  "OLEO DIESEL B S-10",
  "ETANOL HIDRATADO COMBUSTIVEL COMUM",
  "O.D B S10 ADITIVADO ",
  "O.D B S500 ADITIVADO",
  "GASOLINA PODIUM",
  "DIESEL COMUM",
  "O.D B S10 ADITIVADO",
  "GASOLINA PREMIUM",
  "OLEO DIESEL S500 ADITIVADO",
  "ARLA32 GRANEL",
  "GASOLINA C PREMIUM PODIUM ADITIVADO",
  "OLEO DIESEL B S10 ",
  "ETANOL HIDRATADO COMUM",
  "GASOLINA C ADITIVADA",
  "GAS PREMIUM",
  "ARLA 32 GRANEL",
  "ETANOL COMUM",
  "GASOLINA COMUM  ADITIVADA",
  "SHELL EVOLUX DIESEL S500 ADITIVADO",
  "GASOLINA C PREMIUM PODIUM ADITIVADA"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fuelList
});
