module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        message: {
            type: Datatypes.TEXT,
            allowNull: false
        }
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
    }
    return Comment;
}