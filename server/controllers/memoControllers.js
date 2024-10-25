import Memo from "../models/memoModel.js";

// @desc Get memo
// @route GET /
// @access Public
const getMemo = (req, res) => {
  Memo.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(`Read Error(DB): ${err}`.red.bgWhite);
      process.exit(1);
    });
};

// @desc post memo
// @route POST /
// @access Public
const postMemo = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const memo = new Memo({
    title: title,
    content: content,
  });

  memo
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(`Insert Error(DB): ${err}`.red.bgWhite);
      process.exit(1);
    });
};

// @desc update memo
// @route PUT /
// @access Public
const updateMemo = (req, res) => {
  const id = req.body._id;

  Memo.findByIdAndUpdate(
    id,
    { title: req.body.title, content: req.body.content },
    (err, data) => {
      if (err) {
        console.error(`Update Error(DB): ${err}`.red.bgWhite);
        process.exit(1);
      }
      if (data) res.json(data);
    }
  );
};

// @desc Delete memo
// @route DELETE/
// @access Public
const deleteMemo = (req, res) => {
  const id = req.body._id;
  Memo.findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(`Delete Error(DB): ${err}`.red.bgWhite);
      process.exit(1);
    });
};

export { getMemo, postMemo, updateMemo, deleteMemo };
