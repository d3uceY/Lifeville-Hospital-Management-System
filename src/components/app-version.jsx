import React from "react";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "lucide-react";
import packageJson from '../../package.json'
import { Link } from "react-router-dom";

export default function AppVersion() {
  return (
    <div className="flex flex-col gap-2 font-mono">
      <Link to="https://github.com/d3uceY" target="_blank" className="text-xs flex items-center gap-2 hover:underline">
        <span className="text-muted-foreground">Made by </span><GithubIcon className="w-3 h-3" /> d3uceY (Jesse)
      </Link>
      <Badge variant="secondary" className="text-xs">v{packageJson.version}</Badge>
    </div>
  );
}
