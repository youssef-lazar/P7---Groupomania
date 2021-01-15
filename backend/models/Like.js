module.exports = (sequelize, Datatypes) => {
    const Like = sequelize.define('Like', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
    });
    Like.associate = (models) => {
        Like.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
        Like.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
    }
    return Like;
}