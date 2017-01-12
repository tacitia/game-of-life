import d3 from 'd3';
import d3Kit from 'd3kit';
import d3Tip from 'd3-tip';

d3.tip = d3Tip;

const DEFAULT_OPTIONS = {
  margin: {top: 10, right: 10, bottom: 10, left: 10},
  initialWidth: 800,
  initialHeight: 800,
  numRows: 100,
  numColumns: 100,
};

const CUSTOM_EVENTS = [
  'cellClick'
];


export default d3Kit.factory.createChart(DEFAULT_OPTIONS, CUSTOM_EVENTS,
function constructor(skeleton){
  // alias
  const options = skeleton.options();
  const dispatch = skeleton.getDispatcher();
  const layers = skeleton.getLayerOrganizer();

  layers.create(['board', 'cells']);
  dispatch.on('data', visualize);

  //***************************************************//
  //*********** Computation Functions Begin ***********//
  //***************************************************//

  //***************************************************//
  //*********** Computation Functions End ***********//
  //***************************************************//

  //***************************************************//
  //*********** Draw Functions Begin ***********//
  //***************************************************//

  //***************************************************//
  //*********** Draw Functions End ***********//
  //***************************************************//


  function visualize(){
    if(!skeleton.hasData()) return;
    const data = skeleton.data();
    layers.get('connections').attr('transform', 'translate(' + options.termList.width + ', 0)');
    layers.get('topic-list').attr('transform', 'translate(' + (options.termList.width + options.connections.width) + ', 0)');
    visualizeTopTerms();
    visualizeTopTopics();
    visualizeConnections();
  }

  return skeleton.mixin({
    visualize
  });
});