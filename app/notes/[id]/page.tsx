import { FC } from "react";
import UpdateNote1 from '@/components/UpdateNote1/UpdateNote1'
interface pageProps {
  params: {
    id: number
  }
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      <UpdateNote1
        idNote={params?.id}
        color={{
          r: 0,
          g: 0,
          b: 0,
          a: 0
        }}
      />
    </div>
  );
};

export default page;