module.exports = (sequelize, DataTypes) => {
  const VideoCard = sequelize.define('video_card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    videoId: {
      type: DataTypes.INTEGER,
      field: 'video_id'
    }
  },
  {
    freezeTableName: true,
  });

  VideoCard.associate = (models) => {
    VideoCard.belongsTo(models.channel, { foreignKey: 'channel_id' });
  };

  return VideoCard;
};
