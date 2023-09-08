"use client";

import UpdateNote from "@/components/UpdateNote/UpdateNote";
import { useRouter } from "next/router";

const Notes = ({}) => {
    const route = useRouter();

    console.log(route.query);

    return (
        <div>
            <UpdateNote />
        </div>
    );
};

export default Notes;
