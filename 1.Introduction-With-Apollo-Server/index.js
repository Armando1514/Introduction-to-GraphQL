const { ApolloServer  } = require("apollo-server");

const { Query } = require("./resolvers/Query");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { Mutation } = require("./resolvers/Mutation");

const { db }  = require("./db.js");

const { typeDefs } = require("./schema.js");


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Product,
        Mutation
    },
    context: {
        db
    }
});

server.listen().then(({ url })=> {
    console.log("Server is ready at: " + url);
});