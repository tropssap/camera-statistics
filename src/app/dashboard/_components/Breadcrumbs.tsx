"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { usePathname } from "next/navigation";


function splitPathIntoSegments(path: string) {
  const segments = path.split("/").filter(Boolean); // Split by '/' and remove empty strings
  const fullPathArray: { label: string; path: string }[] = [];

 
  segments.reduce((acc, segment) => {
    const newPath = `${acc}/${segment}`;
    fullPathArray.push({ path: newPath, label: segment });
    return newPath;
  }, "");

  return fullPathArray;
}

function Breadcrumbs() {
  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {splitPathIntoSegments(pathname).map((page, index, a) => (
          <>
            <BreadcrumbItem key={page.path}>
              {index !== a.length - 1 ? (
                <BreadcrumbLink href={page.path}>{page.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{page.label}</BreadcrumbPage>
              )}{" "}
            </BreadcrumbItem>
            {index !== a.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
