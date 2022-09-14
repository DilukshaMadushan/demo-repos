const SocialFeed = require("../Models/SocialFeed");
const Coin = require("../Models/Coin");

const searchSocialFeeds = (model, populate) => async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Field to execute
  const removeFields = ["select", "sort", "page", "limit", "search"];

  //Loop over removeFileds and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Create query string
  let queryStr = JSON.stringify(reqQuery);

  //Create operators($gt,$gte,$lt,$lte ...etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Finding resource
  query = model.find(JSON.parse(queryStr));

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //Search
  if (req.query.search) {
    let filteredString = req.query.search.replace(/\\|]|\[/g, "");

    let queryList = [
      { title: new RegExp(filteredString, "gi") },
      {
        description: {
          $regex: `(?:${filteredString})`,
          $options: "i",
        },
      },
    ];

    const coinList = await Coin.find({
      name: {
        $regex: `(?:${filteredString})`,
        $options: "i",
      },
    }).select("_id");

    await coinList.forEach((i) => {
      queryList.push({ coins: i._id.toString() });
    });

    query = query.find({
      $or: queryList,
    });
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 24;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  //Executing query
  const results = await query;

  //Pagination results
  let pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.pre = {
      page: page - 1,
      limit,
    };
  }

  res.searchSocialFeeds = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = searchSocialFeeds;
