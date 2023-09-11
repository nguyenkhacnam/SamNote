"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FaDotCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import ShowMoreText from "react-show-more-text";

import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Schedule() {
    const { notes } = useSelector((state: any) => state.notes);

    const router = useRouter();
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    // let selectedDayMeetings = meetings.filter((meeting) =>
    //     isSameDay(parseISO(meeting.startDatetime), selectedDay)
    // );

    let selectedDayNotes = notes?.filter((note: any) =>
        isSameDay(parseISO(note?.createAt), selectedDay)
    );

    return (
        <div className="pt-5 pb-[120px] md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px] md:h-[calc(100vh-80px)] h-full">
            <div className="flex items-center gap-3 pb-5 md:pb-8 lg:pb-10 xl:pb-15">
                <IoIosArrowBack
                    onClick={() => router.back()}
                    className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
                />
                <h1 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold">
                    Calendar
                </h1>
            </div>
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200">
                    <div className="lg:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900 md:text-[20px] lg:text-[24px]">
                                {format(firstDayCurrentMonth, "MMMM yyyy")}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500 md:text-[20px] lg:text-[24px] md:mb-6">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm md:text-[20px] lg:text-[24px] md:gap-5">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 &&
                                            colStartClasses[getDay(day)],
                                        "py-1.5"
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) &&
                                                "text-white",
                                            !isEqual(day, selectedDay) &&
                                                isToday(day) &&
                                                "text-red-500",
                                            !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                isSameMonth(
                                                    day,
                                                    firstDayCurrentMonth
                                                ) &&
                                                "text-gray-900",
                                            !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                !isSameMonth(
                                                    day,
                                                    firstDayCurrentMonth
                                                ) &&
                                                "text-gray-400",
                                            isEqual(day, selectedDay) &&
                                                isToday(day) &&
                                                "bg-red-500",
                                            isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                "bg-gray-900",
                                            !isEqual(day, selectedDay) &&
                                                "hover:bg-gray-200",
                                            (isEqual(day, selectedDay) ||
                                                isToday(day)) &&
                                                "font-semibold",
                                            "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                        )}
                                    >
                                        <time
                                            dateTime={format(day, "yyyy-MM-dd")}
                                        >
                                            {format(day, "d")}
                                        </time>
                                    </button>

                                    <div className="w-1 h-1 mx-auto mt-1">
                                        {notes.some((note: any) =>
                                            isSameDay(
                                                parseISO(note?.createAt),
                                                day
                                            )
                                        ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="mt-12 lg:mt-0 lg:pl-14">
                        <h2 className="font-semibold text-gray-900 md:text-[20px] lg:text-[24px]">
                            Notes for{" "}
                            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                                {format(selectedDay, "MMM dd, yyy")}
                            </time>
                        </h2>
                        <div className="mt-5 flex flex-col gap-3">
                            {selectedDayNotes.length > 0 ? (
                                selectedDayNotes.map((note: any) => (
                                    <Note note={note} key={note.idNote} />
                                ))
                            ) : (
                                <p className="text-[#FFAD32]">
                                    No notes for today.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function Note({ note }: any) {
    console.log(note.data.length);
    return (
        <div className="pb-5 pt-3 px-5 bg-[#D9D9D9] rounded-[30px]">
            <h2 className="text-black text-[16px] font-semibold">
                {note.createAt}
            </h2>
            <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                expanded={false}
                width={280}
                truncatedEndingComponent={"... "}
            >
                {note.data}
            </ShowMoreText>
        </div>
    );
}

let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];
