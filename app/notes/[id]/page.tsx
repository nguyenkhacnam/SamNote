import { FC } from "react";
import UpdateNote from '@/components/UpdateNote/UpdateNote'
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <UpdateNote />
    </div>
  );
};

export default page;
