module.exports = (sequelize, Sequelize) => {
    const cvresume = sequelize.define("client", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        otp: {
            type: Sequelize.JSON
        }
    },{
        schema: "public",
        tableName: "otp",
        freezeTableName: true
    });
    return cvresume;
};