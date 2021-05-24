module.exports = (sequelize, Sequelize) => {
    const otp = sequelize.define("otp", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        email_id: {
            type: Sequelize.TEXT
        },
        expiry: {
            type: Sequelize.DATE
        },
        otp: {
            type: Sequelize.STRING(6)
        }
    },{
        schema: "public",
        tableName: "otp",
        freezeTableName: true
    });
    return otp;
};