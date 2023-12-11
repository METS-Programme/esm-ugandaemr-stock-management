import { openmrsFetch } from "@openmrs/esm-framework";

export async function UploadStockItems(body: any) {
  const abortController = new AbortController();

  return openmrsFetch(`/ws/rest/v1/stockmanagement/stockitemimport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: abortController.signal,
    body: body,
  });
}
