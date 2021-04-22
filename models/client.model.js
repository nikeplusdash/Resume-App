module.exports = (sequelize, Sequelize) => {
    const client = sequelize.define("client", {
        id: {
            type: Sequelize.TEXT,
            allowNull: false,
            primaryKey: true
        },
        fname: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        lname: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        pwd: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        link_gmail: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        img_thumb: {
            type: Sequelize.BLOB
        },
    }, {
        schema: "public",
        tableName: "client",
        freezeTableName: true
    });

    return client;
};