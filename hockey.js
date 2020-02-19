$.getJSON("https://statsapi.web.nhl.com/api/v1/people/8471735/stats?stats=careerRegularSeason", function(data){
    var totalGamesPlayedYandle = data.stats[0].splits[0].stat.games;

    $('.totalGamesPlayedYandle').append(totalGamesPlayedYandle);
});

$.getJSON("https://records.nhl.com/site/api/games-played-streak-skaters?sort=streak&dir=DESC", function(data){
    //let list = [];
    let recordList = data[0].firstName;
    $('.recordList').append(recordList);
});

