module.exports = (sequelize, DataTypes) => {
  const VideoCard = sequelize.define('videoCard', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      videoId: {
        type: DataTypes.INTEGER,
        field: 'video_id',
      },
    },
    {
      freezeTableName: true,
    });

  VideoCard.associate = (models) => {
    VideoCard.belongsTo(models.video, { foreignKey: 'video_id' });
  };

  return VideoCard;
};
