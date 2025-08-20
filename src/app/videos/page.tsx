"use client";
import React, { useState } from "react";
import { Pen, X } from "lucide-react";

type tabKey = "details" | "tags" | "notes";
const Videos = () => {
  //   const tags = undefined;
  const tags = ["education", "motivation", "sports"];

  const notes = ["Improve voice", "Thumbnail Could be better"];

  const [tab, setTab] = useState<tabKey>("details");
  const [tagInput, setTagInput] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>("");

  const [notesValue, setNotesValue] = useState<string>("");
  return (
    <section className="mx-auto max-w-xl px-6 my-8">
      <div className="grid grid-cols-3">
        <div
          onClick={() => setTab("details")}
          className={`cursor-pointer pb-2  ${
            tab === "details" ? "border-b-3 border-b-black" : ""
          } font-black text-center`}
        >
          Video Details
        </div>
        <div
          onClick={() => setTab("tags")}
          className={`cursor-pointer pb-2  ${
            tab === "tags" ? "border-b-3 border-b-black" : ""
          } font-black text-center`}
        >
          Tags
        </div>
        <div
          onClick={() => setTab("notes")}
          className={`cursor-pointer pb-2  ${
            tab === "notes" ? "border-b-3 border-b-black" : ""
          } font-black text-center`}
        >
          Notes
        </div>
      </div>
      {tab === "details" ? (
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Title</h3>
            <p className="text-gray-700">
              How to be a good software developer?
            </p>
            <button className="px-2 py-1 rounded-sm cursor-pointer">
              Update Title
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              aspernatur tenetur odit officia dolorum tempora commodi in
              cupiditate labore! Obcaecati, sed dolor. Recusandae perspiciatis
              repudiandae at magnam ipsum minus delectus sequi quod, eos
              quisquam nobis ratione facilis officia iure fugiat placeat
              voluptate aperiam! Magnam ab commodi aliquam repellendus ducimus
              excepturi qui saepe quasi obcaecati praesentium consequuntur
              expedita, fugiat alias natus. Error maxime sapiente delectus
              magnam consequatur vero ducimus enim quidem nulla, voluptate
              excepturi esse quibusdam omnis ipsam incidunt quasi obcaecati.
              Ullam numquam dolorem aliquid ipsam nisi nesciunt deleniti dolores
              dolore nostrum quia excepturi, a sint nobis quae ab iusto earum.
            </p>
            <button className="px-2 py-1 rounded-sm cursor-pointer">
              Update Description
            </button>
          </div>
        </div>
      ) : null}

      {tab === "tags" ? (
        <div className="flex flex-col gap-4 mt-8">
          {tags ? (
            <ul className="flex gap-2 justify-center">
              {tags.map((tag, index) => (
                <li
                  className="border border-gray-700 px-2 py-1 rounded-full text-gray-700 text-sm flex gap-1 items-center"
                  key={index}
                >
                  <span>{tag}</span>
                  <X size={16} fill="red" className="cursor-pointer" />
                </li>
              ))}
            </ul>
          ) : (
            <p>No tags added</p>
          )}
          {tagInput ? (
            <input
              type="text"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              id="tag-value"
              placeholder="Enter tags (comma separated)"
              className="border border-gray-600 p-2 focus:outline-0 rounded-sm"
            />
          ) : null}
          <button
            className="cursor-pointer py-1 rounded-sm"
            onClick={() => setTagInput((prev) => !prev)}
          >
            Add tags
          </button>
        </div>
      ) : null}

      {tab === "notes" ? (
        <div className="flex flex-col gap-4 mt-8">
          <input
            type="text"
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            placeholder="Add an idea`/thought about the video"
            className="border border-gray-600 p-2 focus:outline-0 rounded-sm"
          />
          <button className="cursor-pointer py-1 rounded-sm">Add Note</button>
          <ul className="flex flex-col gap-2">
            {notes
              ? notes.map((note, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 px-2 py-1 text-[var(--accent)] font-semibold flex justify-between items-center"
                  >
                    <span>{note}</span>
                    <Pen size={16} className="cursor-pointer" />
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default Videos;
