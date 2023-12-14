import React, { useCallback, useMemo } from "react";
import {
  DataTable,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  Tile,
  TableToolbarAction,
  TableToolbarMenu,
  DataTableSkeleton,
  TableToolbarSearch,
  Button,
  Tooltip,
} from "@carbon/react";
import { isDesktop } from "@openmrs/esm-framework";
import { Edit } from "@carbon/react/icons";
import useStockSourcesPage from "./stock-sources-items-table.resource";
import { ResourceRepresentation } from "../core/api/api";
import AddStockSourceActionButton from "./add-stock-source-button.component";
import StockSourcesFilter from "./stock-sources-filter/stock-sources-filter.component";
import styles from "./stock-sources.scss";
import { useTranslation } from "react-i18next";
import { launchOverlay } from "../core/components/overlay/hook";
import StockSourcesAddOrUpdate from "./add-stock-sources/add-stock-sources.component";

function StockSourcesItems() {
  const { t } = useTranslation();

  // get sourcess
  const {
    items,
    tableHeaders,
    currentPage,
    pageSizes,
    paginatedItems,
    goTo,
    currentPageSize,
    setPageSize,
    isLoading,
  } = useStockSourcesPage({
    v: ResourceRepresentation.Default,
    totalCount: true,
  });

  const handleClick = useCallback((data: any) => {
    launchOverlay(
      "Edit Stock Source",
      <StockSourcesAddOrUpdate model={data} />
    );
  }, []);

  if (items) {
    items.forEach((row) => {
      row["actions"] = (
        <Tooltip align="bottom" label="Edit Stock Item">
          <Button
            kind="ghost"
            size="md"
            onClick={() => handleClick(row)}
            iconDescription={t("editStockItem", "Edit Stock Item")}
            renderIcon={(props) => <Edit size={16} {...props} />}
          ></Button>
        </Tooltip>
      );
    });
  }

  const tableRows = useMemo(() => {
    return items?.map((entry) => {
      return {
        ...entry,
        id: entry?.uuid,
        key: `key-${entry?.uuid}`,
        uuid: entry?.uuid,
        name: entry?.name,
        acronym: entry?.acronym,
        sourceType: entry?.sourceType?.display,
      };
    });
  }, [items]);

  if (isLoading || items.length === 0) {
    return <DataTableSkeleton role="progressbar" />;
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
                <TableToolbarSearch persistent onChange={onInputChange} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StockSourcesFilter />
                </div>
                <TableToolbarMenu>
                  <TableToolbarAction onClick={""}>Refresh</TableToolbarAction>
                </TableToolbarMenu>
                <AddStockSourceActionButton />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
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
                      <TableRow
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
                      </TableRow>
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
                      {t("noSourcesToDisplay", "No Stock sources to display")}
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
        totalItems={paginatedItems.length}
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
}

export default StockSourcesItems;
