"use client";
import React, { useState } from "react";

function UploadFile() {
 const [file, setFile] = useState<File | undefined>(undefined);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFile(e.target.files?.[0]);
 };
 return <input onChange={handleChange} type="file" className=" border-2 p-2" />;
}

export default UploadFile;
