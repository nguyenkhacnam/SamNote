import Header from "@/components/Header";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return <div className="h-screen md:h-full w-full md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px]">
        <Header/>
    </div>;
};

export default page;
