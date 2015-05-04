/**
 * @fileOverview WebRTC Framework to facilitate the development of Applications that seamless interoperate between each other
 * @author Paulo Chainho <paulo-g-chainho@ptinovacao.pt>
 * @author Steffen Druesedow <Steffen.Druesedow@telekom.de>
 * @author Miguel Seijo Simo <Miguel.Seijo@telekom.de>
 * @author Vasco Amaral <vasco-m-amaral@ptinovacao.pt>
 * @author Kay Haensge <Kay.Haensge@telekom.de>
 * @author Luis Oliveira <luis-f-oliveira@ptinovacao.pt>
 */


/**
 * @class
 * The Resource class represents the digital assets that are shared among participants in the conversation.
 *
 * @param {ResourceConstraint} resourceConstraint - Constraints of the Resource. Object with the following syntax {type: ResourceType, constraints: codec or MediaStreamConstraints}
 * @param {Codec} [codec] - For data types only, Codec used.
 */

function Resource(resourceConstraint, codec) {

  this.constraint = resourceConstraint;
  this.connections = new Array();
  this.owner;
  this.stream;

  if (codec) {
    this.codec = codec;
    this.constraint.constraints = codec;
  }
}
