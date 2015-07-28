angular.module('app.infoController', [])
  .controller('InfoController', function($scope, AnimationService, d3Service) {

    // import color scheme 
    $scope.colors = AnimationService.colors;

    // draw an example wind vector
    d3Service.d3()
      .then(function (d3) {
        var windContainer = d3.select('.info-wind-container')
          .append('svg:svg')
          .attr('class', 'wind-container')
          .attr('id', 'example-wind');

        var path = windContainer.append('svg:path')
          .attr('class', 'wind-vector')
          .attr('d', 'M 10 10 L 35 35')
          .attr('stroke-dasharray', function(d) {
            $scope.l = d3.select(this).node().getTotalLength() / 2;
            return $scope.l + ' ' + $scope.l;
          })
          .each(animatePath);

        function animatePath() {
          var l = d3.select(this).node().getTotalLength();
          d3.select(this)
            .attr('stroke-dashoffset', l)
            .transition()
            .duration(2000)
            .ease('linear')
            .attr('stroke-dashoffset', 0)
            .each('end', animatePath);
        }
      })

  });