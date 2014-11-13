var ChromeClientInstallView=Backbone.View.extend({events:{"click .installApp":"handleInlineAppInstall","click .installExt":"handleInlineExtInstall"},initialize:function(){var isOpera=(navigator.userAgent.match(/Opera|OPR\//)?true:false);var hasAccessToWebstore;try{hasAccessToWebstore=(typeof chrome.webstore.install=="function");}catch(x){hasAccessToWebstore=false;}
if(navigator.userAgent.match('Chrome')!==null&&navigator.userAgent.match('Android')===null&&isOpera===false&&hasAccessToWebstore){$('.notchrome').remove();}else{$('.ischrome').remove();$('.registerSpot').addClass('chromeResize');}},handleInlineAppInstall:function(event){if($('.installApp').children(".spinMe").length){$('.installApp').addClass('installing').children(".spinMe").spinnerFont();}
var self=this;chrome.webstore.install($('link#app-link').attr('href'),function(){$('.app .installSuccess').removeClass('defaultHide');$('.app .version').hide();$('.app button').hide();$('.app .cwslink').hide();$('.installApp').removeClass('installing');$('.installApp .text').html('<span aria-hidden="true" class="icon-checkmark icomoon-icon"></span> Installation Successful');},function(msg){$('.installApp').removeClass('installing');var suppressCustomDialog,suppressEmail;suppressCustomDialog=suppressEmail=false;if(msg=="User cancelled install"){suppressCustomDialog=true;suppressEmail=true;}
Exception.handle("Couldn't install chrome app. msg: "+msg,document.location.href,0,true,suppressEmail);if(!suppressCustomDialog){$("#appFailInstall").dialog(dialogOptions);$("#appFailInstall span.errorDetails").text(msg);}});},handleInlineExtInstall:function(event){if($('.installExt').children(".spinMe").length){$('.installExt').addClass('installing').children(".spinMe").spinnerFont();}
var self=this;chrome.webstore.install($('link#ext-link').attr('href'),function(){Exception.handle("Chrome extension successfully installed ",document.location.href,0,true,true);$('#clientNotAllowedMsg-installSuccess').removeClass('defaultHide');$('#clientNotAllowedMsg-extNotDetected').addClass('defaultHide');$('.ext .installSuccess').removeClass('defaultHide');$('.ext .version').hide();$('.ext button').hide();$('.ext .cwslink').hide();$('.installExt').removeClass('installing');$('.installExt .text').html('<span aria-hidden="true" class="icon-checkmark icomoon-icon"></span> Installation Successful');},function(msg){$('.installExt').removeClass('installing');var suppressCustomDialog,suppressEmail;suppressCustomDialog=suppressEmail=false;if(msg=="User cancelled install"){suppressCustomDialog=true;suppressEmail=true;}
Exception.handle("Couldn't install chrome ext. msg: "+msg,document.location.href,0,true,suppressEmail);if(!suppressCustomDialog){$("#extFailInstall").dialog(dialogOptions);$("#extFailInstall span.errorDetails").text(msg);}});}});