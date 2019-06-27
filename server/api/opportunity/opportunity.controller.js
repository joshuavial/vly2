const escapeRegex = require('../../util/regexUtil')
const Opportunity = require('./opportunity')
const Tag = require('./../tag/tag')

/**
 * Get all orgs
 * @param req
 * @param res
 * @returns void
 */
const getOpportunities = async (req, res) => {
  let query = {} // { status: 'active' }
  let sort = 'title'
  let select = {}

  try {
    query = req.query.q ? JSON.parse(req.query.q) : query
    sort = req.query.s ? JSON.parse(req.query.s) : sort
    select = req.query.p ? JSON.parse(req.query.p) : select
  } catch (e) {
    // console.log('bad JSON', req.query)
    return res.status(400).send(e)
  }

  if (req.query.search) {
    try {
      // decode the search term in case of strange characters
      const search = req.query.search.trim()
      const regexSearch = escapeRegex(search)

      // split around one or more whitespace characters
      const keywordArray = search.split(/\s+/)

      // case insensitive regex which will find tags matching any of the array values
      const tagSearchExpression = new RegExp(keywordArray.map(w => escapeRegex(w)).join('|'), 'i')

      // find tag ids to include in the opportunity search
      const matchingTagIds = await Tag.find({ 'tag': tagSearchExpression }, '_id').exec()

      const searchExpression = new RegExp(regexSearch, 'i')
      const searchParams = {
        $or: [
          { 'title': searchExpression },
          { 'subtitle': searchExpression },
          { 'description': searchExpression }
        ]
      }

      // mongoose isn't happy if we provide an empty array as an expression
      if (matchingTagIds.length > 0) {
        const tagIdExpression = {
          $or: matchingTagIds.map(id => ({ 'tags': id }))
        }
        searchParams.$or.push(tagIdExpression)
      }

      query = {
        $and: [
          searchParams,
          query
        ]
      }
    } catch (e) {
      // something went wrong constructing the query but we don't know what
      return res.status(500).send(e)
    }
  }

  try {
    const got = await Opportunity.find(query, select).sort(sort).exec()
    res.json(got)
  } catch (e) {
    return res.status(404).send(e)
  }
}

const getOpportunity = async (req, res) => {
  // console.log('getOpportunity', req.params)
  try {
    const got = await Opportunity.findOne(req.params)
      .populate('requestor')
      .populate('tags')
      .exec()
    res.json(got)
  } catch (e) {
    // TEST: can't seem to get here. bad id handled earlier
    res.status(404).send(e)
  }
}

module.exports = {
  getOpportunities,
  getOpportunity
}
