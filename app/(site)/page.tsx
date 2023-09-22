"use client";

import Header from "@/components/Header";
import NoteItem from "@/components/NoteItem";
import { useCallback, useEffect, useState } from "react";
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

interface NoteSearch {
    idNote: number;
    content: string;
    color: any;
    createAt: string;
    title: string;
}

export default function Home() {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState<Note[]>([]);
    const [displayState, setDisplayState] = useState("list");
    const [displayNotes, setDisplayNotes] = useState("");
    const [dataSearchNotes, setDataSearchNotes] = useState<NoteSearch[]>();
    const [isSearch, setIsSearch] = useState();
    const user = useSelector((store: any) => store.user);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `https://lhvn.online/notes/${user.id}`
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            dispatch(getAllNotes(data.notes));
            setNotes(data?.notes);
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, user.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (displayNotes === "sortbydate") {
            const notesDate = [...notes];
            setNotes(
                notesDate.sort((a, b) =>
                    b.createAt
                        .replace(/\D/g, "")
                        .localeCompare(a.createAt.replace(/\D/g, ""))
                )
            );
        }

        if (displayNotes === "sortbyalpha") {
            const notesAlpha = [...notes];
            setNotes(notesAlpha.sort((a, b) => a.title.localeCompare(b.title)));
        }
    }, [displayNotes, notes]);

    const timeout = (ms: any) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const handlerSearchData = useCallback(async () => {
        await timeout(2000);
        try {
            const response = await fetch(
                `https://lhvn.online/notes_search?key=${isSearch}`
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            setDataSearchNotes(data?.search_note);
            console.log("value fetch: ", isSearch);
        } catch (error) {
            console.log(error);
        }
    }, [isSearch]);

    useEffect(() => {
        handlerSearchData();
    }, [handlerSearchData]);

    // console.log(displayState, ": ", notes);
    // console.log("search input:", isSearch);
    // console.log("Data search notes: ", dataSearchNotes);
    return (
        <div className="h-full w-full md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px]">
            <Header
                user={user}
                num_notes={notes?.length}
                setDisplayState={setDisplayState}
                setDisplayNotes={setDisplayNotes}
                setIsSearch={setIsSearch}
            />

            <div
                className={`pt-5 pb-[150px] ${
                    displayState === "list" && "flex flex-col gap-3"
                } ${displayState === "grid" && "grid grid-cols-2 gap-3"}`}
            >
                {isSearch === ""
                    ? notes?.map((note) => (
                          <NoteItem
                              key={note?.idNote}
                              id={note?.idNote}
                              content={note?.data}
                              color={note?.color}
                              createAt={note?.createAt}
                              title={note?.title}
                          />
                      ))
                    : dataSearchNotes?.map((note) => (
                          <NoteItem
                              key={note?.idNote}
                              id={note?.idNote}
                              content={note?.content}
                              title={note?.title}
                              color={{ a: 1, b: 237, g: 221, r: 255 }}
                              createAt="2023-09-06 09:47:11"
                          />
                      ))}
            </div>
        </div>
    );
}
