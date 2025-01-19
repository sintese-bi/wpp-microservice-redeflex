
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.18.0
 * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
 */
Prisma.prismaVersion = {
  client: "5.18.0",
  engine: "4c784e32044a8a016d99474bd02a3b6123742169"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Gas_station_setvariablesScalarFieldEnum = {
  gas_station_uuid: 'gas_station_uuid',
  gas_station_marginGC: 'gas_station_marginGC',
  gas_station_margin_DIESEL_GROUP: 'gas_station_margin_DIESEL_GROUP',
  gas_station_margin_DIESEL_GROUP_S500: 'gas_station_margin_DIESEL_GROUP_S500',
  gas_station_margin_GASOLINA_PODIUM: 'gas_station_margin_GASOLINA_PODIUM',
  gas_station_margin_GASOLINA_PREMIUM: 'gas_station_margin_GASOLINA_PREMIUM',
  gas_station_margin_ETANOL_COMUM: 'gas_station_margin_ETANOL_COMUM',
  gas_station_margin_TMP: 'gas_station_margin_TMP',
  gas_station_margin_MLT: 'gas_station_margin_MLT',
  gas_station_margin_TOTAL_PRODUCT: 'gas_station_margin_TOTAL_PRODUCT',
  gas_station_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'gas_station_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  gas_station_margin_FILTROS_AR_PRODUCT: 'gas_station_margin_FILTROS_AR_PRODUCT',
  gas_station_type_marginGC: 'gas_station_type_marginGC',
  gas_station_type_margin_DIESEL_GROUP: 'gas_station_type_margin_DIESEL_GROUP',
  gas_station_type_margin_DIESEL_GROUP_S500: 'gas_station_type_margin_DIESEL_GROUP_S500',
  gas_station_type_margin_GASOLINA_PREMIUM: 'gas_station_type_margin_GASOLINA_PREMIUM',
  gas_station_type_margin_ETANOL_COMUM: 'gas_station_type_margin_ETANOL_COMUM',
  gas_station_type_margin_GASOLINA_PODIUM: 'gas_station_type_margin_GASOLINA_PODIUM',
  gas_station_type_margin_TOTAL_PRODUCT: 'gas_station_type_margin_TOTAL_PRODUCT',
  gas_station_type_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'gas_station_type_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  gas_station_type_margin_FILTROS_AR_PRODUCT: 'gas_station_type_margin_FILTROS_AR_PRODUCT',
  gas_station_sanado_marginGC: 'gas_station_sanado_marginGC',
  gas_station_sanado_margin_DIESEL_GROUP: 'gas_station_sanado_margin_DIESEL_GROUP',
  gas_station_sanado_margin_DIESEL_GROUP_S500: 'gas_station_sanado_margin_DIESEL_GROUP_S500',
  gas_station_sanado_margin_GASOLINA_PREMIUM: 'gas_station_sanado_margin_GASOLINA_PREMIUM',
  gas_station_sanado_margin_ETANOL_COMUM: 'gas_station_sanado_margin_ETANOL_COMUM',
  gas_station_sanado_margin_GASOLINA_PODIUM: 'gas_station_sanado_margin_GASOLINA_PODIUM',
  gas_station_sanado_margin_TOTAL_PRODUCT: 'gas_station_sanado_margin_TOTAL_PRODUCT',
  gas_station_sanado_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'gas_station_sanado_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  gas_station_sanado_margin_FILTROS_AR_PRODUCT: 'gas_station_sanado_margin_FILTROS_AR_PRODUCT',
  gas_station_sanado_hour_marginGC: 'gas_station_sanado_hour_marginGC',
  gas_station_sanado_hour_margin_DIESEL_GROUP: 'gas_station_sanado_hour_margin_DIESEL_GROUP',
  gas_station_sanado_hour_margin_DIESEL_GROUP_S500: 'gas_station_sanado_hour_margin_DIESEL_GROUP_S500',
  gas_station_sanado_hour_margin_GASOLINA_PREMIUM: 'gas_station_sanado_hour_margin_GASOLINA_PREMIUM',
  gas_station_sanado_hour_ETANOL_COMUM: 'gas_station_sanado_hour_ETANOL_COMUM',
  gas_station_sanado_hour_margin_GASOLINA_PODIUM: 'gas_station_sanado_hour_margin_GASOLINA_PODIUM',
  gas_station_sanado_hour_margin_TOTAL_PRODUCT: 'gas_station_sanado_hour_margin_TOTAL_PRODUCT',
  gas_station_sanado_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'gas_station_sanado_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  gas_station_sanado_hour_margin_FILTROS_AR_PRODUCT: 'gas_station_sanado_hour_margin_FILTROS_AR_PRODUCT',
  gas_station_whats_app: 'gas_station_whats_app',
  verification_hour_marginGC: 'verification_hour_marginGC',
  verification_hour_margin_DIESEL_GROUP: 'verification_hour_margin_DIESEL_GROUP',
  verification_hour_margin_DIESEL_GROUP_S500: 'verification_hour_margin_DIESEL_GROUP_S500',
  verification_hour_margin_GASOLINA_PREMIUM: 'verification_hour_margin_GASOLINA_PREMIUM',
  verification_hour_margin_ETANOL_COMUM: 'verification_hour_margin_ETANOL_COMUM',
  verification_hour_margin_GASOLINA_PODIUM: 'verification_hour_margin_GASOLINA_PODIUM',
  verification_hour_margin_TOTAL_PRODUCT: 'verification_hour_margin_TOTAL_PRODUCT',
  verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  verification_hour_margin_FILTROS_AR_PRODUCT: 'verification_hour_margin_FILTROS_AR_PRODUCT',
  verification_msg_sent: 'verification_msg_sent',
  gas_station_MLT_modal: 'gas_station_MLT_modal',
  gas_station_TMC_modal: 'gas_station_TMC_modal',
  gas_station_TMF_modal: 'gas_station_TMF_modal',
  gas_station_TMP_modal: 'gas_station_TMP_modal',
  gas_station_TMVOL_modal: 'gas_station_TMVOL_modal',
  gas_station_LUCRO_BRUTO_OPERACIONAL_modal: 'gas_station_LUCRO_BRUTO_OPERACIONAL_modal',
  gas_station_LUCRO_BRUTO_GALONAGEM_modal: 'gas_station_LUCRO_BRUTO_GALONAGEM_modal',
  gas_station_LUCRO_BRUTO_PRODUTO_modal: 'gas_station_LUCRO_BRUTO_PRODUTO_modal',
  gas_station_GASOLINA_COMUM_comb: 'gas_station_GASOLINA_COMUM_comb',
  gas_station_ETANOL_COMUM_comb: 'gas_station_ETANOL_COMUM_comb',
  gas_station_invoice_prod: 'gas_station_invoice_prod',
  gas_station_invoice_comb: 'gas_station_invoice_comb',
  gas_station_invoice_prod_daily: 'gas_station_invoice_prod_daily',
  gas_station_invoice_comb_daily: 'gas_station_invoice_comb_daily',
  gas_station_freight_value: 'gas_station_freight_value',
  gas_station_gross_result_literage: 'gas_station_gross_result_literage',
  gas_station_gross_result_product: 'gas_station_gross_result_product',
  gas_station_OLEO_DIESEL_B_S500_COMUM_comb: 'gas_station_OLEO_DIESEL_B_S500_COMUM_comb',
  gas_station_OLEO_DIESEL_B_S10_COMUM_comb: 'gas_station_OLEO_DIESEL_B_S10_COMUM_comb',
  gas_station_created_at: 'gas_station_created_at',
  gas_station_updated_at: 'gas_station_updated_at',
  ibm_info_id: 'ibm_info_id',
  use_uuid: 'use_uuid'
};

exports.Prisma.Ibm_infoScalarFieldEnum = {
  ibm: 'ibm',
  nomefantasia: 'nomefantasia',
  cnpj: 'cnpj',
  razaosocial: 'razaosocial',
  cep: 'cep',
  lat: 'lat',
  long: 'long',
  id: 'id',
  endereco: 'endereco',
  ibm_margin_GC: 'ibm_margin_GC',
  ibm_margin_GASOLINA_PREMIUM: 'ibm_margin_GASOLINA_PREMIUM',
  ibm_margin_ETANOL_COMUM: 'ibm_margin_ETANOL_COMUM',
  ibm_margin_GASOLINA_PODIUM: 'ibm_margin_GASOLINA_PODIUM',
  ibm_margin_DIESEL_GROUP: 'ibm_margin_DIESEL_GROUP',
  ibm_margin_DIESEL_GROUP_S500: 'ibm_margin_DIESEL_GROUP_S500',
  ibm_margin_TOTAL_PRODUCT: 'ibm_margin_TOTAL_PRODUCT',
  ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT: 'ibm_margin_ADITIVOS_AUTOMOVEIS_PRODUCT',
  ibm_margin_FILTROS_AR_PRODUCT: 'ibm_margin_FILTROS_AR_PRODUCT',
  regional: 'regional'
};

exports.Prisma.Region_setvariablesScalarFieldEnum = {
  region_uuid: 'region_uuid',
  region_marginGC: 'region_marginGC',
  region_margin_DIESEL_GROUP: 'region_margin_DIESEL_GROUP',
  region_margin_DIESEL_GROUP_S500: 'region_margin_DIESEL_GROUP_S500',
  region_margin_GASOLINA_PREMIUM: 'region_margin_GASOLINA_PREMIUM',
  region_margin_ETANOL_COMUM: 'region_margin_ETANOL_COMUM',
  region_margin_GASOLINA_PODIUM: 'region_margin_GASOLINA_PODIUM',
  region_type_marginGC: 'region_type_marginGC',
  region_type_margin_DIESEL_GROUP: 'region_type_margin_DIESEL_GROUP',
  region_type_margin_DIESEL_GROUP_S500: 'region_type_margin_DIESEL_GROUP_S500',
  region_type_margin_GASOLINA_PREMIUM: 'region_type_margin_GASOLINA_PREMIUM',
  region_type_margin_ETANOL_COMUM: 'region_type_margin_ETANOL_COMUM',
  region_type_margin_GASOLINA_PODIUM: 'region_type_margin_GASOLINA_PODIUM',
  region_sanado_marginGC: 'region_sanado_marginGC',
  region_sanado_margin_DIESEL_GROUP: 'region_sanado_margin_DIESEL_GROUP',
  region_sanado_margin_DIESEL_GROUP_S500: 'region_sanado_margin_DIESEL_GROUP_S500',
  region_sanado_margin_GASOLINA_PREMIUM: 'region_sanado_margin_GASOLINA_PREMIUM',
  region_sanado_margin_ETANOL_COMUM: 'region_sanado_margin_ETANOL_COMUM',
  region_sanado_margin_GASOLINA_PODIUM: 'region_sanado_margin_GASOLINA_PODIUM',
  region_sanado_hour_marginGC: 'region_sanado_hour_marginGC',
  region_sanado_hour_margin_DIESEL_GROUP: 'region_sanado_hour_margin_DIESEL_GROUP',
  region_sanado_hour_margin_DIESEL_GROUP_S500: 'region_sanado_hour_margin_DIESEL_GROUP_S500',
  region_sanado_hour_margin_GASOLINA_PREMIUM: 'region_sanado_hour_margin_GASOLINA_PREMIUM',
  region_sanado_hour_ETANOL_COMUM: 'region_sanado_hour_ETANOL_COMUM',
  region_sanado_hour_GASOLINA_PODIUM: 'region_sanado_hour_GASOLINA_PODIUM',
  region_sanado_hour_GASOLINA_PREMIUM: 'region_sanado_hour_GASOLINA_PREMIUM',
  region_whats_app: 'region_whats_app',
  region_station_MLT_modal: 'region_station_MLT_modal',
  region_station_TMC_modal: 'region_station_TMC_modal',
  region_station_TMF_modal: 'region_station_TMF_modal',
  region_station_TMP_modal: 'region_station_TMP_modal',
  region_station_TMVOL_modal: 'region_station_TMVOL_modal',
  region_station_LUCRO_BRUTO_OPERACIONAL_modal: 'region_station_LUCRO_BRUTO_OPERACIONAL_modal',
  region_station_LUCRO_BRUTO_GALONAGEM_modal: 'region_station_LUCRO_BRUTO_GALONAGEM_modal',
  region_station_LUCRO_BRUTO_PRODUTO_modal: 'region_station_LUCRO_BRUTO_PRODUTO_modal',
  region_station_GASOLINA_COMUM_comb: 'region_station_GASOLINA_COMUM_comb',
  region_station_ETANOL_COMUM_comb: 'region_station_ETANOL_COMUM_comb',
  region_station_OLEO_DIESEL_B_S500_COMUM_comb: 'region_station_OLEO_DIESEL_B_S500_COMUM_comb',
  region_station_OLEO_DIESEL_B_S10_COMUM_comb: 'region_station_OLEO_DIESEL_B_S10_COMUM_comb',
  verification_hour_marginGC: 'verification_hour_marginGC',
  verification_hour_margin_DIESEL_GROUP: 'verification_hour_margin_DIESEL_GROUP',
  verification_hour_margin_DIESEL_GROUP_S500: 'verification_hour_margin_DIESEL_GROUP_S500',
  verification_hour_margin_GASOLINA_PREMIUM: 'verification_hour_margin_GASOLINA_PREMIUM',
  verification_hour_margin_ETANOL_COMUM: 'verification_hour_margin_ETANOL_COMUM',
  verification_hour_margin_GASOLINA_PODIUM: 'verification_hour_margin_GASOLINA_PODIUM',
  verification_msg_sent: 'verification_msg_sent',
  region_station_created_at: 'region_station_created_at',
  region_station_updated_at: 'region_station_updated_at',
  use_uuid: 'use_uuid',
  regions_uuid: 'regions_uuid'
};

exports.Prisma.RegionsScalarFieldEnum = {
  regions_uuid: 'regions_uuid',
  regions_name: 'regions_name',
  regions_types: 'regions_types',
  regions_margin_GC: 'regions_margin_GC',
  regions_margin_ETANOL_COMUM: 'regions_margin_ETANOL_COMUM',
  regions_margin_GASOLINA_PODIUM: 'regions_margin_GASOLINA_PODIUM',
  regions_margin_GASOLINA_PREMIUM: 'regions_margin_GASOLINA_PREMIUM',
  regions_margin_DIESEL_GROUP: 'regions_margin_DIESEL_GROUP',
  regions_margin_DIESEL_GROUP_S500: 'regions_margin_DIESEL_GROUP_S500',
  region_created_at: 'region_created_at',
  region_updated_at: 'region_updated_at'
};

exports.Prisma.UsersScalarFieldEnum = {
  use_uuid: 'use_uuid',
  use_name: 'use_name',
  use_email: 'use_email',
  use_password: 'use_password',
  use_tmp: 'use_tmp',
  use_tmvol: 'use_tmvol',
  use_tmc: 'use_tmc',
  use_tmf: 'use_tmf',
  use_mlt: 'use_mlt',
  use_lucro_bruto_operacional_galonagem: 'use_lucro_bruto_operacional_galonagem',
  use_lucro_bruto_operacional_produto: 'use_lucro_bruto_operacional_produto',
  use_lucro_bruto_operacional: 'use_lucro_bruto_operacional',
  use_GASOLINA_COMUM_comb: 'use_GASOLINA_COMUM_comb',
  use_ETANOL_COMUM_comb: 'use_ETANOL_COMUM_comb',
  use_OLEO_DIESEL_B_S500_COMUM_comb: 'use_OLEO_DIESEL_B_S500_COMUM_comb',
  use_OLEO_DIESEL_B_S10_COMUM_comb: 'use_OLEO_DIESEL_B_S10_COMUM_comb',
  use_created_at: 'use_created_at',
  use_updated_at: 'use_updated_at',
  use_date_expire: 'use_date_expire',
  use_token: 'use_token',
  use_level: 'use_level',
  use_whats_app: 'use_whats_app'
};

exports.Prisma.Big_numbers_valuesScalarFieldEnum = {
  bignumbers_uuid: 'bignumbers_uuid',
  bignumbers_sumliterage: 'bignumbers_sumliterage',
  bignumbers_invoicing: 'bignumbers_invoicing',
  bignumbers_Supplies: 'bignumbers_Supplies',
  bignumbers_fuelSales: 'bignumbers_fuelSales',
  bignumbers_fuelProfit: 'bignumbers_fuelProfit',
  bignumbers_productSales: 'bignumbers_productSales',
  bignumbers_productProfit: 'bignumbers_productProfit',
  bignumbers_dailyProductProfit: 'bignumbers_dailyProductProfit',
  bignumbers_dailyLiterageProfit: 'bignumbers_dailyLiterageProfit'
};

exports.Prisma.Gallon_gross_historyScalarFieldEnum = {
  gallon_history_uuid: 'gallon_history_uuid',
  ibm_info_id: 'ibm_info_id',
  use_uuid: 'use_uuid',
  gallon_history_gross: 'gallon_history_gross',
  gallon_history_date: 'gallon_history_date',
  gallon_history_created_at: 'gallon_history_created_at',
  gallon_history_updated_at: 'gallon_history_updated_at'
};

exports.Prisma.Gallon_gross_last_weekScalarFieldEnum = {
  gallon_last_history_uuid: 'gallon_last_history_uuid',
  use_uuid: 'use_uuid',
  gallon_last_history_gross: 'gallon_last_history_gross',
  gallon_last_history_date: 'gallon_last_history_date',
  gallon_last_history_created_at: 'gallon_last_history_created_at',
  gallon_last_history_updated_at: 'gallon_last_history_updated_at'
};

exports.Prisma.Product_gross_last_weekScalarFieldEnum = {
  product_last_history_uuid: 'product_last_history_uuid',
  use_uuid: 'use_uuid',
  product_last_history_gross: 'product_last_history_gross',
  product_last_history_date: 'product_last_history_date',
  product_last_history_created_at: 'product_last_history_created_at',
  product_last_history_updated_at: 'product_last_history_updated_at'
};

exports.Prisma.Product_gross_historyScalarFieldEnum = {
  product_history_uuid: 'product_history_uuid',
  ibm_info_id: 'ibm_info_id',
  use_uuid: 'use_uuid',
  product_history_gross: 'product_history_gross',
  product_history_date: 'product_history_date',
  product_history_created_at: 'product_history_created_at',
  product_history_updated_at: 'product_history_updated_at'
};

exports.Prisma.Mlt_historyScalarFieldEnum = {
  mlt_history_uuid: 'mlt_history_uuid',
  use_uuid: 'use_uuid',
  mlt_history_value: 'mlt_history_value',
  mlt_history_date: 'mlt_history_date',
  mlt_history_created_at: 'mlt_history_created_at',
  mlt_history_updated_at: 'mlt_history_updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  gas_station_setvariables: 'gas_station_setvariables',
  ibm_info: 'ibm_info',
  region_setvariables: 'region_setvariables',
  regions: 'regions',
  users: 'users',
  big_numbers_values: 'big_numbers_values',
  gallon_gross_history: 'gallon_gross_history',
  gallon_gross_last_week: 'gallon_gross_last_week',
  product_gross_last_week: 'product_gross_last_week',
  product_gross_history: 'product_gross_history',
  mlt_history: 'mlt_history'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
