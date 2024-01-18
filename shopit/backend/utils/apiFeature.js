class APIFeature {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter() {
        const queryCpy = { ...this.queryStr };
        
        const removFields = ['keyword', 'limit', 'page'];
        removFields.forEach(el => delete queryCpy[el]);
        
        // Check if category field exists in the query and is not 'All'
        if(queryCpy.category && queryCpy.category !== 'All') {
            queryCpy.category = {
                $regex: queryCpy.category,
                $options: 'i' // case insensitive
            };
        } else {
            // If category is 'All', remove it from the query
            delete queryCpy.category;
        }
        
        let queryStr = JSON.stringify(queryCpy)
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    

    pagination(resPerPage) {
        const CurentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (CurentPage -1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeature