import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description: string;
}

const DESCRIPTION_SELECTOR = 'meta[name="description"]';

export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    const existing = document.head.querySelector<HTMLMetaElement>(
      DESCRIPTION_SELECTOR,
    );
    const element = existing ?? document.createElement("meta");

    if (!existing) {
      element.setAttribute("name", "description");
      document.head.appendChild(element);
    }

    element.setAttribute("content", description);

    return () => {
      if (!existing) element.remove();
    };
  }, [title, description]);
}
