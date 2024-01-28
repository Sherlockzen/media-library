import React, { ReactNode } from "react";

function MediaContainer({ children }: { children: ReactNode }) {
 return <div className=" container flex flex-wrap gap-6">{children}</div>;
}

export default MediaContainer;
