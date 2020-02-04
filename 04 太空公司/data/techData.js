Game.techData = (function () {

    var instance = {};

    var techBase = {
        id: null,
        htmlId: null,
        htmlIdCost: null,
        htmlIdTitle: null,
        htmlIdButton: null,
        displayNeedsUpdate: true,

        name: 'Research',
        desc: '购买解锁的东西。',
        notifyTitle: null,
        notifyText: null,
        buttonText: '解锁',

        current: 0,
        maxLevel: 1,
        unlocked: false,

        newResources: [],
        newTechs: [],
        newTabs: [],
        tabAlerts: [],

        setId: function(id) {
            this.id = id;
            this.htmlId = id;
            this.htmlIdCost = id + 'Cost';
            this.htmlIdTitle = id + 'Title';
            this.htmlIdButton = id + 'Button';
        },

        getBodyElement: function() {
            return $('#' + this.htmlId);
        },
        getTitleElement: function() {
            return $('#' + this.htmlIdTitle);
        },
        getCostElement: function() {
            return $('#' + this.htmlIdCost);
        },
        getButtonElement: function() {
            return $('#' + this.htmlIdButton);
        },

        apply: function(self) {
            for (var i = 0; i < this.newResources.length; i++) {
                if (resourcesUnlocked.indexOf(this.newResources[i]) === INDEX_NONE) {
                    resourcesUnlocked.push(this.newResources[i]);
                }
            }
            for (i = 0; i < this.newTabs.length; i++) {
                if (tabsUnlocked.indexOf(this.newTabs[i]) === INDEX_NONE) {
                    tabsUnlocked.push(this.newTabs[i]);
                }
            }
            for (i = 0; i < this.newTechs.length; i++) {
                Game.tech.unlockTech(this.newTechs[i]);
            }
            if (this.onApply !== null) {
                this.onApply();
            }
        },
        // for any tech specific apply changes
        onApply: null

    };

    // Researches
    instance.unlockStorage = $.extend({}, techBase, {
        name: '存储升级',
        desc: '这将允许您构建存储升级，以增加您一次可以获得的资源量的最大值。',
        buttonText: '解锁存储',
        type: TECH_TYPE.UNLOCK,
        unlocked: true,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 5
        },
        newTechs: ['unlockOil'],
        tabAlerts: ['resources']
    });
    
    instance.unlockBasicEnergy = $.extend({}, techBase, {
        name: '基本能源生产',
        desc: '您将能够通过把木材在炉子中变为木炭，从而使蒸汽发动机发电。',
        buttonText: '解锁基础能源生产',
        type: TECH_TYPE.UNLOCK,
        unlocked: true,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 20
        },
        newResources: ['energyNav', 'charcoalNav'],
        newTechs: ['unlockSolar', 'unlockMachines', 'upgradeEngineTech'],
        tabAlerts: ['resources']
    });

    instance.unlockOil = $.extend({}, techBase, {
        name: '石油加工',
        desc: '石油用于燃料更先进的机器，收集资源，并产生比基本手段更多的电力。 解锁油加工可以让您从地面上提取。',
        buttonText: '解锁石油',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 30
        },
        newResources: ['oilNav'],
        tabAlerts: ['resources']
    });

    instance.unlockSolar = $.extend({}, techBase, {
        name: '太阳能板',
        desc: '太阳能电池板不需要燃料就可以生产能源，但它们比其他形式的能源生产要慢。',
        buttonText: '解锁太阳能板',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 50
        },
        newTechs: ['upgradeSolarTech'],
        tabAlerts: ['resources']
    });

    instance.unlockMachines = $.extend({}, techBase, {
        name: '资源机器',
        desc: '资源机器比简单的方法生产更多的资源，但需要不断的供电。',
        buttonText: '解锁资源机器',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 100
        },
        newTechs: ['unlockSolarSystem', 'upgradeResourceTech', 'unlockDestruction'],
        tabAlerts: ['resources']
    });

    instance.unlockDestruction = $.extend({}, techBase, {
        name: '破坏机器',
        desc: '这样您就可以销毁已经创建的机器。 当有更有效的获取资源的方法，或者您没有足够的能量来支持您的机器时，这将非常有用。',
        buttonText: '解锁破坏机器',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 500
        },
        tabAlerts: ['resources']
    });

    instance.unlockSolarSystem = $.extend({}, techBase, {
        name: '空间',
        desc: '解锁空间旅行允许发射火箭，并开辟了一个全新的研究领域。',
        buttonText: '解锁空间旅行',
        notifyTitle: '新标签!',
        notifyText: '你已经解锁了太阳系选项卡！',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 500
        },
        newTabs: ['solarSystemTab'],
        newTechs: ['unlockLabT2', 'unlockRocketFuelT2'],
        tabAlerts: ['solarSystem']
    });

    instance.unlockRocketFuelT2 = $.extend({}, techBase, {
        name: '氧化作用',
        desc: '氧化是创造火箭燃料的更有效的过程。',
        buttonText: '解锁氧化作用',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 450000
        },
        newResources: ['rocketFuelT2'],
        newTechs: ['unlockRocketFuelT3'],
        tabAlerts: ['solarSystem']
    });

    instance.unlockRocketFuelT3 = $.extend({}, techBase, {
        name: '肼',
        desc: '肼是由甲烷产生的化合物，其增加了在肼催化剂机中可以产生火箭燃料的速度.',
        buttonText: '解锁肼',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 3200000
        },
        newResources: ['rocketFuelT3'],
        tabAlerts: ['solarSystem']
    });

    instance.unlockLabT2 = $.extend({}, techBase, {
        name: '第2级科学',
        desc: '研究这将使您可以大幅增加科学产量。',
        buttonText: '解锁第2级科学',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 500
        },
        newTechs: ['unlockLabT3']
    });

    instance.unlockLabT3 = $.extend({}, techBase, {
        name: '第3级科学',
        desc: '研究这个将允许您访问第三个科学制作，创造比以前的层次更多的科学。',
        buttonText: '解锁第3级科学',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 3000
        },
        newTechs: ['unlockLabT4']
    });

    instance.unlockLabT4 = $.extend({}, techBase, {
        name: '第4级科学',
        desc: '研究这个将使您能够访问第四个科学制作，创造出与上一级相当于科学的10倍。',
        buttonText: '解锁第4级科学',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 50000000
        }
    });

    instance.unlockBatteries = $.extend({}, techBase, {
        name: '第1级电池',
        desc: '第1级电池可以提高您可以一次存储的能量。',
        buttonText: '解锁电池。',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 15000
        },
        newResources: ['batteries', 'energyStorageBox'],
        newTechs: ['unlockBatteriesT2'],
        tabAlerts: ['resources']
    });

    instance.unlockBatteriesT2 = $.extend({}, techBase, {
        name: '第2级电池',
        desc: '第2级电池可以提高您可以一次存储的能量。',
        buttonText: '解锁第2级电池。',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 300000
        },
        newResources: ['batteriesT2'],
        newTechs: ['unlockBatteriesT3'],
        tabAlerts: ['resources']
    });

    instance.unlockBatteriesT3 = $.extend({}, techBase, {
        name: '第3级电池',
        desc: '第3级电池可以提高您可以一次存储的能量。',
        buttonText: '解锁第3级电池。',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 3000000
        },
        newResources: ['batteriesT3'],
        newTechs: ['unlockBatteriesT4'],
        tabAlerts: ['resources']
    });

    instance.unlockBatteriesT4 = $.extend({}, techBase, {
        name: '第4级电池',
        desc: '第4级电池可以提高您可以一次存储的能量。',
        buttonText: '解锁第4级电池。',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 30000000
        },
        newResources: ['batteriesT4'],
        tabAlerts: ['resources']
    });

    instance.unlockPlasma = $.extend({}, techBase, {
        name: '等离子1级技术',
        desc: '这使您能够将能量和氢气转化为等离子体',
        buttonText: '解锁等离子',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 40000
        },
        newResources: ['plasmaNav'],
        newTechs: ['unlockPlasmaTier2'],
        tabAlerts: ['resources'],
        onApply: function() {
            if (noBorder.indexOf('energyNav') === INDEX_NONE) {
                noBorder.push('energyNav');
            }
        }
    });

    instance.unlockPlasmaTier2 = $.extend({}, techBase, {
        name: '等离子2级技术',
        desc: '这项研究打开了等离子体生产的第二个等离子体坑',
        buttonText: '解锁等离子2级技术',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 60000
        },
        newResources: ['plasmaTier2'],
        tabAlerts: ['resources']
    });

    instance.unlockPSU = $.extend({}, techBase, {
        name: '等离子存储单元',
        desc: '等离子存储单元增加了您可以一次存储的等离子体的上限。',
        buttonText: '解锁等离子存储单元',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 9500000
        },
        newResources: ['plasmaStorageUnits', 'plasmaStorageBox'],
        newTechs: ['unlockPSUT2'],
        tabAlerts: ['resources']
    });

    instance.unlockPSUT2 = $.extend({}, techBase, {
        name: '第2等离子体存储单元',
        desc: '第2等离子体存储单元在存储等离子体方面更有效率，但是它们显着更大，需要更多的资源来制造。',
        buttonText: '解锁等离子体存储单元',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 37000000
        },
        newResources: ['plasmaStorageUnitsT2'],
        tabAlerts: ['resources']
    });

    instance.unlockEmc = $.extend({}, techBase, {
        name: '能量转换',
        desc: '这种电源技术不仅可以让您创建现有的资源，还可以让您创建新的，唯一可创建的元素，如陨石。',
        buttonText: '解锁能量转换',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 60000
        },
        newResources: ['emcPage'],
        newTechs: ['unlockMeteorite'],
        tabAlerts: ['solCenter']
    });

    instance.unlockMeteorite = $.extend({}, techBase, {
        name: '陨石',
        desc: '陨石是银河系中罕见的资源之一，因为它是人造的。 所有曾经存在于Kuiper带的陨石，以及其他太阳系中类似的小行星都已被开采。 现在，唯一的办法就是把它从能源中拿到机器上。',
        buttonText: '解锁陨石',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 100000
        },
        newResources: ['meteoriteNav', 'meteoriteEMC'],
        newTechs: ['unlockMeteoriteTier1'],
        tabAlerts: ['resources', 'wonder']
    });

    instance.unlockMeteoriteTier1 = $.extend({}, techBase, {
        name: '第1陨石',
        desc: '研究一种自动化的方式来收集陨石，这样你就不用担心当你不在身边时就会失败。',
        buttonText: '解锁第1陨石',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 75000
        },
        newResources: ['meteoriteTier1'],
        newTechs: ['unlockMeteoriteTier2'],
        tabAlerts: ['resources']

    });

    instance.unlockMeteoriteTier2 = $.extend({}, techBase, {
        name: '第2陨石',
        desc: '研究获得的陨石是人为地创造它的一个更有效的方法。',
        buttonText: '解锁第2陨石',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 75000
        },
        newResources: ['meteoriteTier2'],
        tabAlerts: ['resources']
    });

    instance.unlockDyson = $.extend({}, techBase, {
        name: '戴森环',
        desc: '戴森环在太阳能站周围的太阳周围产生巨大的能量。',
        buttonText: '解锁戴森环',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 100000
        },
        newResources: ['dysonPage'],
        newTechs: ['unlockDysonSphere'],
        tabAlerts: ['solCenter']
    });

    instance.unlockDysonSphere = $.extend({}, techBase, {
        name: '戴森群和球体',
        desc: '戴森成群封装太阳能站的环太阳，而球体完全包围它可以让您利用足够的能量去星际。',
        buttonText: '解锁戴森群和球体',
        type: TECH_TYPE.UNLOCK,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 500000
        },
        newResources: ['dysonSphere'],
        tabAlerts: ['solCenter']
    });

    //Upgrades

    instance.upgradeResourceTech = $.extend({}, techBase, {
        name: '升级资源技术',
        desc: '使您的资源机器产生比以前更多的资源。 这种升级将为每个能源单位生产的数量翻倍。',
        buttonText: '升级资源技术',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 300
        },
        tabAlerts: ['resources'],
        onApply: function() {
            pumpjackOutput *= 2;
            heavyDrillOutput *= 2;
            advancedDrillOutput *= 2;
            furnaceWoodInput *= 2;
            furnaceOutput *= 2;
            laserCutterOutput *= 2;
        }
    });

    instance.upgradeEngineTech = $.extend({}, techBase, {
        name: '升级引擎技术',
        desc: '升级发动机技术将使木炭发动机每秒产生4次能量而不是2次。',
        buttonText: '升级木炭发动机',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 1000
        },
        tabAlerts: ['resources'],
        onApply: function() {
            charcoalEngineOutput = 4;
        }
    });

    instance.upgradeSolarTech = $.extend({}, techBase, {
        name: '升级太阳能科技',
        desc: '升级太阳能技术将使太阳能电池板每秒产生3次能量，而不是1.5次。',
        buttonText: '升级太阳能电池板',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        cost: {
            'science': 5000
        },
        newTechs: ['unlockBatteries'],
        tabAlerts: ['resources'],
        onApply: function() {
            solarPanelOutput = 3;
        }
    });

    instance.efficiencyResearch = $.extend({}, techBase, {
        name: '研究资源效率',
        desc: '资源效率将资源收入增加1％/秒。',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        maxLevel: -1,
        cost: {
            'science': 100000
        }
    });

    instance.scienceEfficiencyResearch = $.extend({}, techBase, {
        name: '研究科学效率',
        desc: '科学效率使科学产量每增加2％。',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        maxLevel: -1,
        cost: {
            'science': 10000000
        }
    });

    instance.energyEfficiencyResearch = $.extend({}, techBase, {
        name: '研究能源效率',
        desc: '能源效率将所有机器的能耗降低1％/秒。',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        maxLevel: 25,
        cost: {
            'science': 10000000
        }
    });

    instance.batteryEfficiencyResearch = $.extend({}, techBase, {
        name: '研究电池效率',
        desc: '电池效率提高了电池的存储能力，每升级升级1％。',
        type: TECH_TYPE.UPGRADE,
        costType: COST_TYPE.FIXED,
        maxLevel: 200,
        cost: {
            'science': 100000000
        }
    });

    return instance;
}());
