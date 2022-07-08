
exports.Product = {
    category: (parent, args, context) => {
        const categoryId = parent.categoryId;
        const { categories } = context;
        return categories.find(category => category.id == categoryId);
    },
    reviews: (parent, args, context) => {
        const parentId = parent.id;
        const { reviews } = context;
        return reviews.filter(review => review.productId == parentId);
    }
}