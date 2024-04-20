"use client";

import { type ReactNode } from "react";
import { TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

export default function ClientTableRow(props: {
  children: ReactNode;
  href?: string;
}) {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => {
        props.href && router.push(props.href);
      }}
      className=" cursor-pointer "
    >
      {props.children}
    </TableRow>
  );
}
