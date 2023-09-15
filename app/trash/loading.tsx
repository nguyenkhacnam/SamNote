import { BounceLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <BounceLoader color="#8AC3FC" size={40} />
        </div>
    );
}
