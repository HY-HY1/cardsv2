import React, { useState, useEffect } from "react";
import FileUploader from "@/components/upload/FileUploader";

interface ImageUploadProps {
  onFileSelected: (file: File | null) => void;
  singleFile?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelected, singleFile }) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (singleFile) {
      // If singleFile, send first file or null
      onFileSelected(files[0] || null);
    } else {
      // If multiple files allowed, this prop would need to be updated accordingly
      // But your interface only accepts a single file callback, so:
      onFileSelected(files[0] || null);
    }
  }, [files, onFileSelected, singleFile]);

  return (
    <FileUploader
      onFilesSelected={setFiles}
      acceptedFileTypes={["image/png", "image/jpeg"]}
      multiple={!singleFile} // allow multiple only if singleFile is false/undefined
    />
  );
};

export default ImageUpload;
