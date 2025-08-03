import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

/**
 * NotFound Page Component
 *
 * @remarks
 * This page is displayed when a user navigates to a non-existent route.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-[200px] font-light font-mono text-muted m-20">
        404
      </div>
      <Typography variant="h1">Not Found</Typography>
      <Typography variant="p">
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button asChild className="mt-4">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
