var Chi2sModel=Backbone.Model.extend({defaults:{chi2s:[],chi2sSorted:[],yShift:2,standardDeviation:NaN},cutOff1Tail:function(num){return 1.0-(Math.abs(num-0.5)*2);},getValForIndex:function(index,tailCount){if(typeof tailCount=='undefined'){tailCount=2;}
var val=this.get('chi2s')[index];if(tailCount==1){val=this.cutOff1Tail(val);}
return val;},getValForIndexSorted:function(index,tailCount){if(typeof tailCount=='undefined'){tailCount=2;}
var val=this.get('chi2sSorted')[index];if(tailCount==1){val=this.cutOff1Tail(val);}
return val;},getFormattedValForIndex:function(index,tailCount){if(typeof tailCount=='undefined'){tailCount=2;}
var prob=this.get('chi2s')[index];if(tailCount==1){prob=this.cutOff1Tail(prob);}
return(Math.round(prob*10000)/100)+"%";},getFormattedAvgUpToIndex:function(index,tailCount){if(typeof tailCount=='undefined'){tailCount=2;}
var sum=0.0;var self=this;$.each(this.get('chi2s').slice(0,index+1),function(i,val){if(tailCount==1){val=self.cutOff1Tail(val);}
sum+=val;});var avg=sum/(index+1);return(Math.round(avg*10000)/100)+"%";},getLogValForIndex:function(index,tailCount){if(typeof tailCount=='undefined'){tailCount=2;}
var value=this.get('chi2s')[index];if(tailCount==1){value=this.cutOff1Tail(value);}
return(Math.log((value*100)+this.get('yShift'))/Math.log(100+this.get('yShift')));},pushVal:function(value){var newArr=this.get('chi2s').slice(0);newArr.push(value);this.set('chi2s',newArr);this.set('chi2sSorted',newArr.sort());},groupIntoBins:function(){var self=this;var binCount=8;var bins=new Array(8+1).join('0').split('').map(parseFloat);var sd=.25;var mean=this.getMean();var binRanges=new Array(binCount);$.each(bins,function(i,value){var devCount=i-bins.length/2;binRanges[i]=[mean+(devCount*sd/2),mean+((devCount+1)*sd/2)];});$.each(this.get('chi2s'),function(i,value){for(var j=0;j<binRanges.length;j++){binRange=binRanges[j];if(value>=binRange[0]&&value<binRange[1]){bins[j]+=1;break;}}});return bins;},getMean:function(arr){if(typeof arr=='undefined'){arr=this.get('chi2s');}
var sum=0;var len=arr.length;for(var i=0;i<len;i++){sum+=arr[i];};return sum/len;},getStandardDeviation:function(){var self=this;variance=function(arr){var m=self.getMean(arr);var d=[];for(var i=0,len=arr.length;i<len;i++){d.push(Math.pow(arr[i]-m,2));};return self.getMean(d);};if(isNaN(this.get('standardDeviation'))){this.set('standardDeviation',Math.sqrt(variance(this.get('chi2s'))));}
return this.get('standardDeviation');}});