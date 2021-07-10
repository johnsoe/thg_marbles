const LeagueChart = (props) =>



  return (
    <canvas id='league_chart' className='pure-u-1-2'></canvas>
  )
}



function getChartConfig(data) {
  return {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  }
}

export default LeagueChart;
