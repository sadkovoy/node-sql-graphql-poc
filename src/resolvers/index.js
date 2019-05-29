const getFields = require('graphql-fields');

async function getListEntityQueryResponse(model, args, resolveInfo) {
  const { page, itemsPerPage } = args;

  const tableAttributes = Object.keys(model.tableAttributes);
  const requestedAttributes = Object.keys(getFields(resolveInfo).items)
    .filter(field => tableAttributes.includes(field));

  const options = {
    attributes: requestedAttributes,
    paginate: itemsPerPage,
    page,
  };
  const result = await model.paginate(options);

  return {
    items: result.docs,
    pagination: {
      page,
      itemsPerPage,
      totalPages: result.pages,
    },
  };
}

async function getSingleEntityQueryResponse(model, args, resolveInfo) {
  const { id } = args;

  const tableAttributes = Object.keys(model.tableAttributes);
  const attributes = Object.keys(getFields(resolveInfo))
    .filter(field => tableAttributes.includes(field));

  return model.findByPk(id, { attributes });
}

module.exports = {
  Video: {
    cards: (parent) => parent.getVideoCards(),
  },
  VideoCard: {
    video: (parent) => parent.getVideo(),
  },
  Query: {
    videos: async (parent, args, { db }, info) => {
      return getListEntityQueryResponse(db.video, args, info);
    },
    videoCards: async (parent, args, { db }, info) => {
      return getListEntityQueryResponse(db.videoCard, args, info);
    },
    video: (parent, { id }, { db }, info) => {
      return getSingleEntityQueryResponse(db.video, args, info);
    },
    videoCard: (parent, args, { db }, info) => {
      return getSingleEntityQueryResponse(db.videoCard, args, info);
    },
  },
};
