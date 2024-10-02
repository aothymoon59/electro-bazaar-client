/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

interface FileUploadProps {
  label: string;
  fileInputData: File | null;
  onChange: any;
}

const EBFileInput = ({ label, fileInputData, onChange }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (files && files?.length > 0) {
      onChange(files?.[0]);
    } else {
      onChange(null); // Reset when no file is selected
    }
  };

  return (
    <div>
      <p className="text-[14px] mb-[9px]">{label}</p>
      <label className="h-10 bg-white rounded-lg flex items-center justify-center gap-2 cursor-pointer border border-dashed">
        <FaCloudDownloadAlt />
        {!fileInputData ? (
          <span>Upload File</span>
        ) : (
          <span>{fileInputData.name}</span>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default EBFileInput;
