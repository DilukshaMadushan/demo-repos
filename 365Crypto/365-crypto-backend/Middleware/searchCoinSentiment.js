const CryptoNews_Sentiment = require("../Models/CryptoNews/CryptoNews_Sentiment");
const CryptoNews_SentimentSum = require("../Models/CryptoNews/CryptoNews_SentimentSum");
const searchCoinSentiment = (populate) => async (req, res, next) => {
  let query;
  let model;

  //Copy req.query

  let reqQuery = { ...req.query };
  // use cryptoNews_sentimentSum collection if coin pram is not in the request
  if (!reqQuery.coin) {
    model = CryptoNews_SentimentSum;
  
  } else {
    
    model = CryptoNews_Sentiment;
  
  }
  //Field to execute
  const removeFields = ["select", "sort", "page", "limit"];

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

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 31;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate && reqQuery.coin !== "" && !(typeof reqQuery.coin == 'undefined')) {
    
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

  res.searchCoinSentiment = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = searchCoinSentiment;
