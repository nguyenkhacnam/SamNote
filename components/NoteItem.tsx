"use client";

import { FC } from "react";
import { TfiSave } from "react-icons/tfi";
import Link from "next/link";
import ShowMoreText from "react-show-more-text";

interface NoteItemProps {
    id: number;
    content: string;
    color: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
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
    function rgbaToHex(rgbaColor: {
        r: number;
        g: number;
        b: number;
        a: number;
    }): string {
        const { r, g, b, a } = rgbaColor;

        // Chuyển đổi giá trị rgba thành các số nguyên từ 0 đến 255
        const rInt = Math.round(r);
        const gInt = Math.round(g);
        const bInt = Math.round(b);

        // Chuyển đổi alpha thành giá trị từ 0 đến 255
        const aInt = Math.round(a * 255);

        // Chuyển đổi giá trị thành chuỗi hex
        const rHex = rInt.toString(16).padStart(2, "0");
        const gHex = gInt.toString(16).padStart(2, "0");
        const bHex = bInt.toString(16).padStart(2, "0");
        const aHex = aInt.toString(16).padStart(2, "0");

        // Kết hợp các giá trị hex để tạo chuỗi hex hoàn chỉnh
        const hexColor = `#${rHex}${gHex}${bHex}${aHex}`;

        return hexColor;
    }

    const hexColor = rgbaToHex(color);

    return (
        <Link href={`/notes/${id}`}>
            <div
                className={`w-full h-full rounded-[30px] p-5`}
                style={{ backgroundColor: hexColor }}
            >
                <div className="flex items-center justify-between">
                    <p className="text-[12px] md:text-[20px] lg:text-[24px]">
                        {createAt}
                    </p>
                    <TfiSave className="text-[20px] md:text-[24px] lg:text-[26px]" />
                </div>
                <h1 className="text-[14px] md:text-[20px] lg:text-[24px] font-medium pt-2">
                    {title}
                </h1>
                <ShowMoreText
                    lines={3}
                    more="Show more"
                    less="Show less"
                    className="content-css pt-3 md:text-[20px] lg:text-[24px]"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    {content}
                </ShowMoreText>
            </div>
        </Link>
    );
};

export default NoteItem;
