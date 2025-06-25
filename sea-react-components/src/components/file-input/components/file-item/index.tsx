import React from "react";
import { FileState, UploadStatuses } from "../..";
import Icon from "../../../icon";
import { Utils } from "sea-platform-helpers";
import Button from "../../../button";

type Props = {
  file: FileState;
  handleUploadFile?: (file: FileState) => Promise<void>;
  handleDeleteFile?: (file: FileState) => Promise<void>;
};
export default function FileItem({
  file,
  handleUploadFile,
  handleDeleteFile,
}: Props) {
  return (
    <div className="px-2 py-1 rounded-lg bg-info bg-opacity-20 max-w-52">
      <div className="grid grid-cols-4 gap-2 items-center">
        <div className="col-span-3">
          <div>
            <p className="text-sm text-text font-semibold truncate">
              {file.name}
            </p>
            <p className="text-sm text-info">
              {Utils.Number.numeralUtils(file.size).format("0.0 b")}
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex items-center justify-end gap-1">
            {file.status === UploadStatuses.Failed && (
              <>
                <Icon
                  icon="mdi:cloud-remove-outline"
                  className="w-5 h-5 text-error"
                />

                <Button
                  type="button"
                  className="bg-transparent"
                  onClick={() => handleUploadFile(file)}
                >
                  <Icon
                    icon="pajamas:retry"
                    className="w-5 h-5 text-primary hover:text-opacity-50 transition-all duration-300 ease-in-out"
                  />
                </Button>
              </>
            )}

            {[UploadStatuses.Pending, UploadStatuses.Uploading].includes(
              file.status
            ) && (
              <Icon
                icon="line-md:uploading-loop"
                className="w-5 h-5 text-info"
              />
            )}

            {file.status === UploadStatuses.Uploaded && (
              <>
                <Icon
                  icon="ic:outline-cloud-done"
                  className="w-5 h-5 text-primary"
                />

                <Button
                  type="button"
                  className="bg-transparent"
                  onClick={() => {
                    handleDeleteFile(file);
                  }}
                >
                  <Icon
                    icon="famicons:close"
                    className="w-5 h-5 text-error transition-all duration-300 ease-in-out"
                  />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
