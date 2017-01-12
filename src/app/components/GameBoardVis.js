import d3 from 'd3';
import d3Kit from 'd3kit';
import d3Tip from 'd3-tip';

d3.tip = d3Tip;

const DEFAULT_OPTIONS = {
  margin: {top: 50, right: 50, bottom: 50, left: 50},
  initialWidth: 600,
  initialHeight: 600,
  numRows: 50,
  numColumns: 50,
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

  drawBoard();


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

  }

  function initializeCells() {
    layers.get('cells')
      .selectAll('rect')
      .data()
  }

  function drawBoard() {
    layers.get('board')
      .selectAll('.row-separator')
      .data(d3.range(options.numRows-1))
      .enter()
      .append('g')
      .attr('class', 'row-separator')
      .attr('transform', d => 'translate(0, ' + (d+1) * skeleton.getInnerHeight() / options.numRows + ')')
      .append('line')
      .attr('x1', 0)
      .attr('x2', skeleton.getInnerWidth())
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke-width', 1)
      .attr('stroke', '#ccc');

    layers.get('board')
      .selectAll('.col-separator')
      .data(d3.range(options.numColumns-1))
      .enter()
      .append('g')
      .attr('class', 'col-separator')
      .attr('transform', d => 'translate(' + (d+1) * skeleton.getInnerWidth() / options.numColumns + ', 0)')
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', skeleton.getInnerHeight())
      .attr('stroke-width', 1)
      .attr('stroke', '#ccc');

    layers.get('board')
      .append('rect')
      .attr('id', 'background')
      .attr('width', skeleton.getInnerWidth())
      .attr('height', skeleton.getInnerHeight())
      .attr('fill', '#eee')
      .on('click', (e) => {
        console.log(e)
      });
  }

  return skeleton.mixin({
    visualize
  });
});