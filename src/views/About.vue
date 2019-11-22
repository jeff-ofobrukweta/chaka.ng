<template>
  <div class="about">
    <h1>This is an about page</h1>
    <line-graph/>
    <Doughnut/>
    <MultiaxisBar/>
    <HorizontalBar/>
    <Verticalbarchart/>
  </div>
</template>


<script>
import LineGraph from '../components/Graphbasecard/Portfoliolinegraphbase';
import Doughnut from '../components/Doughnut/doughutPosition';
import MultiaxisBar from '../components/Multiaxisbarchart/multiaxisBarchart';
import HorizontalBar from '../components/Horizontalbarchart/horizontalbarchart';
import Verticalbarchart from '../components/Graphbasecard/verticalbarchartgraphbase';

export default {
  name: 'about',
  components: {
    LineGraph,
    Doughnut,
    MultiaxisBar,
    HorizontalBar,
    Verticalbarchart,
  },
};
</script>
