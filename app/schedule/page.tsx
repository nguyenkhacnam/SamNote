"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FaDotCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

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

const meetings = [
    {
        id: 1,
        name: "Leslie Alexander",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2023-09-05T13:00",
        endDatetime: "2023-09-11T14:30",
    },
    {
        id: 2,
        name: "Michael Foster",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2023-09-06T09:00",
        endDatetime: "2023-09-06T11:30",
    },
    {
        id: 3,
        name: "Dries Vincent",
        imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2023-09-20T17:00",
        endDatetime: "2023-09-20T18:30",
    },
    {
        id: 4,
        name: "Leslie Alexander",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2023-09-09T13:00",
        endDatetime: "2023-09-09T14:30",
    },
    {
        id: 5,
        name: "Michael Foster",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2023-10-13T14:00",
        endDatetime: "2023-10-13T14:30",
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Schedule() {
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

    let selectedDayMeetings = meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.startDatetime), selectedDay)
    );

    return (
        <div className="py-5 md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px] h-screen">
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
                                        {meetings.some((meeting) =>
                                            isSameDay(
                                                parseISO(meeting.startDatetime),
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
                            Schedule for{" "}
                            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                                {format(selectedDay, "MMM dd, yyy")}
                            </time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                            {selectedDayMeetings.length > 0 ? (
                                selectedDayMeetings.map((meeting) => (
                                    <Meeting
                                        meeting={meeting}
                                        key={meeting.id}
                                    />
                                ))
                            ) : (
                                <p className="text-[#FFAD32]">
                                    No meetings for today.
                                </p>
                            )}
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    );
}

function Meeting({ meeting }: any) {
    let startDateTime = parseISO(meeting.startDatetime);
    let endDateTime = parseISO(meeting.endDatetime);

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <img
                src={meeting.imageUrl}
                alt=""
                className="flex-none rounded-full"
                width={40}
                height={40}
            />
            <div className="flex-auto">
                <p className="text-gray-900">{meeting.name}</p>
                <p className="mt-0.5">
                    <time dateTime={meeting.startDatetime}>
                        {format(startDateTime, "h:mm a")}
                    </time>{" "}
                    -{" "}
                    <time dateTime={meeting.endDatetime}>
                        {format(endDateTime, "h:mm a")}
                    </time>
                </p>
            </div>
            <Menu
                as="div"
                className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <FaDotCircle className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        Cancel
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
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
