import { LinkProtocolOptions } from "@tiptap/extension-link/dist";

export const isAllowedUri = (
  url: string,
  ctx: {
    defaultValidate: (url: string) => boolean;
    protocols: Array<LinkProtocolOptions | string>;
    defaultProtocol: string;
  }
): boolean => {
  try {
    // construct URL
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`${ctx.defaultProtocol}://${url}`);

    // use default validation
    if (!ctx.defaultValidate(parsedUrl.href)) {
      return false;
    }

    // disallowed protocols
    const disallowedProtocols = ["ftp", "file", "mailto"];
    const protocol = parsedUrl.protocol.replace(":", "");

    if (disallowedProtocols.includes(protocol)) {
      return false;
    }

    // only allow protocols specified in ctx.protocols
    const allowedProtocols = ctx.protocols.map((p) =>
      typeof p === "string" ? p : p.scheme
    );

    if (!allowedProtocols.includes(protocol)) {
      return false;
    }

    // disallowed domains
    const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
    const domain = parsedUrl.hostname;

    if (disallowedDomains.includes(domain)) {
      return false;
    }

    // all checks have passed
    return true;
  } catch {
    return false;
  }
};

export const shouldAutoLink = (url: string): boolean => {
  try {
    // construct URL
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`https://${url}`);

    // only auto-link if the domain is not in the disallowed list
    const disallowedDomains = [
      "example-no-autolink.com",
      "another-no-autolink.com",
    ];
    const domain = parsedUrl.hostname;

    return !disallowedDomains.includes(domain);
  } catch {
    return false;
  }
};

export type FontFamilyStyles =
  | "default"
  | "Inter"
  | '"Comic Sans MS", "Comic Sans"'
  | "serif"
  | "monospace"
  | "cursive"
  | "Exo 2";

export type FontType = {
  label: string;
  style: FontFamilyStyles;
};

export const SupportedFontFamilies: FontType[] = [
  {
    label: "Default",
    style: "default",
  },
  {
    label: "Inter",
    style: "Inter",
  },
  {
    label: "Comic Sans",
    style: '"Comic Sans MS", "Comic Sans"',
  },
  {
    label: "Serif",
    style: "serif",
  },
  {
    label: "Monospace",
    style: "monospace",
  },
  {
    label: "Cursive",
    style: "cursive",
  },
  {
    label: "Exo 2",
    style: "Exo 2",
  },
];
