
	
var drag_block = {};
(function(){ 
	// 拖拽块模版
	var drag_tmp;
	function get_drag_tmp(){
		if(!drag_tmp){
			drag_tmp = $('#template-block').text().replace(/(^\s*)/g, "");
		}
		return drag_tmp;
	}
	
	var pos_change = false; // 标识是否内部排序拖拽
	var drag_remove_obj = null; // 拖拽移除对象
	
	function init_pos_change(drag_type){ // 
		pos_change = false;
		drag_remove_obj = null;
		//$('.d_dimension').draggable({
		$('.d_' + drag_type).draggable({
            revert:true,
            //deltaX:0,
            //deltaY:0,
			onStartDrag:function(){
				pos_change = true;
				drag_remove_obj = $(this);
				console.log('onStartDrag');
            },
            onStopDrag:function(){
				$('#li_placeholder' + drag_type).remove();
                // 拖拽结束 状态还原
				pos_change = false;
				
				if(drag_remove_obj){
					drag_remove_obj.remove();
					drag_remove_obj = null; 
				}
				
				console.log('onStopDrag');
            }
        }).droppable({
            onDragOver:function(e,source){
				console.log('onDragOver');
				drag_remove_obj = null;
				// 虚框
				var placeholder_id = 'placeholder' + drag_type;
				var placeholder_node = $('#li_' + placeholder_id);
				if(placeholder_node.length == 0){ // 如果虚框不存在，说明刚开始拖拽，创建；如果虚框已经存在，说明当前处于位置变更的拖拽中，不需要在创建
					placeholder_node = $(get_drag_tmp().
														replace('${name}', $(source).text()).
														replace(new RegExp('\\${id}','g') , placeholder_id).
														replace('${type}', 'placeholder')
													).find('li');
				}
				placeholder_node.insertAfter(this); // 插入当前节点后
            },
            onDragLeave:function(e,source){
				drag_remove_obj = $(source);
				// 虚框 移除
				$('#li_placeholder' + drag_type).remove(); 
				console.log('onDragLeave');
            },
            onDrop:function(e,source){
				console.log('onDrop');
				drag_remove_obj = null;
				// 虚框 移除
				$('#li_placeholder' + drag_type).remove();
				// 设置源移动后的位置
				$(source).removeAttr('style'); // 因为移动是easyui会添加 style，有绝对位置，所以移除
                $(source).insertAfter(this); // 插入当前节点后
            }
        });
	};
	
	drag_block.init_drag = function(drag_type){
	
        //$('[dimension]').draggable({
		//source_node.draggable({
		$('.' + drag_type).draggable({
			proxy: function(source){
					var p = $(get_drag_tmp().
									replace('${name}', $(source).text()).
									replace('${type}', drag_type)
							); 
					p.appendTo('body');
					return p;
				}, //'clone',
            revert:true,
            cursor:'move',
            onStartDrag:function(){
                $(this).draggable('options').cursor='not-allowed';
            },
            onStopDrag:function(){
                $(this).draggable('options').cursor='move';
            }
        });
        //$('#target').droppable({
        //target_node.droppable({
        $('#target_'+ drag_type).droppable({
            //accept:'#d1,#d3',
            accept: '.' + drag_type, // eg: '.dimension'
            onDragEnter:function(e,source){
                $(source).draggable('options').cursor='move';
            },
            onDragLeave:function(e,source){
                $(source).draggable('options').cursor='not-allowed';
            },
            onDrop:function(e,source){
				if(pos_change){ // 因为本事件处理tree的拖拽，如果当前是内部位置排序拖拽，则跳过 
					return; 
				}
				// 如果目标已经存在项，则不再添加
				if($('#li_' + $(source).attr('id')).length > 0){
					return;
				}
				// 生成目标节点
				var d = $(get_drag_tmp().
								replace(new RegExp('\\${name}','g'), $(source).text()).
								replace(new RegExp('\\${id}','g') ,$(source).attr('id')).
								replace(new RegExp('\\${type}','g') ,drag_type)
						).find('li');
				// 如果存在内部拖拽的虚框，则放置在虚框位置
				var placeholder_id = 'placeholder' + drag_type;
				var placeholder_node = $('#li_' + placeholder_id);
				if(placeholder_node.length > 0){
					d.insertAfter(placeholder_node); // 节点放在虚框后
					placeholder_node.remove(); // 删除虚框节点
				}else{ // 否则放置在最后
					$(this).find('ul').append(d);
				}
				// 初始化维度位置变化拖拽
				init_pos_change( drag_type);
            }
        });
	}
	
	drag_block.cancel = function(li_id){
				console.log('cancel');
		$('#' + li_id).remove();
	}
	
})();