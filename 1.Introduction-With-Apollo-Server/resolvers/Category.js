
exports.Category = {
    products: (parent, args, context) => {
        const categoryId = parent.id;
        const { products } = context.db;
        let { filter } = args;
        let filterProducts = products.filter(product => product.categoryId === categoryId);        ;
        if(filter){
            if(filter.onSale === true){
                return filterProducts = filterProducts.filter(product => {
                    return product.onSale
                })
            }
        }
        return filterProducts  
    }
}