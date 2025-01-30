"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import FileItem from "./components/file-item";

const generateTempFileId = (type: string, size: number, name: string) =>
  `(${type})-${size}-${name}`;

export enum AcceptedTypes {
  Image = "image/*",
  Audio = "audio/*",
  Video = "video/*",
  PDF = "application/pdf",
  TEXT = "text/plain",
}

type AcceptedValuesArray = (AcceptedTypes | string)[];

export enum UploadStatuses {
  Pending = "Pending",
  Uploading = "Uploading",
  Uploaded = "Uploaded",
  Failed = "Failed",
}

export type FileState = {
  id: string;
  serverId: string | undefined;
  file?: File | undefined;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: UploadStatuses;
};

export type Props<T> = {
  name: string;
  files: FileState[];
  setFiles: React.Dispatch<React.SetStateAction<FileState[]>>;
  acceptedTypes?: AcceptedValuesArray;
  multiple: boolean;
  errorMessage?: string | boolean;
  onUpload: (file: FileState) => Promise<{ id: string } & T>;
  onDelete: (file: FileState) => Promise<{ id: string } & T>;
  onUploadSuccess?: (file: T) => void;
  onDeleteSuccess?: (file: T) => void;
};

export default function FileInput<T>({
  name,
  files,
  setFiles,
  acceptedTypes = [],
  multiple,
  errorMessage,
  onUpload,
  onDelete,
  onUploadSuccess,
  onDeleteSuccess,
}: Props<T>) {
  const currentFileIds = files.map((file) =>
    generateTempFileId(file.type, file.size, file.name)
  );

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const selectedFilesArray = Array.from(selectedFiles);

    const filesToUpload = selectedFilesArray.filter(
      (f) =>
        !currentFileIds.includes(generateTempFileId(f.type, f.size, f.name))
    );

    const newFiles = filesToUpload.map<FileState>((f) => ({
      id: generateTempFileId(f.type, f.size, f.name),
      serverId: undefined,
      file: f,
      type: f.type,
      name: f.name,
      size: f.size,
      progress: 0,
      status: UploadStatuses.Pending,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    for (let i = 0; i < newFiles.length; i++) {
      handleUploadFile(newFiles[i]);
    }
  };

  const handleUploadFile = async (file: FileState) => {
    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: UploadStatuses.Uploading } : f
        )
      );
      const result = await onUpload(file);
      onUploadSuccess(result);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                serverId: result.id,
                status: UploadStatuses.Uploaded,
                progress: 100,
              }
            : f
        )
      );
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: UploadStatuses.Failed } : f
        )
      );
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDeleteFile = async (file: FileState) => {
    try {
      const result = await onDelete(file);
      onDeleteSuccess(result);
      setFiles((prev) => prev.filter((file) => file.serverId !== result.id));
    } catch (error) {}
  };

  return (
    <div className="sea-w-full sea-flex sea-flex-col sea-gap-1">
      {(!files.length || multiple) && (
        <div
          className={clsx(
            "sea-border-0.5 sea-px-3 sea-py-2 sea-rounded-xl sea-text-center",
            "sea-cursor-pointer sea-transition-all sea-duration-200 sea-ease-in-out",
            "hover:sea-border-primary",
            errorMessage
              ? "sea-border-error"
              : isDragging && "sea-border-primary"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <p className="sea-text-text-light">
            Drag & Drop files here or click to select files
          </p>
          <input
            id={name}
            name={name}
            ref={inputRef}
            type="file"
            className="sea-hidden"
            accept={acceptedTypes.join(",")}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      <div className="sea-flex sea-flex-nowrap sea-gap-2 sea-overflow-y-auto">
        {files.map((f, i) => (
          <FileItem
            key={`file-${name}-${i}`}
            file={f}
            handleUploadFile={handleUploadFile}
            handleDeleteFile={handleDeleteFile}
          />
        ))}
      </div>
      {errorMessage && (
        <p className="sea-pl-1 sea-text-sm sea-text-error">{errorMessage}</p>
      )}
    </div>
  );
}
