import React, { useState } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [zoom, setZoom] = useState(false);

  const getNote = (e) => {
    const { name, value } = e.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const resizeTextArea = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div>
      <form
        className="create-note"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {zoom && (
          <textarea
            style={{ fontWeight: 700 }}
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={getNote}
            rows={1}
            onInput={resizeTextArea}
          />
        )}

        <textarea
          id="content"
          name="content"
          placeholder="I've got an idea..."
          onInput={resizeTextArea}
          onChange={getNote}
          value={note.content}
          onClick={() => {
            setZoom(true);
          }}
        />

        <Zoom in={zoom}>
          <Fab
            style={{ display: props.selected ? "none" : "flex" }}
            onClick={(e) => {
              props.onClick(note);
              setNote({ title: "", content: "" });
              setZoom(false);
              const element = document.getElementById("content");
              element.style.height = "27px";
              e.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
