import dayjs from "dayjs";
import { formatDisplayDate } from "./core/utils/datetimeUtils";

export const moduleName = "@ugandaemr/esm-stock-management-app";
export const spaRoot = `${window["getOpenmrsSpaBase"]}`;
export const omrsDateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
export const startOfDay = dayjs(new Date().setUTCHours(0, 0, 0, 0)).format(
  omrsDateFormat
);
export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const DATE_PICKER_FORMAT = "DD/MM/YYYY";

export const DATE_PICKER_CONTROL_FORMAT = "d/m/Y";

export const formatForDatePicker = (date: Date | null | undefined) => {
  return formatDisplayDate(date, DATE_PICKER_FORMAT);
};

export const today = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// privileges
/** @type {string}: App: stockmanagement.dashboard, Able to view stock management application dashboard*/
export const APP_STOCKMANAGEMENT_DASHBOARD = "App: stockmanagement.dashboard";

/** @type {string}: App: stockmanagement.stockItems, Able to view stock items*/
export const APP_STOCKMANAGEMENT_STOCKITEMS = "App: stockmanagement.stockItems";

/** @type {string}: Task: stockmanagement.stockItems.mutate, Able to create and update  stock items*/
export const TASK_STOCKMANAGEMENT_STOCKITEMS_MUTATE =
  "Task: stockmanagement.stockItems.mutate";

/** @type {string}: Task: stockmanagement.stockItems.dispense.qty, Able to view stock item quantities at dispensing locations*/
export const TASK_STOCKMANAGEMENT_STOCKITEMS_DISPENSE_QTY =
  "Task: stockmanagement.stockItems.dispense.qty";

/** @type {string}: Task: stockmanagement.stockItems.dispense, Able to dispense stock items*/
export const TASK_STOCKMANAGEMENT_STOCKITEMS_DISPENSE =
  "Task: stockmanagement.stockItems.dispense";

/** @type {string}: App: stockmanagement.userRoleScopes, Able to view stock management user role scope*/
export const APP_STOCKMANAGEMENT_USERROLESCOPES =
  "App: stockmanagement.userRoleScopes";

/** @type {string}: Task: stockmanagement.userRoleScopes.mutate, Able to create and update user role scopes*/
export const TASK_STOCKMANAGEMENT_USERROLESCOPES_MUTATE =
  "Task: stockmanagement.userRoleScopes.mutate";

/** @type {string}: App: stockmanagement.stockoperations, Able to view stock operations*/
export const APP_STOCKMANAGEMENT_STOCKOPERATIONS =
  "App: stockmanagement.stockoperations";

/** @type {string}: Task: stockmanagement.stockoperations.mutate, Able to create and update stock operations*/
export const TASK_STOCKMANAGEMENT_STOCKOPERATIONS_MUTATE =
  "Task: stockmanagement.stockoperations.mutate";

/** @type {string}: Task: stockmanagement.stockoperations.approve, Able to aprove stock operations*/
export const TASK_STOCKMANAGEMENT_STOCKOPERATIONS_APPROVE =
  "Task: stockmanagement.stockoperations.approve";

/** @type {string}: Task: stockmanagement.stockoperations.receiveitems, Able to receive dispatched stock items*/
export const TASK_STOCKMANAGEMENT_STOCKOPERATIONS_RECEIVEITEMS =
  "Task: stockmanagement.stockoperations.receiveitems";

/** @type {string}: App: stockmanagement.stockSources, Able to view stock sources*/
export const APP_STOCKMANAGEMENT_STOCKSOURCES =
  "App: stockmanagement.stockSources";

/** @type {string}: Task: stockmanagement.stockSources.mutate, Able to create and update stock sources*/
export const TASK_STOCKMANAGEMENT_STOCKSOURCES_MUTATE =
  "Task: stockmanagement.stockSources.mutate";

/** @type {string}: App: stockmanagement.stockOperationType, Able to view stock operation types*/
export const APP_STOCKMANAGEMENT_STOCKOPERATIONTYPE =
  "App: stockmanagement.stockOperationType";

/** @type {string}: Task: stockmanagement.party.read, Able to read party information*/
export const TASK_STOCKMANAGEMENT_PARTY_READ =
  "Task: stockmanagement.party.read";

/** @type {string}: App: stockmanagement.reports, Able to view stock reports*/
export const APP_STOCKMANAGEMENT_REPORTS = "App: stockmanagement.reports";

/** @type {string}: Task: stockmanagement.reports.mutate, Able to create stock reports*/

// concepts
export const STOCK_SOURCE_TYPE_CODED_CONCEPT_ID = "2e1e8049-9cbe-4a2d-b1e5-8a91e5d7d97d";
export const STOCK_ADJUSTMENT_REASON_CODED_CONCEPT_ID = "3bbfaa44-d5b8-404d-b4c1-2bf49ad8ce25";
export const DISPENSING_UNITS_CONCEPT_ID = "162402AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const PACKAGING_UNITS_CODED_CONCEPT_ID = "bce2b1af-98b1-48a2-98a2-3e4ffb3c79c2";
export const STOCK_ITEM_CATEGORY_CONCEPT_ID ="6d24eb6e-b42f-4706-ab2d-ae4472161f6a";

export const STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND = false;
export const STOCK_OPERATION_PRINT_DISABLE_COSTS = false;
export const HEALTH_CENTER_NAME = "Health Center";
export const PRINT_LOGO = "moduleResources/stockmanagement/assets/print-logo.svg";
export const PRINT_LOGO_TEXT = "Ministry of Health";

export const MAIN_STORE_LOCATION_TAG = "Main Store";

export const BASE_OPENMRS_APP_URL =
  (window as any).STOCKMGMT_BASE_URL ??
  process.env.REACT_APP_BASE_OPENMRS_APP_URL ??
  (document
    .getElementsByTagName("baseFallback")[0]
    .getAttribute("href") as string);
export const STOCKMGMT_RESOURCE_URL =
  (window as any).STOCKMGMT_RESOURCE_URL ??
  process.env.REACT_APP_STOCKMGMT_RESOURCE_URL;
export const STOCKMGMT_SPA_PAGE_URL =
  (window as any).STOCKMGMT_SPA_PAGE_URL ??
  process.env.REACT_APP_STOCKMGMT_SPA_PAGE_URL;
export const STOCK_SOURCE_TYPE_CODED_CONCEPT_ID =
  (window as any).STOCK_SOURCE_TYPE_CODED_CONCEPT_ID ??
  process.env.REACT_APP_STOCK_SOURCE_TYPE_CODED_CONCEPT_ID;
export const STOCK_ADJUSTMENT_REASON_CODED_CONCEPT_ID =
  (window as any).STOCK_ADJUSTMENT_REASON_CODED_CONCEPT_ID ??
  process.env.REACT_APP_STOCK_ADJUSTMENT_REASON_CODED_CONCEPT_ID;
export const PACKAGING_UNITS_CODED_CONCEPT_ID =
  (window as any).PACKAGING_UNITS_CODED_CONCEPT_ID ??
  process.env.REACT_APP_PACKAGING_UNITS_CODED_CONCEPT_ID;
export const DISPENSING_UNITS_CONCEPT_ID =
  (window as any).DISPENSING_UNITS_CONCEPT_ID ??
  process.env.REACT_APP_DISPENSING_UNITS_CONCEPT_ID;
export const STOCK_ITEM_CATEGORY_CONCEPT_ID =
  (window as any).STOCK_ITEM_CATEGORY_CONCEPT_ID ??
  process.env.REACT_APP_STOCK_ITEM_CATEGORY_CONCEPT_ID;

export const STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND =
  (window as any).STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND ??
  (process.env.REACT_APP_STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND &&
    process.env.REACT_APP_STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND ===
      "true") ??
  false;
export const STOCK_OPERATION_PRINT_DISABLE_COSTS =
  (window as any).STOCK_OPERATION_PRINT_DISABLE_COSTS ??
  (process.env.REACT_APP_STOCK_OPERATION_PRINT_DISABLE_COSTS &&
    process.env.REACT_APP_STOCK_OPERATION_PRINT_DISABLE_COSTS === "true") ??
  false;
export const PRINT_LOGO =
  (window as any).PRINT_LOGO ?? process.env.REACT_APP_PRINT_LOGO;
export const URL_PRINT_LOGO = () =>
  PRINT_LOGO
    ? `${BASE_OPENMRS_APP_URL}${PRINT_LOGO}`
    : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
export const PRINT_LOGO_TEXT =
  (window as any).PRINT_LOGO_TEXT ?? process.env.REACT_APP_PRINT_LOGO_TEXT;
export const HEALTH_CENTER_NAME =
  (window as any).HEALTH_CENTER_NAME ??
  process.env.REACT_APP_HEALTH_CENTER_NAME;
export const CLOSE_PRINT_AFTER_PRINT: boolean =
  (window as any).CLOSE_PRINT_AFTER_PRINT ??
  (process.env.REACT_APP_CLOSE_PRINT_AFTER_PRINT &&
    process.env.REACT_APP_CLOSE_PRINT_AFTER_PRINT === "true") ??
  true;
export const ALLOW_STOCK_ISSUE_WITHOUT_REQUISITION: boolean =
  (window as any).ALLOW_STOCK_ISSUE_WITHOUT_REQUISITION ??
  (process.env.REACT_APP_ALLOW_STOCK_ISSUE_WITHOUT_REQUISITION &&
    process.env.REACT_APP_ALLOW_STOCK_ISSUE_WITHOUT_REQUISITION === "true") ??
  false;

export const BASE_URL_CONFIGURED = BASE_OPENMRS_APP_URL;
export const LOGIN_URL = BASE_OPENMRS_APP_URL + "login.htm";

export const ROUTING_BASE_URL = "/";
export const URL_STOCK_HOME = ROUTING_BASE_URL + "home";

export const URL_STOCK_OPERATIONS = ROUTING_BASE_URL + "stock-operations";
export const URL_STOCK_OPERATIONS_ROUTES = URL_STOCK_OPERATIONS + "/*";
export const URL_STOCK_OPERATIONS_NEW = URL_STOCK_OPERATIONS + "/new/*";
export const URL_STOCK_OPERATIONS_NEW_OPERATION = (
  name: string,
  requisitionUuid?: string
): string =>
  `${URL_STOCK_OPERATIONS}/new/${name}${
    requisitionUuid ? `?requisition=${requisitionUuid}` : ""
  }`;
export const URL_STOCK_OPERATIONS_EDIT = URL_STOCK_OPERATIONS + "/:id";
export const URL_STOCK_OPERATIONS_REDIRECT = (
  uuid: string,
  tab?: string
): string =>
  `${URL_STOCK_OPERATIONS}/redirect/${uuid}${tab ? `?tab=${tab}` : ""}`;
export const URL_STOCK_OPERATION = (uuid: string, tab?: string): string =>
  `${URL_STOCK_OPERATIONS}/${uuid}${tab ? `?tab=${tab}` : ""}`;

export const URL_USER_ROLE_SCOPES = ROUTING_BASE_URL + "user-role-scopes";
export const URL_USER_ROLE_SCOPES_ROUTES = URL_USER_ROLE_SCOPES + "/*";
export const URL_USER_ROLE_SCOPES_NEW = URL_USER_ROLE_SCOPES + "/new";
export const URL_USER_ROLE_SCOPES_EDIT = URL_USER_ROLE_SCOPES + "/:id";
export const URL_USER_ROLE_SCOPE = (uuid: string): string =>
  `${URL_USER_ROLE_SCOPES}/${uuid}`;

export const URL_STOCK_ITEMS = ROUTING_BASE_URL + "stock-items";
export const URL_STOCK_ITEMS_ROUTES = ROUTING_BASE_URL + "stock-items/*";
export const URL_STOCK_ITEMS_NEW = URL_STOCK_ITEMS + "/new";
export const URL_STOCK_ITEMS_EDIT = URL_STOCK_ITEMS + "/:id";
export const URL_STOCK_ITEM = (uuid: string, tab?: string): string =>
  `${URL_STOCK_ITEMS}/${uuid}${tab ? `?tab=${tab}` : ""}`;
export const URL_STOCK_ITEMS_REDIRECT = (uuid: string, tab?: string): string =>
  `${URL_STOCK_ITEMS}/redirect/${uuid}${tab ? `?tab=${tab}` : ""}`;
export const URL_IMPORT_ERROR_FILE = (importSessionId: string) =>
  `${BASE_OPENMRS_APP_URL}ws/rest/v1/stockmanagement/stockitemimport?id=${importSessionId}`;
export const URL_IMPORT_TEMPLATE_FILE = `${BASE_OPENMRS_APP_URL}moduleResources/stockmanagement/templates/Import_Stock_Items.xlsx`;

export const URL_STOCK_SOURCES = ROUTING_BASE_URL + "stock-sources";
export const URL_STOCK_SOURCES_ROUTES = URL_STOCK_SOURCES + "/*";

export const URL_SIGN_IN = ROUTING_BASE_URL + "sign-in";
export const URL_SIGN_OUT = ROUTING_BASE_URL + "sign-out";

export const URL_ACCESS_DENIED = ROUTING_BASE_URL + "access-denied";
export const URL_NOT_FOUND = "/*";
export const URL_WILDCARD = "*";

export const REACT_ROUTER_PREFIX = "#";

export const URL_LOCATIONS = ROUTING_BASE_URL + "locations";
export const URL_LOCATIONS_ROUTES = ROUTING_BASE_URL + "locations/*";
export const URL_LOCATIONS_NEW = () =>
  `${BASE_OPENMRS_APP_URL}admin/locations/location.form`;
export const URL_LOCATIONS_EDIT = (id: number) =>
  `${BASE_OPENMRS_APP_URL}admin/locations/location.form?locationId=${id}`;

export const URL_STOCK_REPORTS = ROUTING_BASE_URL + "stock-reports";
export const URL_STOCK_REPORTS_ROUTES = ROUTING_BASE_URL + "stock-reports/*";
export const URL_STOCK_REPORT = (uuid: string): string =>
  `${URL_STOCK_REPORTS}/${uuid}`;
export const URL_BATCH_JOB_ARTIFACT = (
  uuid: string,
  download: boolean
): string =>
  `${BASE_OPENMRS_APP_URL}ws/rest/v1/stockmanagement/batchjobartifact?id=${uuid}${
    download ? "&download=1" : ""
  }`;
