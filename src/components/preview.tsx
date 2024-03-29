import Image from "next/image";

export function Preview({
 name,
 type,
 fileUrl,
}: {
 name?: string;
 type?: string;
 fileUrl?: string;
}) {
 const indexOfSlash = type?.indexOf("/");
 const extractType = type?.substring(0, indexOfSlash);

 switch (extractType) {
  case "image":
   return (
    <div className="flex flex-col w-full items-center">
     <Image
      alt={name ? name : "Pre visualização"}
      src={fileUrl ? fileUrl : ""}
      className=" max-w-96 max-h-96 aspect-square border object-contain border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
      height={600}
      width={600}
     />
    </div>
   );
   break;

  case "video":
   return (
    <div className="flex flex-col items-start max-w-96 md:max-w-6xl">
     <div className="flex flex-col gap-4 items-start">
      <video className=" max-w-96 max-h-96" src={fileUrl} controls></video>
      <div className="flex justify-center w-full"></div>
     </div>
    </div>
   );
   break;

  default:
   return <div></div>;
 }
}
