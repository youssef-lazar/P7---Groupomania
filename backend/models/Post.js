module.exports = (sequelize, Datatypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        text: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: Datatypes.STRING,
            allowNull: true
        }
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }, onDelete: 'CASCADE'
        })
        Post.hasMany(models.Like)
        Post.hasMany(models.Comment)
    }
    return Post;
}