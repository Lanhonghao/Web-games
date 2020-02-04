COST_TYPE = {
    FIXED: 0
};

TECH_TYPE = {
    UPGRADE: 0,
    UNLOCK: 1
};

BUILDING_TYPE = {
    PRODUCER: 0
};

RESOURCE_OBSERVER_TYPE = {
    CURRENT_VALUE: 0,
    SPECIFIC_VALUE: 1,
    CAPACITY: 2,
    PER_SECOND: 3
};

RESOURCE = {
	Energy: 'energy',
	Plasma: 'plasma',
	Uranium: 'uranium',
	Lava: 'lava',
	Oil: 'oil',
	Metal: 'metal',
	Gem: 'gem',
	Charcoal: 'charcoal',
	Wood: 'wood',
	Silicon: 'silicon',
	Lunarite: 'lunarite',
	Methane: 'methane',
	Titanium: 'titanium',
	Gold: 'gold',
	Silver: 'silver',
	Hydrogen: 'hydrogen',
	Helium: 'helium',
	Ice: 'ice',
	Meteorite: 'meteorite',
	Science: 'science',
	RocketFuel: 'rocketFuel'
};

INDEX_NONE = -1;

Game.constants = (function(){

    var instance = {};
    instance.iconPath = "Icons/";
    instance.iconExtension = "png";
    instance.rank = ["太空旅行者", "太空探险家", "太阳旅行者", "太空船飞行员", "戴森斯技术员", "奇迹建设者", "霸主助手", "反物质测试仪", "火箭工程师", "远距离星际空间", "舰队指挥官", "阵营外交官", "控制台骗子", "保存文件编辑器", "源代码黑客", "威望"]
//    instance.rank = ["Space Noob", "Space Explorer", "Solar Traveler", "Spaceship Pilot", "Dyson Sphere Technician", "Wonder Builder", "Overlord Associate", "Antimatter Tester", "Rocket Engineer", "Interstellar Space Farer", "Fleet Commander", "Faction Diplomat", "Console Cheater", "Save File Editor", "Source Code Hacker", "The Prestiged"]
    instance.achievementMax = 1000;
    instance.achievementIconsPerRow = 4;
    instance.achievementResourceBrackets = [50, 5000, 500000, 50000000, 5000000000];
    instance.achievementProducerBrackets = [10, 50, 100, 500, 1000];
    instance.achievementBracketColors = ["#9d9d9d", "#1eff00", "#0070dd", "#a335ee", "#ff8000"];

    instance.achievementCategoryResources = "资源";
    instance.achievementCategoryProducers = "生产";

    instance.statisticCategoryGeneral = "总结";
    instance.statisticCategoryUnlockable = "解锁";
    instance.statisticCategoryTiming = "计时";

    instance.maxTier = 6;

    instance.enableStorageNotifications = false;
    instance.enableMachineTab = false;

    return instance;
}());
