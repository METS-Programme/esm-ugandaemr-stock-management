import React, { useMemo } from "react";
import { useStockOperationPages } from "./stock-operations-table.resource";
import { ResourceRepresentation } from "../core/api/api";
import { URL_STOCK_OPERATION } from "../stock-items/stock-items-table.component";
import {
  Button,
  DataTable,
  DataTableSkeleton,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tile,
  Tooltip,
} from "@carbon/react";
import { ArrowRight, Edit, Add } from "@carbon/react/icons";
import { formatDisplayDate } from "../core/utils/datetimeUtils";
import styles from "../stock-items/stock-items-table.scss";
import {
  StockOperationStatusCancelled,
  StockOperationStatusNew,
  StockOperationStatusRejected,
  StockOperationStatusReturned,
} from "../core/api/types/stockOperation/StockOperationStatus";
import { isDesktop } from "@openmrs/esm-framework";
import StockOperationTypesSelector from "./stock-operation-types-selector/stock-operation-types-selector.component";
import { launchAddOrEditDialog } from "./stock-operation.utils";
import { initialStockOperationValue } from "../core/utils/utils";
import { StockOperationType } from "../core/api/types/stockOperation/StockOperationType";
import { useTranslation } from "react-i18next";

interface StockOperationsTableProps {
  status?: string;
}

const StockOperations: React.FC<StockOperationsTableProps> = () => {
  const { t } = useTranslation();

  const {
    items,
    tableHeaders,
    currentPage,
    pageSizes,
    totalItems,
    goTo,
    currentPageSize,
    setPageSize,
    isLoading,
  } = useStockOperationPages({
    v: ResourceRepresentation.Default,
    totalCount: true,
  });

  let operations: StockOperationType[] | null | undefined;

  const tableRows = useMemo(() => {
    return items?.map((stockOperation) => ({
      ...stockOperation,
      id: stockOperation?.uuid,
      key: `key-${stockOperation?.uuid}`,
      operationTypeName: `${stockOperation?.operationTypeName}`,
      operationNumber: (
        <Link
          to={URL_STOCK_OPERATION(stockOperation?.uuid || "")}
          onClick={() => {
            //TODO handlerStockOperationClick(e, stockOperation?.uuid!)
          }}
        >{`${stockOperation?.operationNumber}`}</Link>
      ),
      status: `${stockOperation?.status}`,
      source: `${stockOperation?.sourceName ?? ""}`,
      destination: `${stockOperation?.destinationName ?? ""}`,
      location: (
        <>
          {" "}
          {stockOperation?.sourceName ?? ""}{" "}
          {stockOperation?.sourceName && stockOperation?.destinationName ? (
            <ArrowRight size={16} />
          ) : (
            ""
          )}{" "}
          {stockOperation?.destinationName ?? ""}{" "}
        </>
      ),
      responsiblePerson: `${
        stockOperation?.responsiblePersonFamilyName ??
        stockOperation?.responsiblePersonOther ??
        ""
      } ${stockOperation?.responsiblePersonGivenName ?? ""}`,
      operationDate: formatDisplayDate(stockOperation?.operationDate),
      details: (
        <div className="tbl-expand-display-fields">
          <div className="field-label">
            <span className="field-title">Created</span>
            <span className="field-desc">
              <span className="action-date">
                {formatDisplayDate(stockOperation?.dateCreated)}
              </span>{" "}
              By
              <span className="action-by">
                {stockOperation.creatorFamilyName ?? ""}{" "}
                {stockOperation.creatorGivenName ?? ""}
              </span>
            </span>
          </div>
          {stockOperation?.status !== StockOperationStatusNew &&
            stockOperation?.status !== StockOperationStatusReturned &&
            stockOperation?.submittedDate && (
              <div className="field-label">
                <span className="field-title">Submitted</span>
                <span className="field-desc">
                  <span className="action-date">
                    {formatDisplayDate(stockOperation?.submittedDate)}
                  </span>{" "}
                  By
                  <span className="action-by">
                    {stockOperation.submittedByFamilyName ?? ""}{" "}
                    {stockOperation.submittedByGivenName ?? ""}
                  </span>
                </span>
              </div>
            )}

          {stockOperation?.completedDate && (
            <div className="field-label">
              <span className="field-title">Completed</span>
              <span className="field-desc">
                <span className="action-date">
                  {formatDisplayDate(stockOperation?.completedDate)}
                </span>{" "}
                By
                <span className="action-by">
                  {stockOperation.completedByFamilyName ?? ""}{" "}
                  {stockOperation.completedByGivenName ?? ""}
                </span>
              </span>
            </div>
          )}

          {stockOperation?.status === StockOperationStatusCancelled && (
            <div className="field-label">
              <span className="field-title">Cancelled</span>
              <span className="field-desc">
                <span className="action-date">
                  {formatDisplayDate(stockOperation?.cancelledDate)}
                </span>{" "}
                By
                <span className="action-by">
                  {stockOperation.cancelledByFamilyName ?? ""}{" "}
                  {stockOperation.cancelledByGivenName ?? ""}
                </span>
                <p>{stockOperation.cancelReason}</p>
              </span>
            </div>
          )}

          {stockOperation?.status === StockOperationStatusRejected && (
            <div className="field-label">
              <span className="field-title">Rejected</span>
              <span className="field-desc">
                <span className="action-date">
                  {formatDisplayDate(stockOperation?.rejectedDate)}
                </span>{" "}
                By
                <span className="action-by">
                  {stockOperation.rejectedByFamilyName ?? ""}{" "}
                  {stockOperation.rejectedByGivenName ?? ""}
                </span>
                <p>{stockOperation.rejectionReason}</p>
              </span>
            </div>
          )}

          {stockOperation?.status === StockOperationStatusReturned && (
            <div className="field-label">
              <span className="field-title">Returned</span>
              <span className="field-desc">
                <span className="action-date">
                  {formatDisplayDate(stockOperation?.returnedDate)}
                </span>{" "}
                By
                <span className="action-by">
                  {stockOperation.returnedByFamilyName ?? ""}{" "}
                  {stockOperation.returnedByGivenName ?? ""}
                </span>
                <p>{stockOperation.returnReason}</p>
              </span>
            </div>
          )}
        </div>
      ),
      actions: (
        <Tooltip align="bottom" label="Edit Stock Operation">
          <Button
            type="button"
            size="sm"
            className="submitButton clear-padding-margin"
            iconDescription={"View"}
            kind="ghost"
            renderIcon={Edit}
            onClick={() => {
              //TODO onViewItem(row.id, e);
            }}
          />
        </Tooltip>
      ),
    }));
  }, [items]);

  if (isLoading) {
    return (
      <DataTableSkeleton
        className={styles.dataTableSkeleton}
        showHeader={false}
        rowCount={5}
        columnCount={5}
        zebra
      />
    );
  }

  return (
    <div className={styles.tableOverride}>
      <div id="table-tool-bar">
        <div></div>
        <div className="right-filters"></div>
      </div>
      <DataTable
        rows={tableRows}
        headers={tableHeaders}
        isSortable={true}
        useZebraStyles={true}
        render={({
          rows,
          headers,
          getHeaderProps,
          getTableProps,
          getRowProps,
          onInputChange,
        }) => (
          <TableContainer>
            <TableToolbar
              style={{
                position: "static",
                overflow: "visible",
                backgroundColor: "color",
              }}
            >
              <TableToolbarContent className={styles.toolbarContent}>
                <TableToolbarSearch
                  className={styles.patientListSearch}
                  expanded
                  onChange={onInputChange}
                  placeholder="Filter Table"
                  size="sm"
                />
                <StockOperationTypesSelector
                  onOperationTypeSelected={(operation) => {
                    launchAddOrEditDialog(
                      initialStockOperationValue(),
                      operation,
                      false,
                      operations
                    );
                  }}
                  onOperationLoaded={(ops) => {
                    operations = ops;
                  }}
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
                  {headers.map(
                    (header: any) =>
                      header.key !== "details" && (
                        <TableHeader
                          {...getHeaderProps({
                            header,
                            isSortable: header.isSortable,
                          })}
                          className={
                            isDesktop
                              ? styles.desktopHeader
                              : styles.tabletHeader
                          }
                          key={`${header.key}`}
                        >
                          {header.header?.content ?? header.header}
                        </TableHeader>
                      )
                  )}
                  <TableHeader></TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => {
                  return (
                    <React.Fragment key={row.id}>
                      <TableExpandRow
                        className={
                          isDesktop ? styles.desktopRow : styles.tabletRow
                        }
                        {...getRowProps({ row })}
                      >
                        {row.cells.map(
                          (cell: any) =>
                            cell?.info?.header !== "details" && (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            )
                        )}
                      </TableExpandRow>
                      <TableExpandedRow colSpan={headers.length + 2}>
                        {<div>{row.cells[row.cells.length - 1].value}</div>}
                      </TableExpandedRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
            {rows.length === 0 ? (
              <div className={styles.tileContainer}>
                <Tile className={styles.tile}>
                  <div className={styles.tileContent}>
                    <p className={styles.content}>
                      {t("noOperationsToDisplay", "No Stock Items to display")}
                    </p>
                    <p className={styles.helper}>
                      {t("checkFilters", "Check the filters above")}
                    </p>
                  </div>
                </Tile>
              </div>
            ) : null}
          </TableContainer>
        )}
      ></DataTable>
      <Pagination
        page={currentPage}
        pageSize={currentPageSize}
        pageSizes={pageSizes}
        totalItems={totalItems}
        onChange={({ pageSize, page }) => {
          if (pageSize !== currentPageSize) {
            setPageSize(pageSize);
          }
          if (page !== currentPage) {
            goTo(page);
          }
        }}
        className={styles.paginationOverride}
      />
    </div>
  );
};

export default StockOperations;
