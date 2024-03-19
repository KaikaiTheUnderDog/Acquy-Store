class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keywords = this.queryString.keywords
      ? {
          name: {
            $regex: this.queryString.keywords,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keywords });
    return this;
  }

  filter() {
    const queryCopied = { ...this.queryString };

    // Remove fields from the query
    const removeFields = ['keywords', 'limit', 'page'];
    removeFields.forEach((field) => delete queryCopied[field]);

    // Advance filter for price, ratings, ...
    let queryString = JSON.stringify(queryCopied);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(limit) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = limit * (currentPage - 1);

    if (skip >= this.query.length) {
      // Nếu có ít hơn, đặt trang hiện tại là trang cuối cùng
      this.query = this.query
        .limit(limit)
        .skip(Math.max(0, this.query.length - limit));
    } else {
      this.query = this.query.limit(limit).skip(skip);
    }

    return this;
  }
}

module.exports = APIFeatures;
