
exports.Query = {
    products: (parent, args, context) => {
        let { filter } = args;
        let filterProducts = context.db.products;
        let reviews = context.db.reviews;

        if(filter){
            const { onSale, avgRating } = filter;

            if(onSale === true){
                filterProducts = filterProducts.filter(product => {
                    return product.onSale
                })
            }
            if([1, 2, 3, 4, 5].includes(avgRating)) {
                filterProducts = filterProducts.filter(product => {
                    let sumRating = 0;
                    let numberOfReviews = 0;
                    reviews.forEach(review => {
                        if(review.productId === product.id) {
                            numberOfReviews ++;
                            sumRating += review.rating
                        }
                    })
                    const avgProductRating =  sumRating/ numberOfReviews;
                    return avgProductRating >= avgRating
                })
            }
        }
        return filterProducts  
    },
    product: (parent, args, context) => {
        const { id: productId } = args;
        const { products } = context.db;
        return products.find(product => product.id == productId);
    },
    categories: (parent, args, context) => context.db.categories,
    category: (parent, args, context) => {
        const { id: categoryId } = args;
        const { categories } = context.db;
        return categories.find(category => category.id == categoryId);
    }
}