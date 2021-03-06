const mimetypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
];

const checkMimetype = (req, res, next) => {
  if ((!req.file) || mimetypes.includes(req.file.mimetype)) {
    next();
  } else {
    res.sendStatus(415);
  }
};

module.exports = checkMimetype;
