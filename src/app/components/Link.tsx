import NextLink, { LinkProps } from "next/link";
import { forwardRef } from "react";

export default function Link() {
  return forwardRef<HTMLAnchorElement, LinkProps>(
    function LinkComponent(props, ref) {
      return <NextLink ref={ref} {...props} />;
    }
  );
}
