"use client";

import { FC } from "react";
import { BiSave } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NoteItemProps {
    id: number;
    content: string;
    color: any;
    createAt: string;
    title: string;
}

const NoteItem: FC<NoteItemProps> = ({
    id,
    content,
    color,
    createAt,
    title,
}) => {
    const route = useRouter();

    return (
        <Link
            href={{
                pathname: `/notes/${id}`,
                query: content, // the data
            }}
        >
            <div
                style={{
                    background: `rgb(${color.r} ${color.g} ${color.b} / ${color.a})`,
                }}
                className={`w-full h-[177px] md:h-[220px] rounded-[30px] p-5`}
            >
                <div className="flex items-center justify-between">
                    <p className="text-[12px] md:text-[16px]">{createAt}</p>
                    <BiSave className="text-[18px] md:text-[22px]" />
                </div>
                <h1 className="text-[14px] md:text-[18px] font-medium pt-2">
                    {title}
                </h1>
                <p className="text-[12px] md:text-[16px] max-h-[50px] overflow-hidden">
                    {content}
                </p>
            </div>
        </Link>
    );
};

export default NoteItem;
