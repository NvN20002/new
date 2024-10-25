import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "axios";
import "./App.css";

function App() {
  const [memos, addMemo] = useState([]);
  const [selected, setSelected] = useState(null);
  const [edit, isEditable] = useState(false);

  const client = Axios.create({
    baseURL: "https://memo-app-q5de.onrender.com/",
  });

  useEffect(() => {
    client
      .get()
      .then((res) => {
        const result = res.data;
        addMemo(result);
      })
      .catch((err) => console.error(`Read Error(DB_Client): ${err}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const InsertMemo = (memo) => {
    client
      .post("", memo)
      .then((res) => {
        const result = res.data;
        addMemo([...memos, result]);
      })
      .catch((err) => console.error(`Insert Error(DB_Client): ${err}`));
  };

  const UpdateMemo = () => {
    client
      .put("", selected)
      .then(() => {
        addMemo((prev) => {
          prev.map((memo) => {
            if (memo._id === selected._id) {
              memo.title = selected.title;
              memo.content = selected.content;
            }
            return memo;
          });
          return prev;
        });
      })
      .catch((err) => console.error(`Update Error(DB_Client): ${err}`));
  };

  const DeleteMemo = (id) => {
    client
      .delete("", { data: { _id: id } })
      .then(() => addMemo(memos.filter((memo) => memo._id !== id)))
      .catch((err) => console.error(`Delete Error(DB_Client): ${err}`));
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <CreateArea
          selected={selected}
          onClick={(memo) => {
            InsertMemo(memo);
          }}
        />

        <div
          className="notes"
          style={{ visibility: selected ? "hidden" : "visible" }}
        >
          {memos
            .slice(0)
            .reverse()
            .map((memo) => (
              <motion.div key={memo._id}>
                <motion.div
                  className="note"
                  id={memo._id}
                  layoutId={memo._id}
                  onClick={() => setSelected(memo)}
                >
                  <motion.h1>{memo.title}</motion.h1>
                  <motion.p>
                    {memo.content.length > 150
                      ? memo.content.slice(0, 150)
                      : memo.content}
                  </motion.p>
                </motion.div>
                <IconButton onClick={() => DeleteMemo(memo._id)}>
                  <DeleteIcon />
                </IconButton>
              </motion.div>
            ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div className="overlay">
              <motion.div
                layoutId={selected._id}
                className="animation-container"
                style={{
                  backgroundColor: edit
                    ? "rgb(255, 255, 255)"
                    : "rgb(245, 240, 245)",
                }}
              >
                <motion.button
                  className="close"
                  onClick={() => {
                    setSelected(null);
                    isEditable(false);
                  }}
                >
                  <CloseIcon />
                </motion.button>

                <motion.h1
                  contentEditable={edit ? true : false}
                  suppressContentEditableWarning={true}
                  name="title"
                  onBlur={(e) => {
                    const title = e.target.attributes.name.value;
                    const value = e.target.innerText;
                    setSelected({
                      ...selected,
                      [title]: value,
                    });
                  }}
                  style={{ outline: "none", backgroundColor: "inherit" }}
                >
                  {selected.title}
                </motion.h1>

                <motion.div style={{ height: "100%", overflow: "hidden" }}>
                  <motion.textarea
                    name="content"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setSelected({
                        ...selected,
                        [name]: value,
                      });
                    }}
                    value={selected.content}
                    readOnly={!edit ? true : false}
                  />
                </motion.div>

                <motion.div className="btn-container">
                  <motion.button
                    onClick={(e) => {
                      isEditable(true);
                    }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      isEditable(false);
                      UpdateMemo();
                    }}
                  >
                    Save
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
