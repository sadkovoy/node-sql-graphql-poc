module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  });

  Channel.associate = (models) => {
    Channel.hasMany(models.video, { foreignKey: 'channel_id' });
  };

  return Channel;
};
