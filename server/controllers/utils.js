const slug = require("slug");
const ShortUniqueId = require("short-unique-id");
const crypto = require("crypto");

const calculateReadingTime = (data) => {
  const words = data.split(/\s+/);
  const wordCount = words.filter((word) => word !== "").length;

  const reading_time = Math.max(1, Math.round(wordCount / 200));

  return reading_time;
};

const uid = new ShortUniqueId({ length: 10 }).rnd();

const generateSlug = (data) => {
  return data
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const slugIt = (data) => {
  const slugged = `${generateSlug(data)}-${uid}`;
  return slugged;
};

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const utils = { calculateReadingTime, slugIt, generateToken };

module.exports = utils;
