Game.resourceCategoryData = (function () {

    var instance = {};

    instance.energy = {
        title: '能源',
        category: 'energy'
    };

    instance.earth = {
        class: 'collapseEarth',
        title: '地球资源',
        category: 'earth'
    };

    instance.innerSol = {
        class: 'collapseInnerPlanetary',
        title: '内行星资源',
        category: 'innerSol'
    };

    instance.outerSol = {
        class: 'collapseOuterPlanetary',
        title: '外行星资源',
        category: 'outerSol'
    };

    return instance;

}());

Game.resourceData = (function () {

    var instance = {};


    /*********************
     * Energy Resources  *
     *********************/

    instance.energy = {
        name: 'Energy',
        desc: '能源是由诸如蒸汽机，太阳能发电等电源创造的，甚至可以融合能源和核能。 您可以开始的最大限度是100,000能量，但是电池可以解锁，这可以增加这一点。',
        icon: 'energyIcon',
        category: 'energy',
        baseCapacity: 50000,
        unlocked: false
    };

    instance.plasma = {
        name: '等离子体',
        desc: '等离子体是物质的第四种状态，被第四层机器和大型空间结构用作贵公司的极限电源。',
        icon: 'plasmaIcon',
        category: 'energy',
        baseCapacity: 50,
        unlocked: false
    };

    instance.uranium = {
        name: 'Uranium',
        desc: '金属是主要资源之一。 它用于许多事情，包括存储升级，机器和大部分太空的东西。',
        icon: 'uraniumIcon',
        category: 'energy',
        baseCapacity: 50,
        unlocked: false
    };

    instance.lava = {
        name: 'Lava',
        desc: '难以处理，仅在火山中发现，熔岩是获得最难的资源之一。',
        icon: 'lavaIcon',
        category: 'energy',
        baseCapacity: 50,
        unlocked: false
    };

    /********************
     * Earth Resources  *
     ********************/

    instance.oil = {
        name: '石油',
        desc: '石油从地上抽出来，用于构建二级资源采集器。',
        icon: 'oilIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: false
    };

    instance.metal = {
        name: '金属',
        desc: 'Metal is one of the primary resources. It is used for many things, including storage upgrades, machinery and most things in space.',
        icon: 'metalIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: true
    };

    instance.gem = {
        name: '宝石',
        desc: 'Gems are one of the primary resources. They are used for advanced machines and for powerful tools and components. They are more useful in later game.',
        icon: 'gemIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: true
    };

    instance.charcoal = {
        name: 'Charcoal',
        desc: 'Charcoal is a secondary tier resource and is used by Engines to produce power for your company. 1 Charcoal is created by burning wood',
        icon: 'charcoalIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: false
    };

    instance.wood = {
        name: 'Wood',
        desc: 'Wood is one of the primary resources. It is used more often in early game for tools and buildings.',
        icon: 'woodIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: true
    };

    instance.silicon = {
        name: 'Silicon',
        desc: 'Silicon is useful for automatic mining systems of the third tier. These will be very useful in building your first wonder. Despite being a high tier resource, it is found mainly on Earth by heating sand.',
        icon: 'siliconIcon',
        category: 'earth',
        baseCapacity: 50,
        unlocked: false
    };


    /******************************
     * Inner Planetary Resources  *
     ******************************/

    instance.lunarite = {
        name: '月岩',
        desc: '月球上发现月岩，是地球上罕见的罕见资源。 它比普通金属强得多，但要难得多。',
        icon: 'lunariteIcon',
        category: 'innerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.methane = {
        name: 'Methane',
        desc: 'Methane is a gas found in abundance on Venus. It can be used to power your company much more effectively than solid fuel.',
        icon: 'methaneIcon',
        category: 'innerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.titanium = {
        name: 'Titanium',
        desc: 'Titanium is a metal found mostly on Mars. It is used for building strong machines and methane power plants.',
        icon: 'titaniumIcon',
        category: 'innerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.gold = {
        name: '黄金',
        desc: '金是在小行星内发现的金属。 它用于构建一些奇迹和复杂的机器。',
        icon: 'goldIcon',
        category: 'innerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.silver = {
        name: 'Silver',
        desc: 'Silver is another metal most commonly found in the asteroid belt.',
        icon: 'silverIcon',
        category: 'innerSol',
        baseCapacity: 50,
        unlocked: false
    };

    /******************************
     * Outer Planetary Resources  *
     ******************************/

    instance.hydrogen = {
        name: '氢气',
        desc: '氢气是对天然气巨头，如木星和土星非常普遍。',
        icon: 'hydrogenIcon',
        category: 'outerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.helium = {
        name: '氦气',
        desc: '氦气是天然气巨头如木星和土星的第二大常见元素。',
        icon: 'heliumIcon',
        category: 'outerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.ice = {
        name: '冰',
        desc: '冰虽然可以在地球上被收集，但是与飞往冥王星和用太空飞船返回的东西相比，还不如利润丰厚。 主要用于4级机器所需的超级冷却技术。',
        icon: 'iceIcon',
        category: 'outerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.meteorite = {
        name: '陨石',
        desc: '创造陨石只能从比地球技术创造的更纯粹的能源形式。 因此，等离子体是必不可少的资源。',
        icon: 'meteoriteIcon',
        category: 'outerSol',
        baseCapacity: 50,
        unlocked: false
    };

    instance.science = {
        name: '科学生产',
        desc: '科学被用于研究新技术来推动你在游戏中的进步。',
        icon: 'scienceIcon',
        baseCapacity: 1000000,
        unlocked: false
    };

    return instance;
}());

Game.storageData = (function(){

    var instance = {};

    // Storage Upgrades
    var baseUpgradeData = {
        name: 'Storage Upgrade:',
        unlocked: true,
        costType: COST_TYPE.FIXED,
        current: 0,
        maxLevel: -1,
        resource: undefined,
        displayNeedsUpdate: true,

        buttonText: 'Upgrade Storage',


        apply: function (self) {
            if (typeof self.resource === 'undefined') {
                return;
            }
            var res = Game.resources.getResourceData(self.resource);
            res.capacity *= 2;
            res.displayNeedsUpdate = true;
            self.displayNeedsUpdate = true;
        },
    };

    /*********************
     * Energy Resources  *
     *********************/

    instance.storageUpgradePlasma = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Plasma storage size to ',
        resource: 'plasma',
        cost: {
            'plasma': 50
        }
    });

    instance.storageUpgradeUranium = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Uranium storage size to ',
        resource: 'uranium',
        cost: {
            'uranium': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeLava = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Lava storage size to ',
        resource: 'lava',
        cost: {
            'lava': 50,
            'lunarite': 20
        }
    });

    /********************
     * Earth Resources  *
     ********************/

    instance.storageUpgradeOil = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Oil storage size to ',
        resource: 'oil',
        cost: {
            'oil': 50,
            'metal': 20
        }
    });

    instance.storageUpgradeMetal = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Metal storage size to ',
        resource: 'metal',
        cost: {
            'metal': 50
        }
    });

    instance.storageUpgradeGem = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Gem storage size to ',
        resource: 'gem',
        cost: {
            'gem': 50,
            'metal': 20
        }
    });

    instance.storageUpgradeCharcoal = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Charcoal storage size to ',
        resource: 'charcoal',
        cost: {
            'charcoal': 50,
            'metal': 20
        }
    });

    instance.storageUpgradeWood = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Wood storage size to ',
        resource: 'wood',
        cost: {
            'wood': 50,
            'metal': 20
        }
    });

    instance.storageUpgradeSilicon = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Silicon storage size to ',
        resource: 'silicon',
        cost: {
            'silicon': 50,
            'lunarite': 20
        }
    });

    /******************************
     * Inner Planetary Resources  *
     ******************************/

    instance.storageUpgradeLunarite = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Lunarite storage size to ',
        resource: 'lunarite',
        cost: {
            'lunarite': 50,
            'metal': 400
        }
    });

    instance.storageUpgradeMethane = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Methane storage size to ',
        resource: 'methane',
        cost: {
            'methane': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeTitanium = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Titanium storage size to ',
        resource: 'titanium',
        cost: {
            'titanium': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeGold = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Gold storage size to ',
        resource: 'gold',
        cost: {
            'gold': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeSilver = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Silver storage size to ',
        resource: 'silver',
        cost: {
            'silver': 50,
            'lunarite': 20
        }
    });

    /******************************
     * Outer Planetary Resources  *
     ******************************/

    instance.storageUpgradeHydrogen = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Hydrogen storage size to ',
        resource: 'hydrogen',
        cost: {
            'hydrogen': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeHelium = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Helium storage size to ',
        resource: 'helium',
        cost: {
            'helium': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeIce = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Ice storage size to ',
        resource: 'ice',
        cost: {
            'ice': 50,
            'lunarite': 20
        }
    });

    instance.storageUpgradeMeteorite = $.extend({}, baseUpgradeData, {
        desc: 'Upgrade your Meteorite storage size to ',
        resource: 'meteorite',
        cost: {
            'meteorite': 50,
            'lunarite': 4
        }
    });

    return instance;
}());