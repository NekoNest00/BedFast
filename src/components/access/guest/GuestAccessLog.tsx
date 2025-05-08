
import React from "react";
import AccessLog from "../displays/AccessLog";

interface GuestAccessLogProps {
  accessLog: {time: Date, action: string}[];
}

export default function GuestAccessLog({ accessLog }: GuestAccessLogProps) {
  return <AccessLog accessLog={accessLog} />;
}
