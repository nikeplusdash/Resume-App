module.exports = (sequelize, Sequelize) => {
    const cvresume = sequelize.define("cvresume", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        cvname: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email_id: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.JSON
        }
    },{
        schema: "public",
        tableName: "cvresume",
        freezeTableName: true
    });

    return cvresume;
};