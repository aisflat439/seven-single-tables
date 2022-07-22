
var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Team_possibleTypes = ['Team']
export var isTeam = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeam"')
  return Team_possibleTypes.includes(obj.__typename)
}



var Ticket_possibleTypes = ['Ticket']
export var isTicket = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTicket"')
  return Ticket_possibleTypes.includes(obj.__typename)
}
