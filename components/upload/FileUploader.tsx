// FileUploader.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  acceptedFileTypes = ['image/*'],
  multiple = false,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(','),
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition-all"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file(s) here...</p>
      ) : (
        <p>Drag & drop file(s) here, or click to select</p>
      )}
    </div>
  );
};

export default FileUploader;
