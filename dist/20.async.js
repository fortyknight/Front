(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"+h8G":function(e,a,t){"use strict";t.r(a);var r=t("d6i3"),n=t.n(r),s=t("p0pE"),u=t.n(s),p=t("V6UL"),c={flag:!1};a["default"]={namespace:"uploadFile",state:u()({},c),effects:{createTempDataset(e,a){return n.a.mark(function t(){var r,s,u,c,o,i;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,s=a.call,u=a.put,t.next=4,s(p["d"],r);case 4:if(c=t.sent,o=c.data,!o){t.next=12;break}return i={temporary_dataset_name:o.temporary_dataset_name,analyze_job_name:o.analyze_job_name},t.next=10,u({type:"save",payload:{params:i}});case 10:return t.next=12,u({type:"getRetrieveData",payload:i});case 12:case"end":return t.stop()}},t)})()},getTempDataPreview(e,a){return n.a.mark(function t(){var r,s,u,c,o,i,l;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,s=a.call,u=a.put,t.next=4,s(p["m"],r);case 4:return c=t.sent,o=c.data,i=[],l=[],o.headers.forEach(e=>{i.push({title:e,dataIndex:e})}),o.rows.forEach((e,a)=>{l[a]=l[a]||{},e.forEach((e,t)=>{l[a][o.headers[t]]=e})}),i[0].fixed="left",i[0].width=150,i[i.length-1].fixed="right",i[i.length-1].width=150,t.next=16,u({type:"save",payload:{columns:i,dataSource:l}});case 16:case"end":return t.stop()}},t)})()},getTempDateRetrieve(e,a){return n.a.mark(function t(){var r,s,u,c,o,i,l,d,m,y,h,f,v;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,s=a.call,u=a.put,t.next=4,s(p["n"],r);case 4:if(c=t.sent,o=c.data,!o){t.next=18;break}return i=o.feature_summary.continuous,l=o.feature_summary.categorical,d=o.feature_summary.datetime,m=o.feature_summary.text,y=o.features,h=o.n_rows,f=o.file_path,y.length&&y.forEach((e,a)=>{if(e.key=a,"continuous"===e.type)e.hData=[],e.extension.bins.map(a=>{e.hData.push({value:[a.begin,a.end],count:a.value})});else if("datetime"===e.type){var t=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];e.barHourData=[];var r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.barMonthData=[];var n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];e.barWeekData=[],e.barYearData=[],e.extension.by_hour.map((a,r)=>{e.barHourData.push({time:t[r],value:a})}),e.extension.by_month.map((a,t)=>{e.barMonthData.push({time:r[t],value:a})}),e.extension.by_week.map((a,t)=>{e.barWeekData.push({time:n[t],value:a})}),e.extension.by_year.map((a,t)=>{e.barYearData.push({time:String(a["year"]),value:a["value"]})})}}),v=o.name,t.next=18,u({type:"save",payload:{number:i,type:l,date:d,text:m,data:y,n_rows:h,datasetName:v,file_path:f}});case 18:case"end":return t.stop()}},t)})()},getRetrieveData(e,a){return n.a.mark(function t(){var r,s,u,c,o,i,l,d,m;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:r=e.payload,s=a.call,u=a.put,c=a.select,o=(e=>new Promise(a=>setTimeout(a,e)));case 3:return t.next=6,s(p["l"],r);case 6:return i=t.sent,l=i.data,t.next=10,s(o,1e3);case 10:return t.next=12,u({type:"save",payload:{pollJobResponse:i}});case 12:if(d=l.steps,3!==d.length||"succeed"!==d[2]["status"]){t.next=22;break}return t.next=16,c(e=>e.uploadFile.params);case 16:return m=t.sent,t.next=19,u({type:"getTempDataPreview",payload:{uriParams:m,params:{page_num:1,page_size:10}}});case 19:return t.next=21,u({type:"getTempDateRetrieve",payload:m});case 21:return t.abrupt("return");case 22:t.next=3;break;case 24:case"end":return t.stop()}},t)})()},updateData(e,a){return n.a.mark(function t(){var r,s,u,p,c,o,i;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,a.call,s=a.put,u=a.select,p=r.val,c=null,t.t0=JSON,t.t1=JSON,t.next=8,u(e=>e.uploadFile.data);case 8:return t.t2=t.sent,t.t3=t.t1.stringify.call(t.t1,t.t2),o=t.t0.parse.call(t.t0,t.t3),t.next=13,u(e=>e.uploadFile.params);case 13:if(i=t.sent,0!==p.length){t.next=17;break}return t.next=17,s({type:"getTempDateRetrieve",payload:i});case 17:return c=o.filter(e=>e.name.indexOf(p)>-1),t.next=20,s({type:"save",payload:{data:c}});case 20:case"end":return t.stop()}},t)})()}},reducers:{save(e,a){var t=a.payload;return u()({},e,t)},mergeState(e,a){var t=a.payload;return u()({},e,t)}}}}}]);