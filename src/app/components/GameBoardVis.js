import d3 from 'd3';
import d3Kit from 'd3kit';
import d3Tip from 'd3-tip';

d3.tip = d3Tip;

const DEFAULT_OPTIONS = {
  margin: {top: 20, right: 50, bottom: 50, left: 50},
  initialWidth: 800,
  initialHeight: 800,
  numRows: 50,
  numColumns: 50,
};

const CUSTOM_EVENTS = [
  'cellSelect',
  'cellDeselect'
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

  function visualize(){
    if(!skeleton.hasData()) return;
    const data = skeleton.data();
    updateCells(skeleton.data().liveCells);
  }

  function updateCells(cellData) {
    const cellHeight = skeleton.getInnerHeight() / options.numRows;
    const cellWidth = skeleton.getInnerWidth() / options.numColumns;

    const cells = layers.get('cells')
      .selectAll('rect')
      .data(cellData, (d, i) => d.x + '-' + d.y);
    const deadCells = cells.exit();
    deadCells.transition()
      .duration(1200)
      .style('fill', '#e04f2f')
      .attr('width', cellWidth * 0.1)
      .attr('height', cellHeight * 0.1)
      .attr('x', d => d.x * cellWidth + cellWidth * 0.45)
      .attr('y', d => d.y * cellHeight + cellHeight * 0.45)
      .remove();

    cells.enter()
      .append('rect')
      .attr('fill-opacity', 0.5)
      .attr('width', cellWidth * 0.1)
      .attr('height', cellHeight * 0.1)
      .attr('x', d => d.x * cellWidth + cellWidth * 0.45)
      .attr('y', d => d.y * cellHeight + cellHeight * 0.45)
      .attr('fill', '#5fce52')
      .on('click', d => {
        if (skeleton.data().lifeCycleStatus !== 'running') {
          dispatch.cellDeselect(d);
        }
      })
      .transition()
      .duration(500)
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', d => d.x * cellWidth)
      .attr('y', d => d.y * cellHeight)
      .attr('fill', '#1a85dd');
  }

  function drawBoard() {
    const rowHeight = skeleton.getInnerHeight() / options.numRows;
    const columnWidth = skeleton.getInnerWidth() / options.numColumns;

    layers.get('board')
      .selectAll('.row-separator')
      .data(d3.range(options.numRows-1))
      .enter()
      .append('g')
      .attr('class', 'row-separator')
      .attr('transform', d => 'translate(0, ' + (d+1) * rowHeight + ')')
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
      .attr('transform', d => 'translate(' + (d+1) * columnWidth + ', 0)')
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
      .attr('fill-opacity', 0)
      .on('click', d => {
        if (skeleton.data().lifeCycleStatus === 'running') return;
        const x = Math.floor((d3.event.offsetX - options.margin.left) / columnWidth);
        const y = Math.floor((d3.event.offsetY - options.margin.top) / rowHeight);
        dispatch.cellSelect({x, y});
      });
  }

  return skeleton.mixin({
    visualize
  });
});