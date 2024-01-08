import React, { useCallback, useMemo, useState } from "react";

import { Button } from "@carbon/react";
import { showModal } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import { Printer } from "@carbon/react/icons";
import { StockOperationDTO } from "../../core/api/types/stockOperation/StockOperationDTO";
import { StockOperationItemCost } from "../../core/api/types/stockOperation/StockOperationItemCost";
import { StockItemInventory } from "../../core/api/types/stockItem/StockItemInventory";
import {
  StockOperationPrintHasItemCosts,
  StockOperationTypeIsReceipt,
  StockOperationTypeIsRequistion,
  StockOperationTypeIsTransferOut,
} from "../../core/api/types/stockOperation/StockOperationType";
import { StockItemInventoryFilter } from "../../stock-items/stock-items.resource";
import { ResourceRepresentation } from "../../core/api/api";
import { BuildStockOperationData } from "../stock-print-reports/StockOperationReport";
import { PrintGoodsReceivedNoteStockOperation } from "../stock-print-reports/GoodsReceivedNote";
import { PrintTransferOutStockOperation } from "../stock-print-reports/StockTransferDocument";
import { PrintRequisitionStockOperation } from "../stock-print-reports/RequisitionDocument";

interface StockOperationCancelButtonProps {
  operation: StockOperationDTO;
}

const StockOperationPrintButton: React.FC<StockOperationCancelButtonProps> = ({
  operation,
}) => {
  const { t } = useTranslation();

  // on print stock operation
  const onPrintStockOperation = async () => {
    try {
      let parentOperation: StockOperationDTO | null | undefined;
      let itemsCost: StockOperationItemCost[] | null | undefined = null;
      let itemInventory: StockItemInventory[] | null | undefined = null;

      if (operation.requisitionStockOperationUuid) {
        await getStockOperation(operation.requisitionStockOperationUuid, false).unwrap()
          .then((payload: any) => {
            if ((payload as any).error) {
              handleErrors(payload);
              return;
            }
            parentOperation = payload;
          })
          .catch((error: any) => {
            handleErrors(error);
            return;
          });
        if (!parentOperation) {
          return null;
        }
      }

      if (
        operation ||
        StockOperationPrintHasItemCosts(operation.operationType!) ||
        StockOperationTypeIsTransferOut(operation.operationType!)
      ) {
        let enableOperationPrintCosts = !STOCK_OPERATION_PRINT_DISABLE_COSTS;
        if (enableOperationPrintCosts) {
          await getStockOperationItemsCost(operation.uuid!, false)
            .unwrap()
            .then((payload: any) => {
              if ((payload as any).error) {
                handleErrors(payload);
                return;
              }
              itemsCost = payload?.results;
            })
            .catch((error: any) => {
              handleErrors(error);
              return;
            });
        }
      }
      let enableBalance = !STOCK_OPERATION_PRINT_DISABLE_BALANCE_ON_HAND;
      if (
        enableBalance &&
        (operation || StockOperationTypeIsRequistion(operation.operationType!))
      ) {
        const inventoryFilter: StockItemInventoryFilter = {};
        if (operation?.uuid) {
          inventoryFilter.locationUuid = operation.atLocationUuid;
          inventoryFilter.stockOperationUuid = operation.uuid;
        } else {
          inventoryFilter.locationUuid = operation.atLocationUuid;
          inventoryFilter.stockOperationUuid = operation.uuid;
        }
        inventoryFilter.v = ResourceRepresentation.Default;
        inventoryFilter.groupBy = "LocationStockItem";
        inventoryFilter.includeStockItemName = "true";

        inventoryFilter.date = JSON.stringify(
          operation?.dateCreated ?? operation?.dateCreated
        ).replaceAll('"', "");

        // get stock item inventory
        await getStockItemInventory(inventoryFilter)
          .unwrap()
          .then((payload: any) => {
            if ((payload as any).error) {
              handleErrors(payload);
              return;
            }
            itemInventory = payload?.results;
          })
          .catch((error: any) => {
            handleErrors(error);
            return;
          });
      }

      const data = await BuildStockOperationData(
        editableModel,
        stockOperationItems,
        parentOperation!,
        itemsCost,
        itemInventory
      );
      if (data) {
        if (StockOperationTypeIsReceipt(operation?.operationType)) {
          await PrintGoodsReceivedNoteStockOperation(data);
        } else if (StockOperationTypeIsTransferOut(operation?.operationType!)) {
          await PrintTransferOutStockOperation(data);
        } else {
          await PrintRequisitionStockOperation(data);
        }
      } else {
        console.info(data);
      }
    } catch (e) {
      console.info(e);
    }
  };

  return (
    <Button
      onClick={onPrintStockOperation}
      kind="tertiary"
      renderIcon={(props) => <Printer size={16} {...props} />}
    >
      {t("print", "Print ")}
    </Button>
  );
};

export default StockOperationPrintButton;
