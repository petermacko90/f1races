(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,a){e.exports=a(49)},30:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),i=a.n(o),c=(a(30),a(15)),s=a(7),l=a(8),u=a(9),m=a(11),d=a(10),f=a(12),g=a(6),v=a.n(g),E=a(13),h="https://ergast.com/api/f1",b=function(){var e=Object(E.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.next=5,a.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(E.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("".concat(h,"/").concat(t,".json"));case 2:if(0!==(a=e.sent).MRData.RaceTable.Races.length){e.next=5;break}throw new Error("No data available");case 5:return e.abrupt("return",a.MRData.RaceTable.Races);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(E.a)(v.a.mark(function e(t,a){var n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("".concat(h,"/").concat(t,"/").concat(a,"/results.json"));case 2:if(0!==(n=e.sent).MRData.RaceTable.Races.length){e.next=5;break}throw new Error("No data available");case 5:return e.abrupt("return",n.MRData.RaceTable.Races[0].Results);case 6:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),N=function(){var e=Object(E.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("".concat(h,"/").concat(t,"/driverStandings.json"));case 2:if(0!==(a=e.sent).MRData.StandingsTable.StandingsLists.length){e.next=5;break}throw new Error("No data available");case 5:return e.abrupt("return",a.MRData.StandingsTable.StandingsLists[0].DriverStandings);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(E.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("".concat(h,"/").concat(t,"/constructorStandings.json"));case 2:if(0!==(a=e.sent).MRData.StandingsTable.StandingsLists.length){e.next=5;break}throw new Error("No data available");case 5:return e.abrupt("return",a.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),C=a(21),w=a.n(C),L=(a(32),r.a.createContext("")),D=L.Provider,k=L.Consumer,y=1950,O=(new Date).getFullYear(),j=[{id:"ferrari",name:"Ferrari"},{id:"mercedes",name:"Mercedes"},{id:"redbull",name:"Red Bull"},{id:"renault",name:"Renault"},{id:"haas",name:"Haas"},{id:"racingpoint",name:"Racing Point"},{id:"tororosso",name:"Toro Rosso"},{id:"mclaren",name:"McLaren"},{id:"alfaromeo",name:"Alfa Romeo"},{id:"williams",name:"Williams"}],T={10:"10 Minutes",30:"30 Minutes",60:"1 Hour",120:"2 Hours",1440:"1 Day"},x=function(e){var t=e.setTheme;return r.a.createElement(k,null,function(e){return r.a.createElement("header",{className:"bg-"+e},r.a.createElement("div",{className:"flex"},r.a.createElement("h1",{className:"dib "+e},"F1 Races"),r.a.createElement("div",{className:"select-wrapper"},r.a.createElement("select",{value:e,onChange:t,className:"b-"+e,"aria-label":"Select theme"},j.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id,className:"bg-"+e.id},e.name)})))))})},W=(a(33),function(e){var t=e.setRoute,a=e.route,n=e.active,o=e.children;return r.a.createElement(k,null,function(e){return r.a.createElement("button",{onClick:t(a),className:"".concat(n?"active bg-"+e:""," h-").concat(e)},o)})}),F=function(e){var t=e.setRoute,a=e.route;return r.a.createElement("nav",null,r.a.createElement(W,{setRoute:t,route:"RaceList",active:"RaceList"===a},"Calendar"),r.a.createElement(W,{setRoute:t,route:"Standings",active:"Standings"===a},"Standings"),r.a.createElement(W,{setRoute:t,route:"SavedData",active:"SavedData"===a},"Saved Data"))},P=(a(34),a(3)),M=a(4),I=function(e,t){return t?new Date(e+"T"+t):new Date(e)},A=function(e){var t=e.round,a=e.country,n=e.locality,o=e.date,i=e.time,c=e.upcomingRace,s=e.onClickRace,l=e.onEnterRace,u="race unselectable";u+=Number(t)%2===1?" striped":"",u+=c?" upcoming":"";var m=I(o,i);return r.a.createElement("div",{className:u,onClick:s(t),onKeyPress:l(t),title:"Show details",tabIndex:"0"},r.a.createElement("span",{className:"round"},t,"."),r.a.createElement("span",{className:"location"},a,", ",n),r.a.createElement("span",{className:"date-time"},r.a.createElement("span",{className:"date"},m.toLocaleDateString()),r.a.createElement("span",{className:"time"},i&&m.toLocaleTimeString())),r.a.createElement("span",{className:"arrow"},r.a.createElement(P.a,{icon:M.c})))},B=function(){return r.a.createElement("div",{className:"p3"},r.a.createElement(P.a,{icon:M.f,spin:!0})," Loading...")},Y=function(e){var t=e.races,a=e.upcomingRace,n=e.isLoading,o=e.error,i=e.onClickRace,c=e.onEnterRace,s=e.onSaveRaces,l=e.seasonSelect;return r.a.createElement(k,null,function(e){return r.a.createElement("div",{className:"container"},l,t&&r.a.createElement("button",{onClick:s,className:"button ml3 mb3 bg-".concat(e," b-").concat(e)},r.a.createElement(P.a,{icon:M.e})," Save calendar"),n&&r.a.createElement(B,null),o&&r.a.createElement("p",{className:"p3"},o.message),t&&t.map(function(e){return r.a.createElement(A,{key:e.round,round:e.round,country:e.Circuit.Location.country,locality:e.Circuit.Location.locality,date:e.date,time:e.time,upcomingRace:Number(e.round)===Number(a),onClickRace:i,onEnterRace:c})}))})},J=function(e){var t=e.standings,a=e.isLoading,o=e.error;return r.a.createElement(n.Fragment,null,r.a.createElement("h2",{className:"p3"},"Driver Standings"),a&&r.a.createElement(B,null),o&&r.a.createElement("p",{className:"p3"},o.message),t&&r.a.createElement("div",{className:"responsive-table"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"tr",title:"Position"},"Pos."),r.a.createElement("th",null,"Driver"),r.a.createElement("th",null,"Constructor"),r.a.createElement("th",{className:"tr"},"Points"),r.a.createElement("th",{className:"tr"},"Wins"))),r.a.createElement("tbody",null,t.map(function(e){for(var t="",a=0,n=e.Constructors.length;a<n;a++)t+=e.Constructors[a].name,a+1!==n&&(t+=", ");return r.a.createElement("tr",{key:e.Driver.driverId},r.a.createElement("td",{className:"tr"},e.position,"."),r.a.createElement("td",null,e.Driver.givenName," ",e.Driver.familyName),r.a.createElement("td",null,t),r.a.createElement("td",{className:"tr"},e.points),r.a.createElement("td",{className:"tr"},e.wins))})))))},_=function(e){var t=e.standings,a=e.isLoading,o=e.error;return r.a.createElement(n.Fragment,null,r.a.createElement("h2",{className:"p3"},"Constructor Standings"),a&&r.a.createElement(B,null),o&&r.a.createElement("p",{className:"p3"},o.message),t&&r.a.createElement("div",{className:"responsive-table"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"tr",title:"Position"},"Pos."),r.a.createElement("th",null,"Constructor"),r.a.createElement("th",{className:"tr"},"Points"),r.a.createElement("th",{className:"tr"},"Wins"))),r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.Constructor.name},r.a.createElement("td",{className:"tr"},e.position,"."),r.a.createElement("td",null,e.Constructor.name),r.a.createElement("td",{className:"tr"},e.points),r.a.createElement("td",{className:"tr"},e.wins))})))))},U=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.season;this.props.driverStandings[e]||this.props.getDriverStandings(e),this.props.constructorStandings[e]||this.props.getConstructorStandings(e)}},{key:"render",value:function(){var e=this.props,t=e.season,a=e.driverStandings,n=e.isLoadingDrivers,o=e.errorDrivers,i=e.constructorStandings,c=e.isLoadingConstructors,s=e.errorConstructors;return r.a.createElement("div",{className:"container"},this.props.seasonSelect,r.a.createElement(J,{standings:a[t],isLoading:n,error:o}),r.a.createElement(_,{standings:i[t],isLoading:c,error:s}))}}]),t}(n.Component),H=(a(40),a(41),function(e){var t=e.results;return r.a.createElement("div",{className:"results responsive-table"},r.a.createElement("h2",null,"Results"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"tr",title:"Finish Position"},"Pos."),r.a.createElement("th",{className:"tr",title:"Grid Position"},"Grid"),r.a.createElement("th",null,"Driver"),r.a.createElement("th",null,"Constructor"),r.a.createElement("th",null,"Time"),r.a.createElement("th",{className:"tr"},"Laps"),r.a.createElement("th",null,"Status"),r.a.createElement("th",{className:"tr",title:"Points"},"Pts"),r.a.createElement("th",null,"Fastest Lap"),r.a.createElement("th",{title:"Average Speed"},"Avg Speed"))),r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.Driver.driverId+e.position},r.a.createElement("td",{className:"tr"},e.position,"."),r.a.createElement("td",{className:"tr"},"0"===e.grid?"Pit Lane":e.grid+"."),r.a.createElement("td",null,e.Driver.givenName," ",e.Driver.familyName),r.a.createElement("td",null,e.Constructor.name),r.a.createElement("td",null,e.Time?e.Time.time:"N/A"),r.a.createElement("td",{className:"tr"},e.laps),r.a.createElement("td",null,e.status),r.a.createElement("td",{className:"tr"},e.points),r.a.createElement("td",{className:e.FastestLap&&"1"===e.FastestLap.rank?"fastest":""},e.FastestLap?e.FastestLap.Time.time:"N/A"),r.a.createElement("td",null,e.FastestLap?"".concat(e.FastestLap.AverageSpeed.speed," ").concat(e.FastestLap.AverageSpeed.units):"N/A"))}))))}),G=a(24),$=function(e){for(var t=e.addNotification,a=e.raceName,n=e.dateTime,o=e.notificationWhen,i=e.setNotificationWhen,c=[],s=0,l=Object.entries(T);s<l.length;s++){var u=l[s],m=Object(G.a)(u,2),d=m[0],f=m[1];c.push(r.a.createElement("option",{key:d,value:d},f+" Before"))}return r.a.createElement(k,null,function(e){return r.a.createElement("div",null,r.a.createElement("button",{className:"button bg-".concat(e," b-").concat(e),onClick:t(a,n,o)},r.a.createElement(P.a,{icon:M.a})," Add notification"),r.a.createElement("select",{value:o,onChange:i,className:"b-"+e,"aria-label":"Select notification time"},c))})},q=function(e){var t=e.race,a=e.raceCount,o=e.results,i=e.isLoadingResults,c=e.resultsError,s=e.onClickRace,l=e.getRaceResults,u=e.addNotification,m=e.notificationWhen,d=e.setNotificationWhen,f=I(t.date,t.time),g=Number(t.round);return r.a.createElement(k,null,function(e){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"container p3"},r.a.createElement("div",{className:"prev-next mb3 mt3"},1!==g&&r.a.createElement("button",{className:"button button-left mr3 bg-".concat(e," b-").concat(e),onClick:s(g-1)},r.a.createElement(P.a,{icon:M.b})," Previous Race"),g!==a&&r.a.createElement("button",{className:"button button-right bg-".concat(e," b-").concat(e),onClick:s(g+1)},"Next Race ",r.a.createElement(P.a,{icon:M.c}))),r.a.createElement($,{addNotification:u,raceName:t.raceName,dateTime:f,notificationWhen:m,setNotificationWhen:d}),r.a.createElement("h2",null,"Race Details"),r.a.createElement("p",null,"Race: ",r.a.createElement("a",{href:t.url,className:"break-word",target:"_blank",rel:"noopener noreferrer"},t.raceName," ",r.a.createElement(P.a,{icon:M.d}))),r.a.createElement("p",null,"Season: ",t.season),r.a.createElement("p",null,"Round: ",g),r.a.createElement("p",null,"Location: ",t.Circuit.Location.country,", ",t.Circuit.Location.locality),r.a.createElement("p",null,"Circuit: ",r.a.createElement("a",{href:t.Circuit.url,className:"break-word",target:"_blank",rel:"noopener noreferrer"},t.Circuit.circuitName," ",r.a.createElement(P.a,{icon:M.d}))),r.a.createElement("p",null,"Date and time: ",f.toLocaleDateString()," ",t.time&&f.toLocaleTimeString()),!o&&r.a.createElement("button",{onClick:l(t.season,g),className:"button bg-".concat(e," b-").concat(e),disabled:i},i?r.a.createElement(n.Fragment,null,r.a.createElement(P.a,{icon:M.f,spin:!0})," ","Loading..."):r.a.createElement(n.Fragment,null,"Load Results")),c&&r.a.createElement("p",null,c.message)),o&&r.a.createElement(H,{results:o}))})},K=function(e){var t=e.notifications,a=e.deleteNotification,o=t.slice().sort(function(e,t){return e.notificationDate-t.notificationDate});return r.a.createElement(n.Fragment,null,r.a.createElement("h2",{className:"ml3 mr3"},"Saved Notifications"),0===t.length?r.a.createElement("p",{className:"p3"},"No saved notifications"):r.a.createElement("div",{className:"responsive-table"},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Notified"),r.a.createElement("th",null,"Race Date"),r.a.createElement("th",null,"Notification Date"))),r.a.createElement("tbody",null,o.map(function(e){var t=e.id,n=e.title,o=e.notified,i=e.raceDate,c=e.notificationDate;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return a(t)},className:"button bg-ferrari b-ferrari",title:"Delete Notification"},r.a.createElement(P.a,{icon:M.g}))),r.a.createElement("td",null,n),r.a.createElement("td",null,o?"Yes":"No"),r.a.createElement("td",null,i.toLocaleDateString()," ",i.toLocaleTimeString()),r.a.createElement("td",null,c.toLocaleDateString()," ",c.toLocaleTimeString()))})))))},V=(a(42),function(e,t){try{var a=JSON.stringify(e);localStorage.setItem("calendar_"+t,a)}catch(n){return n}}),z=function(e){try{var t=localStorage.getItem("calendar_"+e);if(null===t)return;return JSON.parse(t)}catch(a){return}},Q=function(e){try{var t=JSON.stringify(e);localStorage.setItem("notifications",t)}catch(a){return a}},X=function(e){try{localStorage.setItem("theme",e)}catch(t){return}},Z=function(){try{for(var e=localStorage.getItem("theme"),t=0,a=j.length;t<a;t++)if(j[t].id===e)return e;return"ferrari"}catch(n){return"ferrari"}},ee=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(m.a)(this,Object(d.a)(t).call(this))).deleteCalendar=function(t){return function(){var a=e.state.calendars.filter(function(e){return e!==t});e.setState({calendars:a}),localStorage.removeItem(t)}},e.state={calendars:[]},e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=function(){try{for(var e=[],t=0,a=localStorage.length;t<a;t++)/^calendar_\d{4}$/.test(localStorage.key(t))&&e.push(localStorage.key(t));return e}catch(n){return[]}}();this.setState({calendars:e})}},{key:"render",value:function(){var e=this,t=this.state.calendars.slice().sort(function(e,t){return e.slice(-4)-t.slice(-4)});return r.a.createElement(n.Fragment,null,r.a.createElement("h2",{className:"ml3 mr3"},"Saved Calendars"),0===this.state.calendars.length?r.a.createElement("p",{className:"p3"},"No saved calendars"):r.a.createElement("ul",{className:"ml3 mr3"},t.map(function(t){return r.a.createElement("li",{key:t},r.a.createElement("button",{className:"button bg-ferrari b-ferrari mr3 mb3",title:"Delete Calendar",onClick:e.deleteCalendar(t)},r.a.createElement(P.a,{icon:M.g})),r.a.createElement("span",null,t.slice(-4)))})))}}]),t}(n.Component),te=function(e){var t=e.savedNotifications;return r.a.createElement("div",{className:"container"},t,r.a.createElement(ee,null))},ae=(a(43),function(e){for(var t=e.season,a=e.onSelectSeason,n=e.onChangeSeason,o=[],i=y;i<=O;i++)o.push(r.a.createElement("option",{key:i,value:i},"Season ",i));return r.a.createElement(k,null,function(e){return r.a.createElement("div",{className:"season ml3 mb3"},t!==y&&r.a.createElement("button",{onClick:n(-1),title:"Previous season",className:"button bg-".concat(e," b-").concat(e)},r.a.createElement(P.a,{icon:M.b})),r.a.createElement("select",{value:t,onChange:a,className:"b-"+e,"aria-label":"Select season"},o),t!==O&&r.a.createElement("button",{onClick:n(1),title:"Next season",className:"button bg-".concat(e," b-").concat(e)},r.a.createElement(P.a,{icon:M.c})))})}),ne=function(){return r.a.createElement("footer",{className:"mt3"},r.a.createElement("hr",null),r.a.createElement("div",{className:"p3 tc"},"Icons made by ",r.a.createElement("a",{href:"https://www.freepik.com/",title:"Freepik"},"Freepik")," from ",r.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")," is licensed by ",r.a.createElement("a",{href:"http://creativecommons.org/licenses/by/3.0/",title:"Creative Commons BY 3.0",target:"_blank",rel:"noopener noreferrer"},"CC 3.0 BY")))},re=a(5),oe=(a(44),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(m.a)(this,Object(d.a)(t).call(this))).setTheme=function(t){e.setState({theme:t.target.value}),X(t.target.value)},e.checkNotifications=function(){var t=e.state.notifications,a=Math.floor((new Date).getTime()/1e3/60);t.forEach(function(t){var n=t.notificationDate,r=t.raceDate,o=t.title,i=t.body,c=Math.floor(n.getTime()/1e3/60),s=function(a,n){new Notification(a,{body:n}),t.notified=!0,e.deleteNotification(t.id)};c!==a||t.notified?c<a&&!t.notified?s("Missed notification: "+o,"Notification time: ".concat(n.toLocaleDateString()," ").concat(n.toLocaleTimeString(),"\nRace time: ").concat(r.toLocaleDateString()," ").concat(r.toLocaleTimeString())):t.notified&&e.deleteNotification(t.id):s(o,i)})},e.getRaces=function(t){var a=z(t);if(a){var n=Object(s.a)({},t,a);e.setState(function(e){return{races:Object(c.a)({},e.races,n)}})}else{if(!navigator.onLine)return re.b.error("You are offline :("),void e.setState({error:new Error("No data available")});e.setState({isLoading:!0}),p(t).then(function(a){var n=Object(s.a)({},t,a);e.setState(function(e){return{races:Object(c.a)({},e.races,n)}}),t===O&&V(a,t)}).catch(function(t){return e.setState({error:t})}).finally(function(){return e.setState({isLoading:!1})})}},e.getRaceResults=function(t,a){return function(){navigator.onLine?(e.setState({isLoadingResults:!0}),S(t,a).then(function(n){var r=Object(s.a)({},t,Object(s.a)({},a,n));e.setState(function(e){return{results:w()(e.results,r),resultsError:null}})}).catch(function(t){return e.setState({resultsError:t})}).finally(function(){return e.setState({isLoadingResults:!1})})):re.b.error("You are offline :(")}},e.getDriverStandings=function(t){navigator.onLine?(e.setState({isLoadingDrivers:!0}),N(t).then(function(a){e.setState(function(e){var n=Object(s.a)({},t,a);return{driverStandings:Object(c.a)({},e.driverStandings,n)}})}).catch(function(t){return e.setState({errorDrivers:t})}).finally(function(){return e.setState({isLoadingDrivers:!1})})):re.b.error("You are offline :(")},e.getConstructorStandings=function(t){navigator.onLine&&(e.setState({isLoadingConstructors:!0}),R(t).then(function(a){e.setState(function(e){var n=Object(s.a)({},t,a);return{constructorStandings:Object(c.a)({},e.constructorStandings,n)}})}).catch(function(t){return e.setState({errorConstructors:t})}).finally(function(){return e.setState({isLoadingConstructors:!1})}))},e.onClickRace=function(t){return function(){e.selectRace(t)}},e.onEnterRace=function(t){return function(a){"Enter"===a.key&&e.selectRace(t)}},e.selectRace=function(t){e.setState({selectedRaceRound:Number(t),route:"RaceDetails",resultsError:null})},e.onSelectSeason=function(t){e.setSeason(Number(t.target.value))},e.onChangeSeason=function(t){return function(){var a=Number(e.state.season)+t;a>=y&&a<=O&&e.setSeason(a)}},e.setSeason=function(t){var a=e.state,n=a.route,r=a.races,o=a.driverStandings;e.setState({season:t,error:null}),r[t]||"RaceList"!==n||e.getRaces(t),o[t]||"Standings"!==n||(e.getDriverStandings(t),e.getConstructorStandings(t))},e.onSaveRaces=function(){V(e.state.races[e.state.season],e.state.season)?re.b.error("Error - calendar was not saved :("):re.b.success("Calendar saved to browser storage")},e.addNotification=function(t,a,n){return function(){if("Notification"in window)if(a<new Date)re.b.error("This race already started or is over");else{var r=new Date(a);r.setMinutes(r.getMinutes()-(Number(n)?n:60));for(var o=r.getTime(),i=0,c=e.state.notifications.length;i<c;i++)if(e.state.notifications[i].id===o)return void re.b.error("Notification already exists");var s=function(){var i="Race Starts in ";i+=T[n]?T[n]:T[60];var c={id:o,raceDate:a,notificationDate:r,notified:!1,title:t,body:i};Q(e.state.notifications.concat(c))?re.b.error("Error - notification was not saved :("):(re.b.success("Notification saved to browser storage"),e.setState(function(e){return{notifications:e.notifications.concat(c)}},function(){return e.checkNotifications()}))};"granted"===Notification.permission?s():"denied"!==Notification.permission&&Notification.requestPermission().then(function(e){"granted"===e&&s()})}else re.b.error("This browser does not support notifications :(")}},e.deleteNotification=function(t){var a=e.state.notifications.filter(function(e){return e.id!==t});Q(a)?re.b.error("Error - Unable to delete notification :("):e.setState({notifications:a})},e.setNotificationWhen=function(t){e.setState({notificationWhen:t.target.value})},e.setRoute=function(t){return function(){e.setState({route:t}),"RaceList"!==t&&"Standings"!==t||e.setState({season:O}),"RaceList"===t&&e.setState({error:null})}},e.state={races:{},isLoading:!1,error:null,season:O,selectedRaceRound:0,results:{},isLoadingResults:!1,resultsError:null,notifications:[],notificationWhen:"60",route:"RaceList",theme:"",driverStandings:{},isLoadingDrivers:!1,errorDrivers:null,constructorStandings:{},isLoadingConstructors:!1,errorConstructors:null},e}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getRaces(this.state.season);var t=function(){try{var e=localStorage.getItem("notifications");if(null===e)return;return JSON.parse(e,function(e,t){return"notificationDate"===e||"raceDate"===e?new Date(t):t})}catch(t){return}}();t&&this.setState({notifications:t},function(){return e.checkNotifications()}),this.setState({theme:Z()}),this.interval=setInterval(this.checkNotifications,6e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state,t=e.races,a=e.isLoading,n=e.error,o=e.season,i=e.notifications,c=e.selectedRaceRound,s=e.route,l=e.results,u=e.isLoadingResults,m=e.resultsError,d=e.notificationWhen,f=e.theme,g=e.driverStandings,v=e.isLoadingDrivers,E=e.errorDrivers,h=e.constructorStandings,b=e.isLoadingConstructors,p=e.errorConstructors,S=t[o],N=null;if(c>0&&t[o]){var R=t[o].findIndex(function(e){return Number(e.round)===c});N=t[o][R]}var C,w="";if(S&&o===O)for(var L=0,k=S.length,y=new Date;L<k;L++)if(y<I(S[L].date,S[L].time)){w=S[L].round;break}N&&l[N.season]&&(C=l[N.season][N.round]);var j=r.a.createElement(ae,{season:o,onSelectSeason:this.onSelectSeason,onChangeSeason:this.onChangeSeason}),T=r.a.createElement(K,{notifications:i,deleteNotification:this.deleteNotification});return r.a.createElement(D,{value:f},r.a.createElement(x,{setTheme:this.setTheme}),r.a.createElement(F,{setRoute:this.setRoute,route:s}),r.a.createElement(re.a,{position:"bottom-center",autoClose:5e3,hideProgressBar:!0,newestOnTop:!1,closeOnClick:!1,rtl:!1,pauseOnVisibilityChange:!0,draggable:!1,pauseOnHover:!0}),"SavedData"===s&&r.a.createElement(te,{savedNotifications:T}),"RaceDetails"===s&&r.a.createElement(q,{race:N,raceCount:S.length,results:C,isLoadingResults:u,resultsError:m,onClickRace:this.onClickRace,getRaceResults:this.getRaceResults,addNotification:this.addNotification,notificationWhen:d,setNotificationWhen:this.setNotificationWhen}),"RaceList"===s&&r.a.createElement(Y,{races:S,upcomingRace:w,isLoading:a,error:n,onClickRace:this.onClickRace,onEnterRace:this.onEnterRace,onSaveRaces:this.onSaveRaces,seasonSelect:j}),"Standings"===s&&r.a.createElement(U,{season:o,driverStandings:g,isLoadingDrivers:v,errorDrivers:E,getDriverStandings:this.getDriverStandings,constructorStandings:h,isLoadingConstructors:b,errorConstructors:p,getConstructorStandings:this.getConstructorStandings,seasonSelect:j}),r.a.createElement(ne,null))}}]),t}(n.Component)),ie=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ce(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(oe,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/f1races",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/f1races","/service-worker.js");ie?(function(e,t){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ce(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):ce(t,e)})}}()}},[[25,1,2]]]);
//# sourceMappingURL=main.c32fbb8f.chunk.js.map