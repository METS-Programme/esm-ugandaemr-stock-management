import { Button } from "@carbon/react";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { showModal } from "@openmrs/esm-framework";

const AddStockItemsBulktImportActionButton: React.FC = () => {
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    const dispose = showModal("import-bulk-stock-items", {
      closeModal: () => dispose(),
    });
  }, []);

  return (
    <Button
      kind="ghost"
      onClick={handleClick}
      iconDescription={t("import", "Import")}
    >
      {t("import", "Import")}
    </Button>
  );
};

export default AddStockItemsBulktImportActionButton;
