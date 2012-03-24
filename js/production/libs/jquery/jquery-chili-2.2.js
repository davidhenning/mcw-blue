/*!
 * Chili - the jQuery plugin for highlighting code
 * http://noteslog.com/chili/
 * 
 * Copyright 2010 Andrea Ercolino
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 * 
 * VERSION: NEXT - 20120318 2247
 */(function($){function getRecipePath(a){var b=$.chili.dynamic.origin+"jquery.chili.recipes."+a+".js";return b}function getRecipeName(a){var b=a.match(/\bjquery\.chili\.recipes\.([\w-]+)\.js$/i),c=b[1];return c}function askDish(a){var b=$.chili.codeLanguage(a);if(""==b)return;var c=getRecipePath(b);$.chili.dynamic.active&&!$.chili.recipes[b]?($.chili.queue[c]||downloadRecipe(c,makeDish,[c]),$.chili.queue[c].push(a)):($(a).trigger("chili.before_coloring",[b]),makeDish.apply(a,[c]),$(a).trigger("chili.after_coloring",[b]))}function makeDish(a){var b=getRecipeName(a),c=$.chili.recipes[b];if(!c)return;var d=$(this).text();if(!d)return;d=fixWhiteSpaceAfterReading(d),replaceElement.apply({selector:this,subject:d,module:b,context:{}}),fixTextSelection(this),checkLineNumbers(this)}function replaceElement(){filtersPrepare(this);var a=applyModule(this.subject,this.module,this.context);a=filtersProcess(this,a),a=fixWhiteSpaceBeforeWriting(a);var b=$(this.selector)[0];b.innerHTML=a}function requestedAction(a,b,c){return""!=c?"applyStep":""!=b?"applyBlock":""!=a?"applyRecipe":""}function detectAction(a,b){if(!a)return;var c=new RegExp("^(?!(?:/$|.+/$|.+//$|.+//.))([^/]*)(?:/([^/]*)(?:/([^/]+))?)?$"),d=(a||"").match(c);if(!d)return;var e=d[1]||"",f=d[2]||"",g=d[3]||"",h=requestedAction(e,f,g),i=getRecipe(e,b),j={action:h,recipeName:e,blockName:f,stepName:g,recipe:i,module:a,context:b};return j}function getRecipe(a,b){var c=null;return""==a?c=b.recipe:c=$.chili.recipes[a],c}function downloadRecipe(a,b,c){$.chili.queue[a]=[],$.getScript(a,function(d){var e=getRecipeName(a),f=$.chili.queue[a];for(var g=0,h=f.length;g<h;g++){var i=f[g];"undefined"!=typeof i.selector&&(i=$(i.selector)[0]),$(i).trigger("chili.before_coloring",[e]),b.apply(f[g],c),$(i).trigger("chili.after_coloring",[e])}})}function applyRecipe(a,b){var c=b.recipe;return result=cook(a,c),result}function applyBlock(a,b){var c=b.blockName,d=b.recipe;return c in d?result=cook(a,d,c):result=escapeHtmlSpecialChars(a),result}function applyStep(a,b){var c=b.recipeName,d=b.blockName,e=b.stepName,f=b.recipe,g=b.context;return""==d&&(d=g.blockName),d in f&&e in f[d]?result=cook(a,f,d,e):result=escapeHtmlSpecialChars(a),result}function applyAction(a,b){var c="",d=b.action;switch(d){case"applyRecipe":c=applyRecipe(a,b);break;case"applyBlock":c=applyBlock(a,b);break;case"applyStep":c=applyStep(a,b);break;default:}return c}function applyDeferred(a,b){var c=getRecipePath(b.recipeName);$.chili.queue[c]||downloadRecipe(c,replaceElement);var d="chili_"+unique();return $.chili.queue[c].push({selector:"#"+d,subject:a,module:b.module,context:b.context}),result='<span id="'+d+'">'+result+"</span>",result}function applyModule(a,b,c){var d="",e=detectAction(b,c);return typeof e=="undefined"?d=escapeHtmlSpecialChars(a):e.recipe?d=applyAction(a,e):$.chili.dynamic.active?d=applyDeferred(a,e):d=escapeHtmlSpecialChars(a),d}function unique(a){var b=(new Date).valueOf();while(a&&a.indexOf(b)>-1);return b=(new Date).valueOf(),b}function prepareBlock(a,b){var c=[],d=a[b];for(var e in d){var f=prepareStep(a,b,e);c.push(f)}return c}function numberOfSubmatches(a){var b=a.replace(/\\./g,"%").replace(/\[.*?\]/g,"%").match(/\((?!\?)/g),c=(b||[]).length;return c}function prepareStep(a,b,c){var d=a[b][c],e=typeof d._match=="string"?d._match:d._match.source,f=d._replace?d._replace:'<span class="$0">$$</span>',g={recipe:a,blockName:b,stepName:c,exp:"("+e+")",length:numberOfSubmatches(e)+1,replacement:f};return g}function adjustBackReferences(a){var b=1,c=[];for(var d=0,e=a.length;d<e;d++){var f=a[d].exp;f=f.replace(/\\\\|\\(\d+)/g,function(a,c){return c?"\\"+(b+1+parseInt(c,10)):a}),c.push(f),b+=a[d].length}return c}function knowHow(a,b){var c="((?:\\s|\\S)*?)",d="((?:\\s|\\S)+)",e=adjustBackReferences(a),f="(?:"+e.join("|")+")";return f=c+f+"|"+d,new RegExp(f,b)}function addPrefix(a,b){var c=/(<span\s+class\s*=\s*(["']))((?:(?!__)\w)+\2\s*>)/ig,d="$1"+a+"__$3",e=b.replace(c,d);return e}function locateStepMatches(a,b){var c=2;for(var d=0,e=a.length;d<e;d++){var f=a[d],g=b[c];if(g)break;c+=f.length}var h=b.slice(c,c+f.length);return h.push(b.index),h.push(b.input),{step:f,matches:h}}function functionReplacement(a){var b={x:function(b,c){var d=applyModule(b,c,a.step);return d}},c=a.step.replacement.apply(b,a.matches);return c}function templateReplacement(a){var b=/(\\\$)|(?:\$\$)|(?:\$(\d+))/g,c=function(b,c,d){var e="";return c?e="$":d?d=="0"?e=a.step.stepName:e=escapeHtmlSpecialChars(a.matches[d]):e=escapeHtmlSpecialChars(a.matches[0]),e},d=a.step.replacement.replace(b,c);return d}function chef(a,b){var c="",d=b[0];if(!d)return c;var e=b[b.length-1];if(e)return c=escapeHtmlSpecialChars(e),c;var f=locateStepMatches(a,b);c=$.isFunction(f.step.replacement)?functionReplacement(f):templateReplacement(f);var g=b[1];return g=escapeHtmlSpecialChars(g),c=addPrefix(f.step.recipe._name,c),c=g+c,c}function applySteps(a,b,c){var d=b._case?"g":"gi",e=knowHow(c,d),f=[],g;while((g=e.exec(a))!=null&&g[0]!=""){var h=chef(c,g);f.push(h)}return f=f.join(""),f}function cook(a,b,c,d){if(d)var e=prepareStep(b,c,d),f=[e];else{c||(c="_main",checkSpices(b));if(!c in b)return escapeHtmlSpecialChars(a);var f=prepareBlock(b,c)}var g=applySteps(a,b,f);return g}function cssClassDefinition(a,b){var c="."+a+"\n"+"{\n"+"\t"+b+"\n"+"}\n";return c}function makeStylesheet(a){var b=a._name,c=["/* Chili -- "+b+" */"];for(var d in a){if(d.search(/^_(?!main\b)/)>=0)continue;var e=a[d];for(var f in e){var g=e[f];if(!1 in g)continue;var h=g._style;if(typeof h=="string"){var i={};i[f]=h,h=i}for(var j in h){var k=b+"__"+j,l=h[j],m=cssClassDefinition(k,l);c.push(m)}}}var n=c.join("\n");return n}function checkSpices(a){var b=a._name;if(!$.chili.queue[b]){var c=makeStylesheet(a);$.chili.loadStylesheetInline(c),$.chili.queue[b]=!0}}function repeat(a,b){var c="";for(var d=0;d<b;d++)c+=a;return c}function escapeHtmlSpecialChars(a){var b=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return b}function unescapeHtmlSpecialChars(a){var b=a.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");return b}function scan(a,b,c){c=c||[];var d=/([\w\W]*?)(?:(<\w+[^>]*\/>)|(<\w+[^>]*>)|(<\/\w+[^>]*>))|([\w\W]+)/ig,e=function(a,d,e,g,h,i){var j=f.index,k;i?(k=tokenMake("text",i,j),b.apply(k,c)):(k=tokenMake("text",d,j),b.apply(k,c),j+=d.length,e?k=tokenMake("empty",e,j):g?k=tokenMake("open",g,j):h&&(k=tokenMake("close",h,j)),b.apply(k,c))},f;while((f=d.exec(a))!=null&&f[0]!="")e.apply({},f)}function escapeSpaces(a){var b=$.chili.whiteSpace.writingSpace,c=a.replace(/ /g,b);return c}function escapeTabs(a){var b=$.chili.whiteSpace.writingTab,c=a.replace(/\t/g,b);return c}function lineFeedsToNewLines(a){var b=$.chili.whiteSpace.writingNewLine,c=a.replace(/\n/g,b);return c}function newLinesToLineFeeds(a){var b=a;return b=b.replace(/&nbsp;<BR>/ig,"\n"),b=b.replace(/\r\n?/g,"\n"),b}function setWhiteSpaceConstants(a){$.chili.whiteSpace.writingSpace="&#160;",$.chili.whiteSpace.writingTab=repeat("&#160;",$.chili.whiteSpace.tabWidth),$.chili.whiteSpace.writingNewLine="\n",/\r\n?/.test(a)&&($.browser.msie?$.chili.whiteSpace.writingNewLine="&#160;<br>":$.chili.whiteSpace.writingNewLine=/\r\n/.test(a)?"\r\n":"\r")}function fixWhiteSpaceAfterReading(a){setWhiteSpaceConstants(a);var b=newLinesToLineFeeds(a);return $.chili.whiteSpace.no1stLine&&(b=b.replace(/^\n/,"")),b}function fixWhiteSpaceBeforeWriting(a){var b=[];return scan(a,function(){var a=this.value;this.type=="text"&&(a=escapeSpaces(a),a=escapeTabs(a),a=lineFeedsToNewLines(a)),b.push(a)}),b=b.join(""),b}function well_form(a,b){var c=[],d=b.join("");scan(a,function(){this.type=="open"?b.push(this.value):this.type=="close"&&b.pop()});for(var e=0,f=b.length;e<f;e++){var g=b[e],h=g.replace(/^<(\w+)[^>]*>$/,"</$1>");c.unshift(h)}var i=c.join("");return a=d+a+i,{line:a,open:b}}function makeOrderedList(a){var b=[],c=/(.*)\n/g,d=function(a,c){var d=well_form(c,b);return b=d.open,c=d.line?"<li>"+d.line+"</li>":"<li> </li>",c},e=a.replace(c,d);return e="<ol>"+e+"</ol>",e}function setLineNumbersStart(a,b,c){var d=parseInt(b,10);if(c){var e=$("."+a),f=e.index(this);e.slice(0,f).each(function(){d+=$(this).find("li").length})}$(this).find("ol").attr("start",d),$("body").width($("body").width()-1).width($("body").width()+1)}function addLineNumbers(a){var b=$(a).html();b=fixWhiteSpaceAfterReading(b),b=makeOrderedList(b),b=fixWhiteSpaceBeforeWriting(b),a.innerHTML=b}function checkLineNumbers(a){var b=$.chili.codeLineNumbers(a);b?(addLineNumbers(a),setLineNumbersStart.apply(a,b)):$.chili.decoration.lineNumbers&&addLineNumbers(a)}function filtersPrepare(that){var subject=that.subject;if(!/{:\w+\(/.test(subject))return;var format=0,expr=/({:(\w+)\((|(?:(['"])[^\4\n]*(?:\\.[^\4\n]*)*\4)(?:\s*,\s*((['"])[^\6\n]*(?:\\.[^\6\n]*)*\6))*)\)\[)((?:.|\n)*?)(\]\2:})/g,func=function(all,tag_open,callback,args,ignore4,ignore5,ignore6,target,tag_close,offset){eval("args = ["+args+"];");var filter={original:target,start:offset-format,count:target.length,callback:callback,args:args};return format+=tag_open.length+tag_close.length,$.isArray(that.filters)?that.filters.push(filter):that.filters=[filter],target};subject=escapeHtmlSpecialChars(subject),subject=subject.replace(expr,func),subject=unescapeHtmlSpecialChars(subject),that.subject=subject}function tokenMake(a,b,c){var d={type:a,value:b,start:c};return d}function tokenSplit(a){var b=[],c=0;return scan(a,function(){switch(this.type){case"empty":case"open":case"close":c+=this.value.length;break;case"text":this.start-=c,this.end=this.start+this.value.length;break;default:throw"no type case for '"+this.type+"'"}b.push(this)}),b}function stripEmpties(a){var b=a.replace(/<span[^>]+><\/span>/g,"");return b}function tokenJoin(a){var b=[];for(var c=0,d=a.length;c<d;c++)b.push(a[c].value);return b=b.join(""),b=stripEmpties(b),b}function tokenFind(a,b,c){var d=b+c,e=-1,f=-1,g="",h="",i="";for(var j=0,k=a.length;j<k;j++){var l=a[j];if(l.type=="open")g=l.value;else if(l.type=="close")g="";else{l.start<=b&&b<l.end&&(e=j,h=g),l.start<=d&&d<l.end&&(f=j,i=g);if(e!=-1&&f!=-1)break}}var m={first:{position:e,span:h},last:{position:f,span:i}};return m}function tokenBreak(a,b,c){var d=a.value.substr(0,b),e=tokenMake("text",d,a.start);e.end=a.start+d.length;var f=a.value.substr(b),g=tokenMake("text",f,a.start+b);g.end=a.start+b+f.length;var h={first:[e],second:[g]};return c&&(h.first.push(tokenMake("close","</span>")),h.second.unshift(tokenMake("open",c))),h}function tokenExtract(a,b,c){var d=b+c,e=tokenFind(a,b,c),f=a.slice(0,e.first.position),g=a[e.first.position],h=a.slice(e.first.position+1,e.last.position),i=a[e.last.position],j=a.slice(e.last.position+1),k=tokenBreak(g,b-g.start,e.first.span),l=tokenBreak(i,d-i.start,e.last.span),m=[].concat(k.second,h,l.first);m=tokenJoin(m);var n=tokenMake("html",m,b);a=[].concat(f,k.first,n,l.second,j);var o={tokens:a,position:f.length+k.first.length};return o}function filtersProcess(a,b){var c=b;if(!a.filters)return c;var d=[];for(var e=0,f=a.filters.length;e<f;e++){var g=a.filters[e],h=$.chili.filters&&$.chili.filters[g.callback];if(!h||!$.isFunction(h))continue;0==d.length&&(d=tokenSplit(b));var i=tokenExtract(d,g.start,g.count);d=i.tokens;var j=i.position,k={text:g.original,html:d[j].value},l=g.args,m=h.apply(k,l);d[j].value=m}return 0<d.length&&(c=tokenJoin(d)),c}function clearPreviousSelection(){$.browser.msie?document.selection.empty():window.getSelection().removeAllRanges()}function resetSelectedTextElement(){element=this,clearPreviousSelection()}function getSelectedText(){var a;if($.browser.msie)a=document.selection.createRange().htmlText;else{var b=window.getSelection(),c=b.getRangeAt(0);b=b.toString(),c=c.toString(),a=/\n/.test(b)?b:c}return a}function preserveNewLines(a){var b=unique(a),c="";if(/<br\b/i.test(a)||/<li\b/i.test(a)){/<br\b/i.test(a)?a=a.replace(/\<br[^>]*?\>/ig,b):/<li\b/i.test(a)&&(a=a.replace(/<ol[^>]*?>|<\/ol>|<li[^>]*?>/ig,"").replace(/<\/li>/ig,b));var d=$("<pre>").appendTo("body").hide()[0];d.innerHTML=a,c=$(d).text().replace(new RegExp(b,"g"),"\r\n"),$(d).remove()}return c}function cleanText(a){var b=$.browser.msie?preserveNewLines(a):a.replace(/\r/g,"").replace(/^# ?/g,"").replace(/\n# ?/g,"\n");return b}function makeDialog(a,b){var c=$.chili.selection.box,d=$.browser.msie?'<textarea style="'+c.style+'">':'<pre style="'+c.style+'">',e=$(d).appendTo("body").text(a).attr("id","chili_selection").click(function(){$(this).remove()}),f=c.top(b.pageX,b.pageY,e.width(),e.height()),g=c.left(b.pageX,b.pageY,e.width(),e.height());return e.css({top:f,left:g}),e}function selectTextAgain(a){if($.browser.msie)a[0].focus(),a[0].select();else{var b=window.getSelection();b.removeAllRanges();var c=document.createRange();c.selectNodeContents(a[0]),b.addRange(c)}}function displaySelectedTextDialog(a){if(!element||element!=this)return;element=null;var b=getSelectedText();if(""==b)return;b=cleanText(b);var c=makeDialog(b,a);selectTextAgain(c)}function fixTextSelection(a){if($.chili.selection.active&&($.browser.msie||$.browser.mozilla)){var b=null;$(a).parents().filter("pre").bind("mousedown",resetSelectedTextElement).bind("mouseup",displaySelectedTextDialog)}}$.extend({chili:{whiteSpace:{tabWidth:4,no1stLine:!0},automatic:{active:!0,selector:"code",context:document},dynamic:{active:!0,origin:""},decoration:{lineNumbers:!0},selection:{active:!0,box:{style:["position:absolute; z-index:3000; overflow:scroll;","width:16em;","height:9em;","border:1px solid gray;","padding:1em;","background-color:white;"].join(" "),top:function(a,b,c,d){var e=b-Math.round(d/2);return e},left:function(a,b,c,d){var e=a;return e}}}}}),$(function(){$.chili.loadStylesheetInline(".chili-ln-off {list-style-type: none;}"),$.extend($.chili,$.chili.options),$.chili.automatic.active&&$($.chili.automatic.selector,$.chili.automatic.context).chili()}),$.extend($.chili,{version:"next",codeLanguage:function(a){return $(a).attr("class")},codeLineNumbers:function(a){var b=$(a).attr("class"),c=b.match(/\bchili-ln-(\d+)-([\w][\w\-]*)|\bchili-ln-(\d+)/),d=c?c[3]?[c[0],c[3],""]:[c[0],c[1],c[2]]:null;return d},revealChars:function(a){var b=[];for(var c=0,d=a.length;c<d;c++)b.push(a[c]+" <- "+a.charCodeAt(c));return b=b.join("\n"),b},loadStylesheetInline:function(a){if(document.createElement){var b=document.createElement("style");b.type="text/css";if(b.styleSheet)b.styleSheet.cssText=a;else{var c=document.createTextNode(a);b.appendChild(c)}var d=document.getElementsByTagName("head")[0];d.appendChild(b)}},queue:{},recipes:{},filters:{off:function(){return this.text}}}),$.fn.chili=function(a){var b=$.extend({},$.chili);return $.chili=$.extend(!0,$.chili,a||{}),this.each(function(){askDish(this)}),$.chili=b,this}})(jQuery),jQuery.chili.recipes.php={_name:"php",_case:!0,_main:{all:{_match:/[\w\W]*/,_replace:function(a){var b=String.fromCharCode(0),c=[],d=this,e=a.replace(/<\?[^?]*\?+(?:[^>][^?]*\?+)*>/g,function(a){return c.push(d.x(a,"/block/php_1")),b}),f=e.replace(/^[^?]*\?+(?:[^>][^?]*\?+)*>|<\?[\w\W]*$/g,function(a){return c.push(d.x(a,"/block/php_2")),b});if(c.length){var g=this.x(f,"html"),h=0;return g.replace(new RegExp(b,"g"),function(){return c[h++]})}return this.x(a,"/php")}}},block:{php_1:{_match:/(<\?(?:php\b)?)([^?]*\?+(?:[^>][^?]*\?+)*>)/,_replace:function(a,b,c){return"<span class='start'>"+this.x(b)+"</span>"+this.x(c.replace(/\?>$/,""),"/php")+"<span class='end'>"+this.x("?>")+"</span>"},_style:{start:"color: red;",end:"color: red;"}},php_2:{_match:/([^?]*\?+(?:[^>][^?]*\?+)*>)|(<\?(?:php\b)?)([\w\W]*)/,_replace:function(a,b,c,d){return c?"<span class='start'>"+this.x(c)+"</span>"+this.x(d,"/php"):this.x(b.replace(/\?>$/,""),"/php")+"<span class='end'>"+this.x("?>")+"</span>"},_style:{start:"color: red;",end:"color: red;"}}},php:{mlcom:{_match:/\/\*[^*]*\*+([^\/][^*]*\*+)*\//,_style:"color: gray;"},com:{_match:/(?:\/\/.*)|(?:[^\\]\#.*)/,_style:"color: green;"},string1:{_match:/\'[^\'\\]*(?:\\.[^\'\\]*)*\'/,_style:"color: purple;"},string2:{_match:/\"[^\"\\]*(?:\\.[^\"\\]*)*\"/,_style:"color: fuchsia;"},value:{_match:/\b(?:[Nn][Uu][Ll][Ll]|[Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])\b/,_style:"color: gray;"},number:{_match:/\b[+-]?(\d*\.?\d+|\d+\.?\d*)([eE][+-]?\d+)?\b/,_style:"color: red;"},const1:{_match:/\b(?:DEFAULT_INCLUDE_PATH|E_(?:ALL|CO(?:MPILE_(?:ERROR|WARNING)|RE_(?:ERROR|WARNING))|ERROR|NOTICE|PARSE|STRICT|USER_(?:ERROR|NOTICE|WARNING)|WARNING)|P(?:EAR_(?:EXTENSION_DIR|INSTALL_DIR)|HP_(?:BINDIR|CONFIG_FILE_(?:PATH|SCAN_DIR)|DATADIR|E(?:OL|XTENSION_DIR)|INT_(?:MAX|SIZE)|L(?:IBDIR|OCALSTATEDIR)|O(?:S|UTPUT_HANDLER_(?:CONT|END|START))|PREFIX|S(?:API|HLIB_SUFFIX|YSCONFDIR)|VERSION))|__COMPILER_HALT_OFFSET__)\b/,_style:"color: red;"},const2:{_match:/\b(?:A(?:B(?:DAY_(?:1|2|3|4|5|6|7)|MON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9))|LT_DIGITS|M_STR|SSERT_(?:ACTIVE|BAIL|CALLBACK|QUIET_EVAL|WARNING))|C(?:ASE_(?:LOWER|UPPER)|HAR_MAX|O(?:DESET|NNECTION_(?:ABORTED|NORMAL|TIMEOUT)|UNT_(?:NORMAL|RECURSIVE))|R(?:EDITS_(?:ALL|DOCS|FULLPAGE|G(?:ENERAL|ROUP)|MODULES|QA|SAPI)|NCYSTR|YPT_(?:BLOWFISH|EXT_DES|MD5|S(?:ALT_LENGTH|TD_DES)))|URRENCY_SYMBOL)|D(?:AY_(?:1|2|3|4|5|6|7)|ECIMAL_POINT|IRECTORY_SEPARATOR|_(?:FMT|T_FMT))|E(?:NT_(?:COMPAT|NOQUOTES|QUOTES)|RA(?:_(?:D_(?:FMT|T_FMT)|T_FMT|YEAR)|)|XTR_(?:IF_EXISTS|OVERWRITE|PREFIX_(?:ALL|I(?:F_EXISTS|NVALID)|SAME)|SKIP))|FRAC_DIGITS|GROUPING|HTML_(?:ENTITIES|SPECIALCHARS)|IN(?:FO_(?:ALL|C(?:ONFIGURATION|REDITS)|ENVIRONMENT|GENERAL|LICENSE|MODULES|VARIABLES)|I_(?:ALL|PERDIR|SYSTEM|USER)|T_(?:CURR_SYMBOL|FRAC_DIGITS))|L(?:C_(?:ALL|C(?:OLLATE|TYPE)|M(?:ESSAGES|ONETARY)|NUMERIC|TIME)|O(?:CK_(?:EX|NB|SH|UN)|G_(?:A(?:LERT|UTH(?:PRIV|))|C(?:ONS|R(?:IT|ON))|D(?:AEMON|EBUG)|E(?:MERG|RR)|INFO|KERN|L(?:OCAL(?:0|1|2|3|4|5|6|7)|PR)|MAIL|N(?:DELAY|EWS|O(?:TICE|WAIT))|ODELAY|P(?:ERROR|ID)|SYSLOG|U(?:SER|UCP)|WARNING)))|M(?:ON_(?:1(?:0|1|2|)|2|3|4|5|6|7|8|9|DECIMAL_POINT|GROUPING|THOUSANDS_SEP)|_(?:1_PI|2_(?:PI|SQRTPI)|E|L(?:N(?:10|2)|OG(?:10E|2E))|PI(?:_(?:2|4)|)|SQRT(?:1_2|2)))|N(?:EGATIVE_SIGN|O(?:EXPR|STR)|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|P(?:ATH(?:INFO_(?:BASENAME|DIRNAME|EXTENSION)|_SEPARATOR)|M_STR|OSITIVE_SIGN|_(?:CS_PRECEDES|S(?:EP_BY_SPACE|IGN_POSN)))|RADIXCHAR|S(?:EEK_(?:CUR|END|SET)|ORT_(?:ASC|DESC|NUMERIC|REGULAR|STRING)|TR_PAD_(?:BOTH|LEFT|RIGHT))|T(?:HOUS(?:ANDS_SEP|EP)|_FMT(?:_AMPM|))|YES(?:EXPR|STR))\b/,_style:"color: red;"},global:{_match:/(?:\$GLOBALS|\$_COOKIE|\$_ENV|\$_FILES|\$_GET|\$_POST|\$_REQUEST|\$_SERVER|\$_SESSION|\$php_errormsg)\b/,_style:"color: red;"},keyword:{_match:/\b(?:__CLASS__|__FILE__|__FUNCTION__|__LINE__|__METHOD__|abstract|and|array|as|break|case|catch|cfunction|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exception|exit|extends|extends|final|for|foreach|function|global|if|implements|include|include_once|interface|isset|list|new|old_function|or|php_user_filter|print|private|protected|public|require|require_once|return|static|switch|this|throw|try|unset|use|var|while|xor)\b/,_style:"color: navy;"},variable:{_match:/\$(\w+)/,_replace:'<span class="keyword">$</span><span class="variable">$1</span>',_style:"color: #4040c2;"},heredoc:{_match:/(\<\<\<\s*)(\w+)((?:(?!\2).*\n)+)(\2)\b/,_replace:'<span class="keyword">$1</span><span class="string1">$2</span><span class="string2">$3</span><span class="string1">$4</span>'}}},jQuery.chili.recipes.html={_name:"html",_case:!1,_main:{doctype:{_match:/<!DOCTYPE\b[\w\W]*?>/,_style:"color: #CC6600;"},ie_style:{_match:/(<!--\[[^\]]*\]>)([\w\W]*?)(<!\[[^\]]*\]-->)/,_replace:function(a,b,c,d){return"<span class='ie_style'>"+this.x(b)+"</span>"+this.x(c,"//style")+"<span class='ie_style'>"+this.x(d)+"</span>"},_style:"color: DarkSlateGray;"},comment:{_match:/<!--[\w\W]*?-->/,_style:"color: #4040c2;"},script:{_match:/(<script\s+[^>]*>)([\w\W]*?)(<\/script\s*>)/,_replace:function(a,b,c,d){return this.x(b,"//tag_start")+this.x(c,"javascript")+this.x(d,"//tag_end")}},style:{_match:/(<style\s+[^>]*>)([\w\W]*?)(<\/style\s*>)/,_replace:function(a,b,c,d){return this.x(b,"//tag_start")+this.x(c,"css")+this.x(d,"//tag_end")}},tag_start:{_match:/(<\w+)((?:[?%]>|[\w\W])*?)(\/>|>)/,_replace:function(a,b,c,d){return"<span class='tag_start'>"+this.x(b)+"</span>"+this.x(c,"/tag_attrs")+"<span class='tag_start'>"+this.x(d)+"</span>"},_style:"color: navy;"},tag_end:{_match:/<\/\w+\s*>|\/>/,_style:"color: navy;"},entity:{_match:/&\w+?;/,_style:"color: blue;"}},tag_attrs:{attr:{_match:/(\W*?)([\w-]+)(\s*=\s*)((?:\'[^\']*(?:\\.[^\']*)*\')|(?:\"[^\"]*(?:\\.[^\"]*)*\"))/,_replace:"$1<span class='attr_name'>$2</span>$3<span class='attr_value'>$4</span>",_style:{attr_name:"color: green;",attr_value:"color: maroon;"}}}},jQuery.chili.recipes.css={_name:"css",_case:!0,_main:{comment:{_match:/\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//,_style:"color: olive;"},directive:{_match:/@\w+/,_style:"color: fuchsia;"},url:{_match:/\b(url\s*\()([^)]+)(\))/,_replace:"<span class='url'>$1</span>$2<span class='url'>$3</span>",_style:"color: fuchsia;"},block:{_match:/\{([\w\W]*?)\}/,_replace:function(a,b){return"{"+this.x(b,"/definition")+"}"}},"class":{_match:/\.\w+/,_style:"color: #CC0066;"},id:{_match:/#\w+/,_style:"color: IndianRed;"},pseudo:{_match:/:\w+/,_style:"color: #CC9900;"},element:{_match:/\w+/,_style:"color: Purple;"}},definition:{comment:{_match:/\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//},property:{_match:/\b(?:zoom|z-index|writing-mode|word-wrap|word-spacing|word-break|width|widows|white-space|volume|voice-family|visibility|vertical-align|unicode-bidi|top|text-underline-position|text-transform|text-shadow|text-overflow|text-kashida-space|text-justify|text-indent|text-decoration|text-autospace|text-align-last|text-align|table-layout|stress|speech-rate|speak-punctuation|speak-numeral|speak-header|speak|size|scrollbar-track-color|scrollbar-shadow-color|scrollbar-highlight-color|scrollbar-face-color|scrollbar-dark-shadow-color|scrollbar-base-color|scrollbar-arrow-color|scrollbar-3d-light-color|ruby-position|ruby-overhang|ruby-align|right|richness|quotes|position|play-during|pitch-range|pitch|pause-before|pause-after|pause|page-break-inside|page-break-before|page-break-after|page|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-Y|overflow-X|overflow|outline-width|outline-style|outline-color|outline|orphans|min-width|min-height|max-width|max-height|marks|marker-offset|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|line-break|letter-spacing|left|layout-grid-type|layout-grid-mode|layout-grid-line|layout-grid-char-spacing|layout-grid-char|layout-grid|layout-flow|layer-background-image|layer-background-color|include-source|ime-mode|height|font-weight|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-family|font|float|filter|empty-cells|elevation|display|direction|cursor|cue-before|cue-after|cue|counter-reset|counter-increment|content|color|clip|clear|caption-side|bottom|border-width|border-top-width|border-top-style|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-left-width|border-left-style|border-left-color|border-left|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-color|border-bottom|border|behavior|background-repeat|background-position-y|background-position-x|background-position|background-image|background-color|background-attachment|background|azimuth|accelerator)\s*:/,_style:"color: #330066;"},special:{_match:/\b(?:-use-link-source|-set-link-source|-replace|-moz-user-select|-moz-user-modify|-moz-user-input|-moz-user-focus|-moz-outline-width|-moz-outline-style|-moz-outline-color|-moz-outline|-moz-opacity|-moz-border-top-colors|-moz-border-right-colors|-moz-border-radius-topright|-moz-border-radius-topleft|-moz-border-radius-bottomright|-moz-border-radius-bottomleft|-moz-border-radius|-moz-border-left-colors|-moz-border-bottom-colors|-moz-binding)\s*:/,_style:"color: #330066; text-decoration: underline;"},url:{_match:/\b(url\s*\()([^)]+)(\))/,_replace:"<span class='url'>$1</span>$2<span class='url'>$3</span>"},value:{_match:/\b(?:xx-small|xx-large|x-soft|x-small|x-slow|x-low|x-loud|x-large|x-high|x-fast|wider|wait|w-resize|visible|url|uppercase|upper-roman|upper-latin|upper-alpha|underline|ultra-expanded|ultra-condensed|tv|tty|transparent|top|thin|thick|text-top|text-bottom|table-row-group|table-row|table-header-group|table-footer-group|table-column-group|table-column|table-cell|table-caption|sw-resize|super|sub|status-bar|static|square|spell-out|speech|solid|soft|smaller|small-caption|small-caps|small|slower|slow|silent|show|separate|semi-expanded|semi-condensed|se-resize|scroll|screen|s-resize|run-in|rtl|rightwards|right-side|right|ridge|rgb|repeat-y|repeat-x|repeat|relative|projection|print|pre|portrait|pointer|overline|outside|outset|open-quote|once|oblique|nw-resize|nowrap|normal|none|no-repeat|no-open-quote|no-close-quote|ne-resize|narrower|n-resize|move|mix|middle|message-box|medium|marker|ltr|lowercase|lower-roman|lower-latin|lower-greek|lower-alpha|lower|low|loud|local|list-item|line-through|lighter|level|leftwards|left-side|left|larger|large|landscape|justify|italic|invert|inside|inset|inline-table|inline|icon|higher|high|hide|hidden|help|hebrew|handheld|groove|format|fixed|faster|fast|far-right|far-left|fantasy|extra-expanded|extra-condensed|expanded|embossed|embed|e-resize|double|dotted|disc|digits|default|decimal-leading-zero|decimal|dashed|cursive|crosshair|cross|crop|counters|counter|continuous|condensed|compact|collapse|code|close-quote|circle|center-right|center-left|center|caption|capitalize|braille|bottom|both|bolder|bold|block|blink|bidi-override|below|behind|baseline|avoid|auto|aural|attr|armenian|always|all|absolute|above)\b/,_style:"color: #3366FF;"},string:{_match:/(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/,_style:"color: teal;"},number:{_match:/(?:\b[+-]?(?:\d*\.?\d+|\d+\.?\d*))(?:%|(?:(?:px|pt|em|)\b))/,_style:"color: red;"},color:{_match:/(?:\#[a-fA-F0-9]{3,6})|\b(?:yellow|white|teal|silver|red|purple|olive|navy|maroon|lime|green|gray|fuchsia|blue|black|aqua|YellowGreen|Yellow|WhiteSmoke|White|Wheat|Violet|Turquoise|Tomato|Thistle|Teal|Tan|SteelBlue|SpringGreen|Snow|SlateGrey|SlateGray|SlateBlue|SkyBlue|Silver|Sienna|SeaShell|SeaGreen|SandyBrown|Salmon|SaddleBrown|RoyalBlue|RosyBrown|Red|Purple|PowderBlue|Plum|Pink|Peru|PeachPuff|PapayaWhip|PaleVioletRed|PaleTurquoise|PaleGreen|PaleGoldenRod|Orchid|OrangeRed|Orange|OliveDrab|Olive|OldLace|Navy|NavajoWhite|Moccasin|MistyRose|MintCream|MidnightBlue|MediumVioletRed|MediumTurquoise|MediumSpringGreen|MediumSlateBlue|MediumSeaGreen|MediumPurple|MediumOrchid|MediumBlue|MediumAquaMarine|Maroon|Magenta|Linen|LimeGreen|Lime|LightYellow|LightSteelBlue|LightSlateGrey|LightSlateGray|LightSkyBlue|LightSeaGreen|LightSalmon|LightPink|LightGrey|LightGreen|LightGray|LightGoldenRodYellow|LightCyan|LightCoral|LightBlue|LemonChiffon|LawnGreen|LavenderBlush|Lavender|Khaki|Ivory|Indigo|IndianRed|HotPink|HoneyDew|Grey|GreenYellow|Green|Gray|GoldenRod|Gold|GhostWhite|Gainsboro|Fuchsia|ForestGreen|FloralWhite|FireBrick|DodgerBlue|DimGrey|DimGray|DeepSkyBlue|DeepPink|Darkorange|DarkViolet|DarkTurquoise|DarkSlateGrey|DarkSlateGray|DarkSlateBlue|DarkSeaGreen|DarkSalmon|DarkRed|DarkOrchid|DarkOliveGreen|DarkMagenta|DarkKhaki|DarkGrey|DarkGreen|DarkGray|DarkGoldenRod|DarkCyan|DarkBlue|Cyan|Crimson|Cornsilk|CornflowerBlue|Coral|Chocolate|Chartreuse|CadetBlue|BurlyWood|Brown|BlueViolet|Blue|BlanchedAlmond|Black|Bisque|Beige|Azure|Aquamarine|Aqua|AntiqueWhite|AliceBlue)\b/,_style:"color: green;"}}},jQuery.chili.recipes.csharp={_name:"cs",_case:!0,_main:{mlcom:{_match:/\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//,_style:"color: #4040c2;"},com:{_match:/\/\/.*/,_style:"color: green;"},string:{_match:/(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/,_style:"color: teal;"},preproc:{_match:/^\s*#.*/,_style:"color: red;"},number:{_match:/\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/,_style:"color: red;"},keyword:{_match:/\b(?:while|volatile|void|virtual|using|ushort|unsafe|unchecked|ulong|uint|typeof|try|true|throw|this|switch|struct|string|static|stackalloc|sizeof|short|sealed|sbyte|return|ref|readonly|public|protected|private|params|override|out|operator|object|null|new|namespace|long|lock|is|internal|interface|int|in|implicit|if|goto|foreach|for|float|fixed|finally|false|extern|explicit|event|enum|else|double|do|delegate|default|decimal|continue|const|class|checked|char|catch|case|byte|break|bool|base|as|abstract)\b/,_style:"color: navy;"}}},$.chili.recipes.javascript={_name:"js",_case:!0,_main:{ml_comment:{_match:/\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//,_style:"color: gray;"},sl_comment:{_match:/\/\/.*/,_style:"color: green;"},string:{_match:/(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/,_style:"color: teal;"},num:{_match:/\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/,_style:"color: red;"},reg_not:{_match:/(?:\w+\s*)\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*(?:\s*\w+)/,_replace:function(a){return this.x(a,"//num")}},reg_exp:{_match:/\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*/,_style:"color: maroon;"},brace:{_match:/[\{\}]/,_style:"color: red;"},statement:{_match:/\b(with|while|var|try|throw|switch|return|if|for|finally|else|do|default|continue|const|catch|case|break)\b/,_style:"color: navy;"},error:{_match:/\b(URIError|TypeError|SyntaxError|ReferenceError|RangeError|EvalError|Error)\b/,_style:"color: Coral;"},object:{_match:/\b(String|RegExp|Object|Number|Math|Function|Date|Boolean|Array)\b/,_style:"color: DeepPink;"},property:{_match:/\b(undefined|arguments|NaN|Infinity)\b/,_style:"color: Purple;"},"function":{_match:/\b(parseInt|parseFloat|isNaN|isFinite|eval|encodeURIComponent|encodeURI|decodeURIComponent|decodeURI)\b/,_style:"color: olive;"},operator:{_match:/\b(void|typeof|this|new|instanceof|in|function|delete)\b/,_style:"color: RoyalBlue;"},liveconnect:{_match:/\b(sun|netscape|java|Packages|JavaPackage|JavaObject|JavaClass|JavaArray|JSObject|JSException)\b/,_style:"text-decoration: overline;"}}};