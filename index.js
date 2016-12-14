const term = require('terminal-kit').terminal
const colors = require('colors')
const clear = require('clear')
const meow = require('meow')
const http = require('http')
const moment = require('moment')
const api = '97A32D1EB7E74B9B807C7FA62744A6A1'
var document = term.createDocument()
term.windowTitle('Azteca - P41N3ST/Dotap')
// -> cli | usage
const cli = meow(`
  P41N3ST/Dota Version: 1.0.0

    Usage
      DotaP <steamid>
      Output:

        Steam info                                   Dota info
          ` + '~'.yellow +` Nickname                                   ` + '~'.yellow +` MatchHistory
          ` + '~'.yellow +` LastTime                                   ` + '~'.yellow +` MatchId. Hero, win/lose & Time
          ` + '~'.yellow +` State
          ` + '~'.yellow +` Country
          ` + '~'.yellow +` Playing
          ` + '~'.yellow +` PlayingServerIP
`)
var methods = [
  'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + api + '&vanityurl=' + cli.input[0],
  ''
]
if(cli.input[0] == null) {
  console.error('\n  Especifica nombre de usuario'.red)
  process.exit(1)
} else {
  // -> request
  http.get(methods[0], function(res){
    bodyId = ''
    res.on('data', function(chunk){
      bodyId += chunk
    })
    res.on('end', function(){
      getSteamId = JSON.parse(bodyId)
      vanityId = getSteamId.response.steamid
      http.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + api + '&steamids=' + vanityId, function(res) {
        bodySummary = ''
        res.on('data', function(chunk){
          bodySummary += chunk
        })
        res.on('end', function(){
          getSummary = JSON.parse(bodySummary)
          summaries = [
            getSummary.response.players[0].steamid,
            getSummary.response.players[0].lastlogoff,
            getSummary.response.players[0].personaname,
            getSummary.response.players[0].profileurl,
            getSummary.response.players[0].realname,
            getSummary.response.players[0].loccountrycode,
            getSummary.response.players[0].gameid,
            getSummary.response.players[0].gameextrainfo,
            getSummary.response.players[0].gameserverip
          ]
          if(summaries[5] = 'undefined'){
            summaries[5] = 'Empty'.red
            if(summaries[6] = 'undefined'){
              summaries[6] = 'Empty'.red
              if(summaries[7] = 'undefined'){
                summaries[7] = 'Empty'.red
              }
            }
          }

          http.get('http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=' + api + '&account_id=' + summaries[0], function(res){
            bodyHistoryIds = ''
            res.on('data', function(chunk){
              bodyHistoryIds += chunk
            })
            res.on('end', function(){
              getMatchIds = JSON.parse(bodyHistoryIds)
              matchIds = [
                getMatchIds.result.matches[0].match_id,
                getMatchIds.result.matches[1].match_id,
                getMatchIds.result.matches[2].match_id,
                getMatchIds.result.matches[3].match_id,
                getMatchIds.result.matches[4].match_id,
              ]
              steam32id = summaries[0] - 76561197960265728
              matchMethods = [
                'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + api + '&match_id=' + matchIds[0],
                'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + api + '&match_id=' + matchIds[1],
                'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + api + '&match_id=' + matchIds[2],
                'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + api + '&match_id=' + matchIds[3],
                'http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1?key=' + api + '&match_id=' + matchIds[4]
              ]
              http.get(matchMethods[0], function(res){
                bodyWin = ''
                res.on('data', function(chunk){
                  bodyWin += chunk
                  res.on('end', function(){
                    getInfo = JSON.parse(bodyWin)
                    win = getInfo.result.radiant_win
                    dur = getInfo.result.duration
                    if(getInfo.result.players[0].account_id == steam32id){
                      global.slotcli = getInfo.result.players[0].account_id
                      global.slotno = getInfo.result.players[0].player_slot
                      global.heroid = getInfo.result.players[0].hero_id
                    }else if(getInfo.result.players[1].account_id = steam32id){
                      global.slotcli = getInfo.result.players[1].account_id
                      global.slotno = getInfo.result.players[1].player_slot
                      global.heroid = getInfo.result.players[1].hero_id
                    }else if(getInfo.result.players[2].account_id = steam32id){
                      global.slotcli = getInfo.result.players[2].account_id
                      global.slotno = getInfo.result.players[2].player_slot
                      global.heroid = getInfo.result.players[2].hero_id
                    }else if(getInfo.result.players[3].account_id = steam32id){
                      global.slotcli = getInfo.result.players[3].account_id
                      global.slotno = getInfo.result.players[3].player_slot
                      global.heroid = getInfo.result.players[3].hero_id
                    }else if(getInfo.result.players[4].account_id = steam32id){
                      global.slotcli = getInfo.result.players[4].account_id
                      global.slotno = getInfo.result.players[4].player_slot
                      global.heroid = getInfo.result.players[4].hero_id
                    }else if(getInfo.result.players[5].account_id = steam32id){
                      global.slotcli = getInfo.result.players[5].account_id
                      global.slotno = getInfo.result.players[5].player_slot
                      global.heroid = getInfo.result.players[5].hero_id
                    }else if(getInfo.result.players[6].account_id = steam32id){
                      global.slotcli = getInfo.result.players[6].account_id
                      global.slotno = getInfo.result.players[6].player_slot
                      global.heroid = getInfo.result.players[6].hero_id
                    }else if(getInfo.result.players[7].account_id = steam32id){
                      global.slotcli = getInfo.result.players[7].account_id
                      global.slotno = getInfo.result.players[7].player_slot
                      global.heroid = getInfo.result.players[7].hero_id
                    }else if(getInfo.result.players[8].account_id = steam32id){
                      global.slotcli = getInfo.result.players[8].account_id
                      global.slotno = getInfo.result.players[8].player_slot
                      global.heroid = getInfo.result.players[8].hero_id
                    }else if(getInfo.result.players[9].account_id = steam32id){
                      global.slotcli = getInfo.result.players[9].account_id
                      global.slotno = getInfo.result.players[9].player_slot
                      global.heroid = getInfo.result.players[9].hero_id
                    }
                    t = new Date(1480287512)
                    f = moment(1480287512).unix()
                    console.log('\n P41N3ST/DotaP version 1.0.0')
                    console.log('\n  ' + cli.input[0].toUpperCase().cyan)
                    console.log('\n     ~ '.yellow + cli.input[0] + '/'.yellow + summaries[0] + '/'.yellow + steam32id + '              ' + 'a')
                    console.log('     ~ '.yellow + f)
                    console.log('     ~ '.yellow + summaries[2])
                    console.log('     ~ '.yellow + summaries[3])
                    console.log('     ~ '.yellow + summaries[4])
                    console.log('     ~ '.yellow + summaries[5])
                    console.log('     ~ '.yellow + summaries[6])
                    console.log('     ~ '.yellow + summaries[7])
                  })
                })
              })
            })
          })
          term.on('key', function(key){
          	switch(key)
          	{
          		case 'CTRL_C' :
          			term.grabInput(false)
          			term.hideCursor(false)
          			term.styleReset()
          			term.clear()
          			process.exit()
          			break
          	}
          })
        })
      })
    })
  })
}
