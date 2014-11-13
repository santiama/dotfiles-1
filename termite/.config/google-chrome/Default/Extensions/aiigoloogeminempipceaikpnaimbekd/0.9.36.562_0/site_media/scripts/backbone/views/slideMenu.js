var slideMenuView=Backbone.View.extend({events:{"click .trigger":"slideMenu","click .icon-cancel":"slideMenu","click .menuTechView":"clickTechView"},initialize:function(){_.bindAll(this,'slideMenu');_.bindAll(this,'slideMenuOpen');_.bindAll(this,'slideMenuClose');$('html').click(this.slideMenuClose);this.$el.click(function(event){event.stopPropagation();});},slideMenu:function(){if(this.$el.children('.slideMenu').hasClass('open')){this.slideMenuClose();}else{this.slideMenuOpen();}},slideMenuOpen:function(){this.$el.children('.slideMenu').addClass('open');if($('#encryptionConsole').hasClass('open')){$('.menuTechView').text('Turn Tech View Off');}else{$('.menuTechView').text('Turn Tech View On');}
$('#menuOverlay').show();},slideMenuClose:function(){this.$el.children('.slideMenu').removeClass('open');$('#menuOverlay').hide();},clickTechView:function(){if($('#encryptionConsole').hasClass('open')){$('.closeConsoleIcon').click();$(event.target).text('Turn Tech View On');}else{$('#showConsole').click();$(event.target).text('Turn Tech View Off');}}});