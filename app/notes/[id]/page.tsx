import { FC } from "react";
import UpdateNote from '@/components/UpdateNote/UpdateNote'
interface pageProps {
  params: {
    id: string
  }
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      <UpdateNote 
        idNote={params?.id}
      />
    </div>
  );
};

export default page;
