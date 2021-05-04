module.exports = (sequelize, Sequelize) => {
    const client = sequelize.define("client", {
        id: {
            type: Sequelize.TEXT,
            allowNull: false,
            primaryKey: true
        },
        fname: {
            type: Sequelize.TEXT,
        },
        lname: {
            type: Sequelize.TEXT,
        },
        pwd: {
            type: Sequelize.TEXT,
        },
        link_gmail: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        img_thumb: {
            type: Sequelize.TEXT
        },
    }, {
        schema: "public",
        tableName: "client",
        freezeTableName: true
    });

    return client;
};