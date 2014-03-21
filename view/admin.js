module.exports= '<div class="shop-info clearfix">'+
'<div class="name"><h1>大众点评食堂</h1></div>'+
'<div class="info">'+
'<div class="pic">'+
'<img src="http://i3.dpfile.com/pc/229ce715b9d0eccb5d0abdef76e979ee/39014858_s.jpg">'+
'</div>'+
'<p class="rating"><span class="item-rank-rst irr-star45"></span></p>'+
'<p>人均:¥113</p>'+
'<div class="desc">'+
'<span>口味:8.7</span>'+
'<span>环境:8.4</span>'+
'<span>服务:8.5</span>'+
'</div>'+
'</div>'+
'</div>'+
''+
'<ul class="tables">'+
'<?js'+
''+
'it.tables.forEach(function(table){'+
'?><li class="table clearfix" data-table="@{table.name}">'+
'<div class="name">'+
'<span class="id">@{table.name.toUpperCase()}</span>'+
'<span class="unit"> 桌</span>'+
'</div>'+
'<div class="add J_add">'+
'<span></span>'+
'<span></span>'+
'</div>'+
'<ul class="info">'+
'<li><span class="desc">最多可容纳</span><span class="amount">4</span><span class="unit">人</span></li>'+
'<li><span class="desc">已排位到第</span><span class="amount">@{table.num}</span><span class="unit">号</span></li>'+
'<li><span class="desc">预计等位时间</span><span class="amount">@{table.time}</span><span class="unit">分钟</span></li>'+
'</ul>'+
'</li><?js'+
'});'+
''+
'?>'+
'</ul>';;