import { FC } from "react";
import UpdateNote from '@/components/UpdateNote/UpdateNote'
interface pageProps {
  params: {
    id: number
  }
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      <UpdateNote
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