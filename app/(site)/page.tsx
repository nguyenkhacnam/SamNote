"use client";

import Header from "@/components/Header";
import NoteItem from "@/components/NoteItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllNotes } from "@/redux/feature/NotesSlice";
interface Note {
    idNote: number;
    data: string;
    color: any;
    createAt: string;
    title: string;
}

export default function Home() {
    const dispatch = useDispatch(); 
    const [notes, setNotes] = useState<Note[]>([]);
    const [displayState, setDisplayState] = useState("list");
    const user = useSelector((store: any) => store.user);
    console.log(user);

    

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://14.225.7.221:18011/notes/${user.id}`,{ next: { revalidate: 3600 }, cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            // console.log('data.note', data.notes)
            dispatch(getAllNotes(data.notes));
            setNotes(data?.notes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // if (displayState === "sortbydate") {
    //     setNotes((prevState) => {
    //         return prevState.reverse();
    //     });
    // }
    // console.log(notes);

    return (
        <div className="h-full w-full md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px]">
            <Header
                user={user}
                num_notes={notes?.length}
                setDisplayState={setDisplayState}
            />
            <div className="pt-5 pb-[150px] flex flex-col gap-3">
                {notes?.map((note) => (
                    <NoteItem
                        key={note?.idNote}
                        id={note?.idNote}
                        content={note?.data}
                        color={note?.color}
                        createAt={note?.createAt}
                        title={note?.title}
                    />
                ))}
            </div>
        </div>
    );
}
