var GuestEncLinkView=Backbone.View.extend({events:{},initialize:function(options){this.options=$.extend({},this.defaults,options||{});$('#guestEncryptPanel').show();$('#guestEncLink').attr('href','/'+this.options.path).text(domain+'/'+this.options.path);}});