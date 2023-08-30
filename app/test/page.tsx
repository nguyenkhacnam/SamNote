"use client";
import React from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { decrement, increment } from "@/redux/feature/CounterSlice";

const test = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  console.log("count", count);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count?.value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default test;
