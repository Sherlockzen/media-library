import React, { ReactNode } from "react";

function MediaContainer({ children }: { children: ReactNode }) {
 return <div className=" flex flex-wrap gap-6">{children}</div>;
}

export default MediaContainer;
