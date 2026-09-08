import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "@/App";
import { Pitch } from "@/components/pitch/Pitch";
import { PrototypeRoutes, type ProtoNumber } from "@/prototypes/registry";
import { Hub } from "@/prototypes/Hub";
import { BlogIndex } from "@/blog/BlogIndex";
import { PostPage } from "@/blog/PostPage";

const path = window.location.pathname.replace(/\/+$/, "");

let proto: ProtoNumber | null = null;
const match = /^\/([2-7])$/.exec(path);
if (match) {
  const n = Number(match[1]);
  if (n >= 2 && n <= 7) proto = n as ProtoNumber;
}

const isHub = path === "/1";
const isPitch = path === "/pitch";
const isBlogIndex = path === "/blog";
const blogPostMatch = /^\/blog\/([a-z0-9-]+)$/.exec(path);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isPitch ? (
      <Pitch />
    ) : isHub ? (
      <Hub />
    ) : proto ? (
      <PrototypeRoutes no={proto} />
    ) : isBlogIndex ? (
      <BlogIndex />
    ) : blogPostMatch ? (
      <PostPage slug={blogPostMatch[1]} />
    ) : (
      <App />
    )}
  </StrictMode>,
);
