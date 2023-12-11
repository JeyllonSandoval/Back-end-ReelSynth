"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    try {
        await (0, mongoose_1.connect)(config_1.MONGO_URL);
        console.log('DB Connected');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
