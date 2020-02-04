Game.updates = (function(){
	
	var instance = {};
	instance.entries = [];

	instance.versionNumber = 1;
	instance.updateRead = false;

	instance.updateTitleTemplate = Handlebars.compile(['<div id="updateAlert" class="alert alert-info alert-dismissible fade in">',
	    '<button href="#" class="close btn.btn-info" data-dismiss="alert" aria-label="close">Close</button>',
	    '<strong>新的更新！</strong> 这是从上次更新后，新增加的功能（V.4.4.8起）：<br>',
	    '<ul id="updateLog"></ul>',
	'</div>'].join('\n'));
	instance.updateTemplate = Handlebars.compile('<li><span>{{desc}}</span></li>');

	instance.initialise = function(){
		if(metal != 0){
			var extra = 0;
			var target = $('#updateBox');
			var html = this.updateTitleTemplate();
			target.append($(html));
			for(var id in Game.updatesData) {
				if(this.entries.length < 5){
					this.createDisplay(Game.updatesData[id]);
				}
				else{
					extra += 1;
				}
	            
	        }
	        if(extra > 0){
	        	var extraUpdates = {
	        		desc: '+' + extra + ' more. Click the version number to see the full changelog.',
	        		read: false
	        	}
	        	this.createDisplay(extraUpdates);
	        }
	    	if(this.updateRead === false){
	    		document.getElementById("updateAlert").className = "hidden";
	    	}
	    } else {
	    	for(var id in Game.updatesData) {
				Game.updatesData[id].read = true;
	            
	        }
	    }
	}

	instance.createDisplay = function(self){
		if(self.read == false){
			this.entries.push(self);
			var target = $('#updateLog');
	        var html = this.updateTemplate(self);
	        target.append($(html));
	        self.read = true;
	        this.updateRead = true;
		}
	}

	instance.save = function(data){
		data.updates = {versionNumber: 1, entries: {}};
		for(var id in Game.updatesData){
			data.updates.entries[id] = Game.updatesData[id];
		}
	}

	instance.load = function(data){
		if(data.updates) {
			if(data.updates.versionNumber && data.updates.versionNumber == 1){
				Game.updates.versionNumber = data.versionNumber;
				for(var id in data.updates.entries){
					Game.updatesData[id] = data.updates.entries[id];
				}
			}
		}
	}

	instance.getUpdateData = function(id) {
        return Game.updatesData[id];
    };

	return instance;

}());

Game.updatesData = (function(){

	var instance = {};

	instance.nerfEnergyEff = {
		desc: '削弱能源效率降低100倍，但只能涨到25％',
		read: false
	};

	instance.batteryEff = {
		desc: '电池效率升级将您的电池存储量提高1％（最多50个）',
		read: false
	};

	instance.effResearchLevel = {
		desc: '改变效率研究，显示当前水平，而不是下一个水平',
		read: false
	};

	instance.buffBattEff = {
		desc: '提高电池效率达到200级，而不是50级。',
		read: false
	};

	instance.redDestroy = {
		desc: '更多 - >图形选项。 增加了将破坏按钮变红的选项。',
		read: false
	};

	instance.nerfRocketFuelResearch = {
		desc: '增加火箭燃料研究的科学成本',
		read: false
	};

	instance.rocketFuelT3 = {
		desc: '添加肼催化剂 - T3火箭燃料',
		read: false
	};

	instance.achievFormat = {
		desc: '新增成就数字格式',
		read: false
	};

	instance.splash = {
		desc: '现在有100个加载消息！',
		read: false
	};

	instance.stargazeIntro = {
		desc: '准系统 + 简介添加了星空标签',
		read: false
	};

	instance.irs = {
		desc: '新增星际雷达扫描仪（星际 - >通讯）',
		read: false
	};

	instance.ranks = {
		desc: '增加成就等级',
		read: false
	};

	instance.lunarite = {
		desc: '改变太空金属为：月陆',
		read: false
	};

	instance.hideWonder = {
		desc: '“奇迹”选项卡在完成后隐藏（为更多选项卡留出空间）',
		read: false
	};

	instance.dmCounter = {
		desc: '暗物质是现在计算并显示。',
		read: false
	};

	instance.hideButton = {
		desc: '如果需要，您可以取消隐藏已完成的选项卡。 更多 - >图形选项。',
		read: false
	};

	instance.achivementsReset = {
		desc: '成就已重新设定，您将收回您目前所需的水平。',
		read: false
	};

	instance.relationUpgrades = {
		desc: '重生升级现在为升级提供了关联。',
		read: false
	};

	instance.fixSecondRebirth = {
		desc: '固定后续重生。 你现在可以多次重生，不用担心贪污腐败！',
		read: false
	};

	instance.T5Batteries = {
		desc: '添加第5级电池：星空-> kitrinos公司',
		read: false
	};

	instance.memoryLeak = {
		desc: '修复了巨大的内存泄漏。 游戏应该运行得更顺利，使用更少的CPU' ,
		read: false
	};

	instance.multiSpheres = {
		desc: '征服的每个星系统允许您构建一个球体。',
		read: false
	}

	instance.autoEmc = {
		desc: '添加了自动Emc！ 遥望星空 - > Prasnian帝国',
		read: false
	}

	instance.respec = {
		desc: '保持你的DM升级和有respec的能力。',
		read: false
	}

	instance.segmentAndSphere = {
		desc: '建立250段和戴森球按钮',
		read: false
	}

	instance.meteoriteTier34 = {
		desc: '陨石层级3和4遥望星空 - > Moviton同步',
		read: false
	};

	instance.buffCapitalShip = {
		desc: '缓冲资本船舶的电力和防御。',
		read: false
	};

	instance.dmStats = {
		desc: '现场计数器显示每个部分将获得多少DM',
		read: false
	};

	return instance;

}());