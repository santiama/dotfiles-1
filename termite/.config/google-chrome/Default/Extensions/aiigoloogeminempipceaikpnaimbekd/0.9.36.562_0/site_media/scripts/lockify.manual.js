/*
 * Lockify Manuals
 * Copyright 2010 Lockify Inc. All Rights Reserved.
 * License:
 * Initializes Tab router and navigation for the tabs
 */
lockify.manuals={tabRouter:{},getRandomKey:function(){var newKey=lockifyCryptoUtils.URLBase64ToBase64(lockifyCryptoUtils.generateRandomString(43));$('#decrypt_passphrase').val(newKey);$('#decrypt_command_key').text(newKey);$('#commandContainer').show();$('#keyLoading').hide();$('#passphraseLoading').hide();}};$(document).ready(function(){$('.numbers').each(function(){var num=$(this).html();num=lockifyUtils.numberWithCommas(num);$(this).html(num);});if($("#serverlessMethod").prop("checked")){lockify.manuals.tabRouter.navigate("encrypt",{trigger:true});}
$("#serverlessMethod").change(function(){if($("#serverlessMethod").prop("checked")){lockify.manuals.tabRouter.navigate("encrypt",{trigger:true});}else{lockify.manuals.tabRouter.navigate("decrypt",{trigger:true});}});$('#setupTab').click(function(){lockify.manuals.tabRouter.navigate("setup",{trigger:true});$(this).blur();});$('#encryptTab').click(function(){lockify.manuals.tabRouter.navigate("encrypt",{trigger:true});$('#data').blur();});$('#decryptTab').click(function(){lockify.manuals.tabRouter.navigate("decrypt",{trigger:true});});var currentLength=$("#data").length;var remainingChars=($('#data').data('maxLength')-currentLength).toString();remainingChars=remainingChars.replace(/([0-9]+)([0-9]{3})$/,'$1,$2');$('#dataCharCount').text(remainingChars);if(!lockifyCryptoUtils.nativeCryptoAvailable()){this.entropyMeter=new EntropyMeterView({el:$('#entropyEncryptContainer')});sjclE.random.RandomInit();Random.add_entropy(new Date().getTime(),0,'load_start_time');lockifyEntropy.bindEntropyEvents();Random.addEventListener('seeded',lockify.manuals.getRandomKey);}else{lockify.manuals.getRandomKey();}
lockify.manuals.tabRouter=new TabsManualRouter({});Backbone.history.start();if(window.location.hash=='#encrypt'){lockify.manuals.tabRouter.navigate("encrypt",{trigger:true});}else if(window.location.hash=='#decrypt'){lockify.manuals.tabRouter.navigate("decrypt",{trigger:true});}
$('body').css('visibility','visible');setTimeout(function(){$('#manualLoading').hide();$('#openssl_form').show();},300);$('.grippie').mouseenter(function(){$(this).siblings('textarea').addClass('grippie-hover');}).mouseleave(function(){$(this).siblings('textarea').removeClass('grippie-hover');});});