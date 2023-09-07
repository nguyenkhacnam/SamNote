import { FC } from "react";
import { BiSave } from "react-icons/bi";
import Link from "next/link";

interface NoteItemProps {
    id: number;
    content: string;
    color: object;
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
    return (
        <Link href={`/notes/${id}`}>
            <div
                className={`bg-[rgba(255,255,1,1)] w-full h-[177px] rounded-[30px] p-5`}
            >
                <div className="flex items-center justify-between">
                    <p className="text-[12px]">{createAt}</p>
                    <BiSave className="text-[18px]" />
                </div>
                <h1 className="text-[14px] font-medium pt-2">{title}</h1>
                <p className="text-[12px] max-h-[50px] overflow-hidden">
                    {content}
                </p>
            </div>
        </Link>
    );
};

export default NoteItem;
