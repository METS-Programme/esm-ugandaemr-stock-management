import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  ContentSwitcher,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  TextArea,
  Grid,
  Checkbox,
  TextInput,
  IconButton,
  FileUploader,
} from "@carbon/react";
import { UploadStockItems } from "./stock-items-bulk-import.resource";
import { showNotification, showToast } from "@openmrs/esm-framework";

export interface ImportDialogPopupProps {
  closeModal: () => void;
}

const ImportDialogPopup: React.FC<ImportDialogPopupProps> = ({
  closeModal,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [hasHeader, setHasHeader] = useState(true);
  const [fileNotSelected, setFileNotSelected] = useState(true);

  const onConfirmUpload = () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("hasHeader", hasHeader ? "true" : "false");

    UploadStockItems(formData).then(
      (resp) => {
        showToast({
          critical: true,
          title: t("rejectOrder", "Rejected Order"),
          kind: "success",
          description: t(
            "successfullyrejected",
            `You have successfully uploaded stock items`
          ),
        });
        closeModal();
      },
      (err) => {
        showNotification({
          title: t(
            `errorUploadingItems', 'An error occured uploading stock items`
          ),
          kind: "error",
          critical: true,
          description: err?.message,
        });
      }
    );
  };

  const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileNotSelected(false);
    } else {
      event.preventDefault();
    }
  };

  const onFileDeleted = () => {
    setFileNotSelected(true);
  };

  return (
    <div>
      <Form>
        <ModalHeader
          closeModal={closeModal}
          title={t("importStockItems", "Import Stock Items")}
        />
        <ModalBody>
          <FileUploader
            accept={[".csv"]}
            multiple={false}
            name={"file"}
            buttonLabel="Select file"
            labelDescription="Only .csv files at 2mb or less"
            filenameStatus="edit"
            labelTitle=""
            size="small"
            onChange={onFileChanged}
            onDelete={onFileDeleted}
          />
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={closeModal}>
            {t("cancel", "Cancel")}
          </Button>
          <Button type="submit" onClick={onConfirmUpload}>
            {t("uploadStockItems", "Upload StockItems")}
          </Button>
        </ModalFooter>
      </Form>
    </div>
  );
};

export default ImportDialogPopup;
