module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('video', {
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

  Video.associate = (models) => {
    Video.hasMany(models.videoCard, { foreignKey: 'video_id' });
  };

  return Video;
};
