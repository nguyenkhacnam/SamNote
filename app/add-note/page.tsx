import NewNote from "@/components/NewNote";
import { FC } from "react";

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  return (
    <div>
      <NewNote />
    </div>
  );
};

export default page;
