var LongValueDialogView=Backbone.View.extend({defaults:{},events:{"click span.longValOpen":"handleOpenClick"},initialize:function(options){this.options=$.extend({},this.defaults,options||{});},render:function(){this.$el.append($('<span class="longValOpen link">View</span>'));},handleOpenClick:function(event){var lvDialog=$('#longValueDialog');lvDialog.find('.headerText').text(this.options.headerText);var t;if(typeof this.options.valFunc!="undefined"){t=this.options.valFunc();}else{var value=this.options.valRaw;var blkstr=[];$.each(value,function(i,val){var str=val;blkstr.push(str);});t=blkstr.join(", ");}
var tc=t.replace(/[\n\r\t]/g,"");lvDialog.find('.longValText').text(tc);lvDialog.dialog(dialogOptions);}});