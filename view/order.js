module.exports= '<div>'+
'<h2>@{it.shop.name}</h2>'+
'</div>'+
'<ul>'+
'<?js'+
''+
'it.tables.forEach(function(table){'+
'?><li>'+
'<span>@{table.name}</span>'+
'<span class="unit">桌</span>'+
'<span class="num">@{table.num}</span>'+
'<span class="left">剩余 @{table.time_left} 分钟</span>'+
'</li><?js'+
'});'+
''+
'?>'+
'</ul>';;