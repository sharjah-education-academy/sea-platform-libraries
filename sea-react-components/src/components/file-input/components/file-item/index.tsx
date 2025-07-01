"use client";
import React, { useEffect, useState } from "react";
import { FileState, UploadStatuses } from "../..";
import Icon from "../../../icon";
import { Utils } from "sea-platform-helpers";
import Button from "../../../button";

export type Props = {
  file: FileState;
  handleUploadFile?: (file: FileState) => Promise<void>;
  handleDeleteFile?: (file: FileState) => Promise<void>;
  displayMode?: boolean;
};

export default function FileItem({
  file,
  handleUploadFile,
  handleDeleteFile,
  displayMode = false,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file.file) {
      const url = URL.createObjectURL(file.file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else if (file.URL) {
      setPreviewUrl(file.URL);
    }
  }, [file.file, file.URL]);

  const renderPreview = () => {
    if (!previewUrl) return null;

    if (file.type.startsWith("image/")) {
      return (
        <a href={previewUrl} target="_blank">
          <img
            src={previewUrl}
            alt={file.name}
            className="w-full h-28 object-cover rounded-md mb-1"
          />
        </a>
      );
    }

    if (file.type.startsWith("video/")) {
      return (
        <a href={previewUrl} target="_blank">
          <video
            src={previewUrl}
            autoPlay={false}
            controls={false}
            className="w-full h-28 object-cover rounded-md mb-1"
          />
        </a>
      );
    }

    if (file.type === "application/pdf") {
      return (
        <div className="w-full h-28 flex items-center justify-center bg-white rounded-md mb-1">
          <Icon icon="mdi:file-pdf-box" className="w-12 h-12 text-red-600" />
        </div>
      );
    }

    return (
      <div className="w-full h-28 flex items-center justify-center bg-white rounded-md mb-1">
        <Icon icon="mdi:file-outline" className="w-10 h-10 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="px-2 py-1 rounded-lg  max-w-52">
      {renderPreview()}
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
                  onClick={() => handleUploadFile?.(file)}
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

            {file.status === UploadStatuses.Uploaded && !displayMode && (
              <>
                <Icon
                  icon="ic:outline-cloud-done"
                  className="w-5 h-5 text-primary"
                />
                <Button
                  type="button"
                  className="bg-transparent"
                  onClick={() => handleDeleteFile?.(file)}
                >
                  <Icon
                    icon="famicons:close"
                    className="w-5 h-5 text-error hover:text-opacity-70 custom-animation"
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
