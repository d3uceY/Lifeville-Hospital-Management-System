import React from "react";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "lucide-react";
import packageJson from '../../package.json'
import { Link } from "react-router-dom";

export default function AppVersion() {
  return (
    <div className="flex items-center gap-4 font-mono">
      <span className="text-sm text-muted-foreground">App Version</span>
      <Badge variant="secondary" className="">v{packageJson.version}</Badge>
      <Link to="https://github.com/d3uceY" target="_blank" className="flex items-center gap-2 hover:underline">
        <span className="text-sm text-muted-foreground">Made by </span><GithubIcon className="w-4 h-4" /> d3uceY (Jesse)
      </Link>
    </div>
  );
}
