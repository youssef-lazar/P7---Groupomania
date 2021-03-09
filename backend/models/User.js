module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Veuillez saisir une adresse email valide"
                }
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        firstName: {
            type: Datatypes.STRING,
            allowNull: false
        },
        surname: {
            type: Datatypes.STRING,
            allowNull: false
        },
        photo: {
            type: Datatypes.STRING,
            allowNull: true
        },
        bio: {
            type: Datatypes.TEXT,
            allowNull: true
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Post)
        User.hasMany(models.Like)
        User.hasMany(models.Comment)
    };
    return User;
}