import { Typography } from "@/components/ui/typography";
import {} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="m-10 md:m-40 flex flex-col items-center gap-8">
      <Typography variant="h1">Good Morning, User</Typography>
      <Input placeholder="How can I help you today?" />
    </div>
  );
}
