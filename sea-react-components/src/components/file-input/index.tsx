"use client";

import React, { useEffect, useRef, useState } from "react";

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
  serverId?: string;
  file?: File;
  URL?: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: UploadStatuses;
};

export type Props<T> = {
  name: string;
  acceptedTypes?: AcceptedValuesArray;
  multiple?: boolean;
  initialFiles?: FileState[];
  onUpload: (file: FileState) => Promise<{ id: string } & T>;
  onDelete: (file: FileState) => Promise<{ id: string } & T>;
  onUploadSuccess?: (file: T) => void;
  onDeleteSuccess?: (file: T) => void;
  errorMessage?: string;

  children: (props: {
    inputRef: React.RefObject<HTMLInputElement>;
    inputProps: {
      id: string;
      name: string;
      type: string;
      accept: string;
      multiple: boolean;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    isDragging: boolean;
    files: FileState[];
    handleDeleteFile: (file: FileState) => void;
    handleUploadFile: (file: FileState) => void;
    setFiles: React.Dispatch<React.SetStateAction<FileState[]>>;
    errorMessage?: string;
  }) => React.ReactNode;
};

const generateTempFileId = (type: string, size: number, name: string) =>
  `(${type})-${size}-${name}`;

export default function FileInput<T>({
  name,
  acceptedTypes = [],
  initialFiles = [],
  multiple = false,
  onUpload,
  onDelete,
  onUploadSuccess,
  onDeleteSuccess,
  children,
  errorMessage,
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileState[]>(initialFiles);

  const currentFileIds = files.map((file) =>
    generateTempFileId(file.type, file.size, file.name)
  );

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const selectedArray = Array.from(selectedFiles);
    const filesToUpload = selectedArray.filter(
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
    newFiles.forEach(handleUploadFile);
  };

  const handleUploadFile = async (file: FileState) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, status: UploadStatuses.Uploading } : f
      )
    );

    try {
      const result = await onUpload(file);
      onUploadSuccess?.(result); // This allows parent to set `iconFileId`

      // For single-file mode: remove old uploaded file if any
      if (!multiple) {
        const uploadedFile = {
          ...file,
          serverId: result.id,
          status: UploadStatuses.Uploaded,
          progress: 100,
        };

        const oldUploaded = files.find(
          (f) => f.status === UploadStatuses.Uploaded
        );

        // Delete old uploaded file
        if (oldUploaded && oldUploaded.serverId) {
          await onDelete(oldUploaded);
          onDeleteSuccess?.(oldUploaded as any);
        }

        setFiles([uploadedFile]); // Keep only the new one
      } else {
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
      }
    } catch {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: UploadStatuses.Failed } : f
        )
      );
    }
  };

  const handleDeleteFile = async (file: FileState) => {
    try {
      const result = await onDelete(file);
      onDeleteSuccess?.(result);
      setFiles((prev) => prev.filter((f) => f.serverId !== result.id));
    } catch {}
  };

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  return (
    <>
      {children({
        inputRef,
        inputProps: {
          id: name,
          name,
          type: "file",
          accept: acceptedTypes.join(","),
          multiple,
          onChange: (e) => handleFiles(e.target.files),
        },
        isDragging,
        files,
        handleDeleteFile,
        handleUploadFile,
        setFiles,
        errorMessage,
      })}
    </>
  );
}
