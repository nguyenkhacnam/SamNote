import Header from "@/components/Header";
import { FC } from "react";

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  return (
    <div className="h-full w-full md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px]">
            <Header user={undefined} num_notes={0} setDisplayState={undefined} setDisplayNotes={undefined} setIsSearch={undefined}            />
        </div>
  );
};

export default page;
