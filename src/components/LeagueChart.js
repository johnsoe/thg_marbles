import { Line } from "react-chartjs-2";

const LeagueChart = (props) => {

  var labels = props.events.map(item => item.name);
  labels.unshift("Opening Ceremony");
  const userData = {
    labels: labels,
    datasets: props.userTeams.map(item => {
      return getChartData(item, getSummedUserTeamData(item));
    })
  };
  const mLData = {
    labels: labels,
    datasets: props.mLTeams.map(item => {
      return getChartData(item, getSummedMLTeamData(item));
    })
  };

  function getChartData(team, data) {
    return {
      label: team.name,
      data: data,
      fill: false,
      borderColor: teamToColor(team)
    }
  }

  function teamToColor(team) {
    if (team.color) {
      return team.color
    }
    var str = team.name +  team.name;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  function getSummedMLTeamData(team) {
    var pointsPerEvent = team.events
      .filter(item => item.name)
      .map(item => item.points);

    var result = [];
    pointsPerEvent.forEach((item, i) => {
      result[i] = parseInt(item) + (i - 1 >= 0 ? result[i - 1] : 0);
    });
    result.unshift(0);
    return result;
  }

  function getSummedUserTeamData(team) {
    var pointsPerEvent = team.results
      .filter(item => item.name)
      .map(item => item.primary + item.secondary);

    var result = [];
    pointsPerEvent.forEach((item, i) => {
      result[i] = parseInt(item) + (i - 1 >= 0 ? result[i - 1] : 0);
    });
    result.unshift(0);
    return result;
  }

  function getChartOptions(titleText) {
    return {
      scales: {
        y: {
          title: {
            display: true,
            text: "Total Points"
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: titleText
        }
      }
    }
  }

  return (
    <div>
      <Line data={userData} options={getChartOptions("Our Teams' Points")}/>
      <Line data={mLData} options={getChartOptions("Marble League Points")}/>
    </div>
  )
};

export default LeagueChart;
