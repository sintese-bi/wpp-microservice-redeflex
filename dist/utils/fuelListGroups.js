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

// src/utils/fuelListGroups.ts
var fuelListGroups_exports = {};
__export(fuelListGroups_exports, {
  fuelGroupedByCategory: () => fuelGroupedByCategory
});
module.exports = __toCommonJS(fuelListGroups_exports);
var fuelGroupedByCategory = {
  gasolinaComum: [
    "GASOLINA COMUM",
    "GASOLINA COMUM ADITIVADA",
    "GASOLINA ADITIVADA",
    "GASOLINA C ADITIVADA",
    "GASOLINA COMUM  ADITIVADA"
  ],
  gasolinaPodium: [
    "GASOLINA PREMIUM PODIUM"
  ],
  gasolinaPremium: [
    "GASOLINA PREMIUM",
    "GASOLINA SUPRA",
    "GASOLINA PREMIUM C ADIT PODIUM",
    "GASOLINA C PREMIUM PODIUM ADITIVADA"
  ],
  dieselS10: [
    "OLEO DIESEL B S10 COMUM",
    "O.D. B S10 ADITIVADO",
    "OLEO DIESEL B S10 ADITIVADO ",
    "OLEO DIESEL B S-10",
    "OLEO DIESEL B S10 ",
    "O.D B S10 ADITIVADO "
  ],
  dieselS500: [
    "OLEO DIESEL B S500 COMUM",
    "OLEO DIESEL B S500 ADITIVADO",
    "OLEO DIESEL B S500",
    "OLEO DIESEL S500 ADITIVADO",
    "O.D B S500 ADITIVADO"
  ],
  dieselExtra: ["DIESEL EXTRA"],
  dieselComum: ["DIESEL COMUM"],
  etanolComum: [
    "ETANOL HIDRATADO COMUM",
    "ETANOL COMUM",
    "ETANOL HIDRATADO COMBUSTIVEL COMUM"
  ],
  etanol: [
    "ETANOL HIDRATADO COMBUSTIVEL",
    "ETANOL ADITIVADO",
    "ETANOL HIDRATADO COMUM",
    "ETANOL COMUM",
    "ETANOL HIDRATADO COMBUSTIVEL COMUM"
  ],
  outros: [
    "GAS NATURAL VEICULAR",
    "ARLA32 GRANEL",
    "ARLA 32 GRANEL",
    "GAS PREMIUM",
    "SHELL EVOLUX DIESEL S500 ADITIVADO"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fuelGroupedByCategory
});
