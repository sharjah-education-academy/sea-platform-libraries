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
    <div className="sea-px-2 sea-py-1 sea-rounded-lg sea-bg-info sea-bg-opacity-20 sea-max-w-52">
      <div className="sea-grid sea-grid-cols-4 sea-gap-2 sea-items-center">
        <div className="sea-col-span-3">
          <div>
            <p className="sea-text-sm sea-text-text-dark sea-font-semibold sea-truncate">
              {file.name}
            </p>
            <p className="sea-text-sm sea-text-info">
              {Utils.Number.default(file.size).format("0.0 b")}
            </p>
          </div>
        </div>
        <div className="sea-col-span-1">
          <div className="sea-flex sea-items-center sea-justify-end sea-gap-1">
            {file.status === UploadStatuses.Failed && (
              <>
                <Icon
                  icon="mdi:cloud-remove-outline"
                  className="sea-w-5 sea-h-5 sea-text-error"
                />

                <Button
                  type="button"
                  className="sea-bg-transparent"
                  onClick={() => handleUploadFile(file)}
                >
                  <Icon
                    icon="pajamas:retry"
                    className="sea-w-5 sea-h-5 sea-text-primary hover:sea-text-opacity-50 custom-animation"
                  />
                </Button>
              </>
            )}

            {[UploadStatuses.Pending, UploadStatuses.Uploading].includes(
              file.status
            ) && (
              <Icon
                icon="line-md:uploading-loop"
                className="sea-w-5 sea-h-5 sea-text-info"
              />
            )}

            {file.status === UploadStatuses.Uploaded && (
              <>
                <Icon
                  icon="ic:outline-cloud-done"
                  className="sea-w-5 sea-h-5 sea-text-primary"
                />

                <Button
                  type="button"
                  className="sea-bg-transparent"
                  onClick={() => {
                    handleDeleteFile(file);
                  }}
                >
                  <Icon
                    icon="famicons:close"
                    className="sea-w-5 sea-h-5 sea-text-error custom-animation"
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
