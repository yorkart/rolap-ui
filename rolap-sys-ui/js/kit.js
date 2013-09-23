/**
 * Marketing Analysis Kit
 * author wy.
 */
var kit = {};
(function(){
    
    kit.valid = {
        isNum : function(val){
            if (!val){
                return false;
            }
            return /^-?\d+$/.test(val);
        },
        // 验证多个以一定字符分割的整数 , 值可以为空
        isNums : function(val,splitor){
            if (!val) {
                return true;
            }
            var nums = val.split(splitor);
            for (var i = 0; i < nums.length; i++) {
                if (!IsNumber(nums[i])) {
                    return false;
                }
            }
            return true;
        },
        isDate : function(val){
            if (!val){
                return false;
            }
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var iaDate = new Array(3);
            var year, month, day;

            iaDate = sDate.toString().split("-");
            if (iaDate.length != 3){
                return false;
            }
            if (iaDate[1].length > 2 || iaDate[2].length > 2){
                return false;
            }

            year = this.num(iaDate[0]);
            month = this.num(iaDate[1]);
            day = this.num(iaDate[2]);

            if (year < 1900 || year > 2100)
                return false
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                iaMonthDays[1] = 29;
            if (month < 1 || month > 12)
                return false
            if (day < 1 || day > iaMonthDays[month - 1])
                return false

            return true
        }
    };

    kit.convert = {
        num : function(val){
            if(!kit.valid.isNum(val)){
                return false;
            }
            return parseInt(val,10);
        },
        nums : function(val,splitor){
            if(!kit.valid.isNums(val,splitor)){
                return false;
            }
            var ids = [];
            if(!val){
                return ids;
            }
            var nums = val.split(splitor);
            for (var i = 0; i < nums.length; i++) {
                ids.push(kit.convert.num(nums[i]));
            }
            return ids;
        },
        strs : function(val,splitor){
            var ids = [];
            if(!val){
                return ids;
            }
            var ss = val.split(splitor);
            for (var i = 0; i < ss.length; i++) {
                ids.push(ss[i]);
            }
            return ids;
        },
        date : function(val){
            if(!val){
                return null;
            }
            var iaDate = val.toString().split("-");
            year = parseFloat(iaDate[0]);
            month = parseFloat(iaDate[1]) - 1;
            day = parseFloat(iaDate[2]);
            return (new Date(year, month, day));
        }
    };

    kit.addDay = function(dtime,nDays){
        if(dtime){
            return new Date(dtime.setDate(dtime.getDate() + nDays));
        }
        return null;
    };

    kit.split = function(str,len){
        if(!str || str.length <= len){
            return str;
        }
        return str.substring(str,len) + '...';
    }
    /**
      * "fnServerData": function (sSource, aoData, fnCallback, oSettings)
      * 中aoData 的数据格式
        [
	        { "name": "sEcho", "value": 3 }, --传输的批次号
	        { "name": "iColumns", "value": 3 },  -- 表格列数
	        { "name": "sColumns", "value": "" },  -- 
	        { "name": "iDisplayStart", "value": 0 },  -- 起始记录索引
	        { "name": "iDisplayLength", "value": 10 },  -- 显示每页显示记录数
	        { "name": "mDataProp_0", "value": "Id" },  -- 第一列属性名
	        { "name": "mDataProp_1", "value": "Name" },  -- 第二列属性名
	        { "name": "mDataProp_2", "value": "Pswd" },  -- 第三列属性名
	        { "name": "sSearch", "value": "" },  -- 查询关键词
	        { "name": "bRegex", "value": false },  
	        { "name": "sSearch_0", "value": "" },
	        { "name": "bRegex_0", "value": false },
	        { "name": "bSearchable_0", "value": false },
	        { "name": "sSearch_1", "value": "" },
	        { "name": "bRegex_1", "value": false },
	        { "name": "bSearchable_1", "value": true },
	        { "name": "sSearch_2", "value": "" },
	        { "name": "bRegex_2", "value": false },
	        { "name": "bSearchable_2", "value": true },
	        { "name": "iSortCol_0", "value": 2 },  -- 第一个排序列的索引
	        { "name": "sSortDir_0", "value": "asc" },  -- 第一个排序列的索引
	        { "name": "iSortingCols", "value": 1 },  -- 排序列个数
	        { "name": "bSortable_0", "value": false },  -- 第一列是否可排序
	        { "name": "bSortable_1", "value": true },  -- 第二列是否可排序
	        { "name": "bSortable_2", "value": true }  -- 第三列是否可排序
        ]
    */
    kit.dtmodel = function(aoData) {
        if (!aoData || aoData.length == 0) {
            return null;
        }

        function get(key) {
            var val = aoData.where(function(){ 
                return this.name == key;
            });
            return val.length ? val[0].value : null;
        }

        var ndwrTable = {};

        ndwrTable.sEcho = get('sEcho');
        ndwrTable.iDisplayStart = get('iDisplayStart');
        ndwrTable.iDisplayLength = get('iDisplayLength');
        ndwrTable.sSearch = get('sSearch');
        var iSortingCols = get('iSortingCols');
        if (iSortingCols > 0) { // 这里只针对一列排序，不能多列排序
            var nCol = get('iSortCol_0');
            ndwrTable.orderbyColName = get('mDataProp_' + nCol);
            ndwrTable.sortType = get('sSortDir_0');
        }

        return ndwrTable;
    }

    $.fn.extend({
        // checkbox 返回 集合形式
        vals : function(){
            switch(this[0].type){
                case 'checkbox' : { // 复选框 eg:$("[name=useStatus]:checkbox").vals();
                    var us = [];
                    this.each(function () {
                        if ($(this).attr("checked")!= undefined) { us.push(parseInt($(this).val(), 10)); }
                    });
                    return us;
                }
                case 'radio' : // 单选框  eg:$('input:radio[name=orderType]:checked').vals()
                case 'text' : { // 文本框 
                    switch(arguments.length){
                        case 0:{ // 如果没有参数， 则返回值 eg:$('#refId').vals()
                            return this.val();
                        }
                        case 1: { // 如果只有一个参数， 则按照所描述类型返回指定类型 eg:$('#refId').vals('number')
                            switch(arguments[0]){ 
                                case 'number' : return kit.convert.num(this.val());
                                case 'string' : return this.val();
                                case 'date'   : return kit.convert.date(this.val());
                            }
                            break;
                        }
                        default :{ // 大于1个参数，arguments[0]为返回类型,arguments[1]为分隔符 ，返回集合
                            switch(arguments[0]){ // eg:$('#refId').vals('number',',')
                                case 'number' : return kit.convert.nums(this.val(),arguments[1]);
                                case 'string' : return kit.convert.strs(this.val(),arguments[1]);
                                default : return undefined;
                            }
                        }
                    }
                }
                case 'select' : {
                    return '';
                }
                default :{ // 不是支持的节点类型
                    return undefined;
                }
            }
        }   
    });


    // 验证 数字 需传入分隔符
    $.validator.addMethod("numbers", function (value, element, param) {
        if (value == '') {
            return true;
        }
        var nums = value.split(param);
        if (nums != null && nums.length > 0) {
            for (var i = 0; i < nums.length; i++) {
                if (!IsNumber(nums[i])) {
                    return false;
                }
            }
        }
        return true;
    });
    // 验证
    $.validator.addMethod("double_date", function (value, element, param) {
        if ($(param[0]).val() == '' ^ $(param[1]).val() == '') {
            return false;
        }
        return true;
    });
    
    /**
     * 数组列选择
     * @arg :  1. [列名],[列名]... eg : [{id:0,name:'ds'}].select('id','name');
     *         2. [old列名,new列名],[old列名,new列名] eg: [{id:0,name:'ds'}].select(['id','newid'],['name','newname']);
     */
    Array.prototype.select = function(){

        if(this.length <= 0 || arguments.length == 0){
            return this;
        }
        // 如果参数是以 'column_name','column_name','column_name' 方式
        function cvt(itm,keys){
            if(keys.length == 1){
                return itm[keys[0]];
            }
            var rtval = {};
            $.each(keys,function(){
                rtval[this] = itm[this];
            });
            return rtval;
        }
        
        // 如果参数是以 ['column_name','column_new_name'],['column_name','column_new_name'] 方式
        function cvt_n_o(itm,keys){
            var rtval = {};
            $.each(keys,function(){
                rtval[this[1]] = itm[this[0]];
            });
            return rtval;
        }

        var cvt_func;
        if(jQuery.type(arguments[0]) == 'string'){
            cvt_func = cvt;
        }else if(jQuery.type(arguments[0]) == 'array'){
            cvt_func = cvt_n_o;
        }else {
            throw new Error('不识别的参数类型');
        }
        
        var newAry = [];
        var args = arguments;
        $.each(this,function(){
            newAry.push(cvt_func(this,args));
        });

        return newAry;
    }

    /**
     * 数组按条件筛选
     * @arg :  eg: function(){ return this.id == 0;}
     */
    Array.prototype.where = function(conditionFunc){
        if(this.length <= 0){
            return this;
        }
        var newAry = [];
        for(var i =0; i < this.length; i++){
            if(conditionFunc.call(this[i])){
                newAry.push(this[i]);
            }
        }
        return newAry;
    }



    kit.loading = {
        show: function () {
            if ($('#loading').length == 0) {
                this.create();
            }
            $('#loading').css('display', 'block'); // show('fast');
        },
        hidden: function () {
            if ($('#loading').length > 0) {
                $('#loading').css('display', 'none'); // hide('fast');
            }
        },
        create: function () {
            _loadingImgPath = "http://" + window.location.host + "/TCPMAS/Images/loading.gif";
            var loadingHTML = "<div id=\"loading\"><img src=\"" + _loadingImgPath + "\" alt=\"正在请求数据...\" height=\"16\" width=\"160\" /></div>";
            $('body').append(loadingHTML);
            $("#loading").css({
                'top': '20px',
                'right': '20px',
                'width': '160px',
                'height': '16px',
                'marginTop': '-5px',
                'marginRight': '-5px',
                'position': 'fixed',
                'float': 'right',
                'display': 'none',
                'z-index': 9999
            });
        }
    };


    // 页面定时轮训
    (function(){
        var interval = 100, // 定时间隔100毫秒
            pollTimeout = undefined, // 用于判断定时器启动标志
            fns = []; // 方法集合
        // 启动轮训
        function start(){ 
            (function check() {
                for(var i=0; i< fns.length; i++){
                    if(fns[i]() == false){ // 如果方法返回false则移除该方法
                        fns.splice(i,1);
                        i--;
                    }
                }
                pollTimeout = setTimeout(check, interval);
            })();
        };

        kit.poller = {
            add : function(fn){
                //  如果没有启动定时器，启动 【一定先执行此判断再添加】
                if(!pollTimeout){
                    start();
                }
                fns.push(fn);
            }
        };
    })();


})();
















