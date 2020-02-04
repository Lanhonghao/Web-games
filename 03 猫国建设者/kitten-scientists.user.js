// ==UserScript==
// @name        Kitten Scientists
// @namespace   http://www.reddit.com/r/kittensgame/comments/34gb2u/kitten_scientists_automation_script/
// @description Launch Kitten Scientists
// @include     *bloodrizer.ru/games/kittens/*
// @include     file:///*kitten-game*
// @version     1.3.3
// @grant       none
// @copyright   2015, cameroncondry
// ==/UserScript==

// ==========================================
// Begin Kitten Scientist's Automation Engine
// ==========================================

var version = '小猫科学家 版本 1.3.3';
var address = '19ZBVyaXQhikcuUszY2MVRb1MGL2YqicDX';

// Game will be referenced in loadTest function
var game = null;

var run = function() {

    var options = {
        // When debug is enabled, messages that go to the game log are also logged using window.console.
        debug: false,

        // The interval at which the internal processing loop is run, in milliseconds.
        interval: 2000,

        // The default color for KS messages in the game log (like enabling and disabling items).
        msgcolor: '#aa50fe', // dark purple
        // The color for activity summaries.
        summarycolor: '#009933', // light green
        // The color for log messages that are about activities (like festivals and star observations).
        activitycolor: '#E65C00', // orange
        // The color for resources with stock counts higher than current resource max
        stockwarncolor: '#DD1E00',

        // Should activity be logged to the game log?
        showactivity: true,

        // The default consume rate.
        consume: 0.6,

        // How many messages to keep in the game log.
        logMessages:   100,

        // The default settings for game automation.
        auto: {
            // Settings related to KS itself.
            engine: {
                // Should any automation run at all?
                enabled: false
            },
            crypto: {
                // Should crypto exchange be automated?
                enabled: true,
                // At what percentage of the relic storage capacity should KS exchange?
                trigger: 10000
            },
			explore: {
				// Should exploring be automated?
                enabled: false,
			},
			autofeed: {
				// Should feeding elders be automated?
                enabled: true,
            },
            faith: {
                // Should praising be automated?
                enabled: true,
                // At what percentage of the faith storage capacity should KS praise the sun?
                trigger: 0.99,
                // Which religious upgrades should be researched?
                items: {
                    // Variant denotes which category the building or upgrade falls within in the Religion tab.
                    // Ziggurats are variant z.
                    unicornTomb:        {require: false,         enabled: false, variant: 'z'},
                    ivoryTower:         {require: false,         enabled: false, variant: 'z'},
                    ivoryCitadel:       {require: false,         enabled: false, variant: 'z'},
                    skyPalace:          {require: false,         enabled: false, variant: 'z'},
                    unicornUtopia:      {require: 'gold',        enabled: false, variant: 'z'},
                    sunspire:           {require: 'gold',        enabled: false, variant: 'z'},
                    marker:             {require: 'unobtainium', enabled: false, variant: 'z'},
                    unicornGraveyard:   {require: false,         enabled: false, variant: 'z'},
                    unicornNecropolis:  {require: false,         enabled: false, variant: 'z'},
                    blackPyramid:       {require: 'unobtainium', enabled: false, variant: 'z'},
                    // Order of the Sun is variant s.
                    solarchant:         {require: 'faith',       enabled: true,  variant: 's'},
                    scholasticism:      {require: 'faith',       enabled: true,  variant: 's'},
                    goldenSpire:        {require: 'faith',       enabled: true,  variant: 's'},
                    sunAltar:           {require: 'faith',       enabled: true,  variant: 's'},
                    stainedGlass:       {require: 'faith',       enabled: true,  variant: 's'},
                    solarRevolution:    {require: 'faith',       enabled: true,  variant: 's'},
                    basilica:           {require: 'faith',       enabled: true,  variant: 's'},
                    templars:           {require: 'faith',       enabled: true,  variant: 's'},
                    apocripha:          {require: 'faith',       enabled: false, variant: 's'},
                    transcendence:      {require: 'faith',       enabled: true,  variant: 's'},
                    // Cryptotheology is variant c.
                    blackObelisk:       {require: false,         enabled: false, variant: 'c'},
                    blackNexus:         {require: false,         enabled: false, variant: 'c'},
                    blackCore:          {require: false,         enabled: false, variant: 'c'},
                    singularity:        {require: false,         enabled: false, variant: 'c'},
                    blackLibrary:       {require: false,         enabled: false, variant: 'c'},
                    blackRadiance:      {require: false,         enabled: false, variant: 'c'},
                    blazar:             {require: false,         enabled: false, variant: 'c'},
                    darkNova:           {require: false,         enabled: false, variant: 'c'},
                    holyGenocide:       {require: false,         enabled: false, variant: 'c'},
                }
            },
            festival: {
                // Should festivals be held automatically?
                enabled: true
            },
            hunt: {
                // Should hunters be sent on hunts automatically?
                enabled: true,
                // At what percentage of the catpower storage capacity should KS send hunters on hunts?
                trigger: 0.6
            },
            build: {
                // Should buildings be built automatically?
                enabled: true,
                // When a building requires a certain resource (this is what their *require* property refers to), then
                // this is the percentage of the storage capacity of that resource, that has to be met for the building
                // to be built.
                trigger: 0.75,
                // The items that be automatically built.
                // Every item can define a required resource. This resource has to be available at a certain capacity for
                // the building to be built. The capacity requirement is defined by the trigger value set for the section.
                //
                // Additionally, for upgradeable buildings, the item can define which upgrade stage it refers to.
                // For upgraded buildings, the ID (or internal name) of the building can be controlled through the *name*
                // property. For other buildings, the key of the item itself is used.
                items: {
                    // housing
                    hut:            {require: 'wood',        enabled: false},
                    logHouse:       {require: 'minerals',    enabled: false},
                    mansion:        {require: 'titanium',    enabled: false},

                    // craft bonuses
                    workshop:       {require: 'minerals',    enabled: true},
                    factory:        {require: 'titanium',    enabled: true},

                    // production
                    field:          {require: 'catnip',      enabled: true},
                    pasture:        {require: 'catnip',      enabled: true, stage: 0},
                    solarFarm:      {require: 'titanium',    enabled: true, stage: 1, name: 'pasture'},
                    mine:           {require: 'wood',        enabled: true},
                    lumberMill:     {require: 'minerals',    enabled: true},
                    aqueduct:       {require: 'minerals',    enabled: true, stage: 0},
                    hydroPlant:     {require: 'titanium',    enabled: true, stage: 1, name: 'aqueduct'},
                    oilWell:        {require: 'coal',        enabled: true},
                    quarry:         {require: 'coal',        enabled: true},

                    // conversion
                    smelter:        {require: 'minerals',    enabled: true},
                    biolab:         {require: 'science',     enabled: false},
                    calciner:       {require: 'titanium',    enabled: false},
                    reactor:        {require: 'titanium',    enabled: false},
                    accelerator:    {require: 'titanium',    enabled: false},
                    steamworks:     {require: false,         enabled: false},
                    magneto:        {require: false,         enabled: false},

                    // science
                    library:        {require: 'wood',        enabled: true, stage: 0},
                    dataCenter:     {require: false,         enabled: true, stage: 1, name: 'library'},
                    academy:        {require: 'wood',        enabled: true},
                    observatory:    {require: 'iron',        enabled: true},

                    // other
                    amphitheatre:   {require: 'minerals',    enabled: true, stage: 0},
                    broadcastTower: {require: 'titanium',    enabled: true, stage: 1, name: 'amphitheatre'},
                    tradepost:      {require: 'gold',        enabled: true},
                    chapel:         {require: 'minerals',    enabled: true},
                    temple:         {require: 'gold',        enabled: true},
                    mint:           {require: false,         enabled: false},
                    unicornPasture: {require: false,         enabled: true},
                    ziggurat:       {require: false,         enabled: true},
                    chronosphere:   {require: 'unobtainium', enabled: true},
                    aiCore:         {require: false,         enabled: false},

                    // storage
                    barn:           {require: 'wood',        enabled: true},
                    harbor:         {require: false,         enabled: false},
                    warehouse:      {require: false,         enabled: false}
                }
            },
            space: {
                // Should space buildings be built automatically?
                enabled: false,
                // The functionality of the space section is identical to the build section. It just needs to be treated
                // seperately, because the game internals are slightly different.
                trigger: 0.95,
                items: {
                    // Cath
                    spaceElevator:  {require: 'unobtainium', enabled: false},
                    sattelite:      {require: 'titanium',    enabled: false},
                    spaceStation:   {require: 'oil',         enabled: false},

                    // Moon
                    moonOutpost:    {require: 'uranium',     enabled: false},
                    moonBase:       {require: 'unobtainium', enabled: false},

                    // Dune
                    planetCracker:  {require: 'science',     enabled: false},
                    hydrofracturer: {require: 'science',     enabled: false},
                    spiceRefinery:  {require: 'science',     enabled: false},

                    // Piscine
                    researchVessel: {require: 'titanium',    enabled: false},
                    orbitalArray:   {require: 'eludium',     enabled: false},

                    // Helios
                    sunlifter:          {require: 'eludium', enabled: false},
                    containmentChamber: {require: 'science', enabled: false},
                    heatsink:           {require: 'thorium', enabled: false},
                    sunforge:           {require: false,     enabled: false},

                    // T-Minus
                    cryostation:    {require: 'eludium',     enabled: false},

                    // Kairo
                    spaceBeacon:    {require: 'antimatter',  enabled: false},

                    // Yarn
                    terraformingStation: {require: 'antimatter',  enabled: false},
                    hydroponics:         {require: 'kerosene',    enabled: false},

                    // Umbra
                    hrHarvester:    {require: 'antimatter',  enabled: false},

                    // Charon
                    entangler:    {require: 'antimatter',  enabled: false},

                    // Centaurus
                    tectonic:   {require: 'antimatter', enabled: false},
                    moltenCore: {require: 'uranium',    enabled: false}
                }
            },
            time: {
                // Should time upgrades be built automatically?
                enabled: false,
                trigger: 0.95,
                items: {
                    // Variants denote whether these buildings fall within the Chronoforge or Void categories.
                    // Chronoforge has variant chrono.
                    temporalBattery:     {require: false,          enabled: false, variant: 'chrono'},
                    blastFurnace:        {require: false,          enabled: false, variant: 'chrono'},
                    temporalAccelerator: {require: false,          enabled: false, variant: 'chrono'},
                    temporalImpedance:   {require: false,          enabled: false, variant: 'chrono'},
                    ressourceRetrieval:  {require: false,          enabled: false, variant: 'chrono'},
                    
                    // Void Space has variant void.
                    cryochambers:        {require: false,          enabled: false, variant: 'void'},
                    voidHoover:          {require: 'antimatter',   enabled: false, variant: 'void'},
                    voidRift:            {require: false,          enabled: false, variant: 'void'},
                    chronocontrol:       {require: 'temporalFlux', enabled: false, variant: 'void'},
                    voidResonator:       {require: false,          enabled: false, variant: 'void'}
                }
            },
            craft: {
               //资源是否自动制作？
                enabled: true,
                //每个项目都可以使用* require *属性定义所需的资源。
                 //应该列出所需资源的存储容量的百分比？
                trigger: 0.95,
                //可以制作的物品
                 //除上述* require *属性之外，项目还可以定义一个* max *。 如果他们
                 //做，没有更多的资源将被自动生成。 此功能无法通过控制
                 // UI，默认情况下不用于任何资源。
                 // *有限*属性告诉KS只能每季度制作资源一次。
                // to the number of stored components is greater than the limit ratio "limRat".
                // This means that if limRat is 0.5, then if you have 1000 beams and 500 beams worth of scaffolds, 250 of the beams
                // will be crafted into scaffolds. If instead limRat is 0.75, 625 of the beams will be crafted into scaffolds for a final result
                // of 1125 beams-worth of scaffolds and 375 remaining beams.
                // Currently, limRat is not modifiable through the UI, though if there is demand, perhaps this will be added in the future.
                items: {
                    wood:       {require: 'catnip',      max: 0, limited: false, limRat: 0.5, enabled: true},
                    beam:       {require: 'wood',        max: 0, limited: false, limRat: 0.5, enabled: true},
                    slab:       {require: 'minerals',    max: 0, limited: false, limRat: 0.5, enabled: true},
                    steel:      {require: 'coal',        max: 0, limited: false, limRat: 0.5, enabled: true},
                    plate:      {require: 'iron',        max: 0, limited: false, limRat: 0.5, enabled: true},
                    alloy:      {require: 'titanium',    max: 0, limited: true,  limRat: 0.5, enabled: false},
                    concrete:   {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    gear:       {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    scaffold:   {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    ship:       {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    tanker:     {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    parchment:  {require: false,         max: 0, limited: false, limRat: 0.5, enabled: true},
                    manuscript: {require: 'culture',     max: 0, limited: true,  limRat: 0.5, enabled: true},
                    compendium: {require: 'science',     max: 0, limited: true,  limRat: 0.5, enabled: true},
                    blueprint:  {require: 'science',     max: 0, limited: true,  limRat: 0.5, enabled: false},
                    kerosene:   {require: 'oil',         max: 0, limited: false, limRat: 0.5, enabled: false},
                    megalith:   {require: false,         max: 0, limited: true,  limRat: 0.5, enabled: false},
                    eludium:    {require: 'unobtainium', max: 0, limited: false, limRat: 0.5, enabled: false},
                    thorium:    {require: 'uranium',     max: 0, limited: false, limRat: 0.5, enabled: false}
                }
            },
            trade: {
                // Should KS automatically trade?
                enabled: true,
                // Every trade can define a required resource with the *require* property.
                // At what percentage of the storage capacity of that required resource should the trade happen?
                trigger: 0.95,
                // Trades can be limited to only happen during specific seasons. This is because trades with certain races
                // are more effective during specific seasons.
                // The *allowcapped* property allows us to trade even if the sold resources are at their cap.
                items: {
                    dragons:    {enabled: false,  require: 'titanium',    allowcapped: false,
                        summer:  true,  autumn:  true,  winter:  true,          spring:      true},

                    zebras:     {enabled: true,  require: false,         allowcapped: false,
                        summer:  true,  autumn:  true,  winter:  true,          spring:      true},

                    lizards:    {enabled: false,  require: 'minerals',    allowcapped: false,
                        summer:  true,  autumn:  false, winter:  false,         spring:      false},

                    sharks:     {enabled: false,  require: 'iron',        allowcapped: false,
                        summer:  false, autumn:  false, winter:  true,          spring:      false},

                    griffins:   {enabled: false,  require: 'wood',        allowcapped: false,
                        summer:  false, autumn:  true,  winter:  false,         spring:      false},

                    nagas:      {enabled: false,  require: false,         allowcapped: false,
                        summer:  false, autumn:  false, winter:  false,         spring:      true},

                    spiders:    {enabled: false,  require: false,         allowcapped: false,
                        summer:  false, autumn:  true,  winter:  false,         spring:      false},

                    leviathans: {enabled: false,  require: 'unobtainium', allowcapped: true,
                        summer:  true,  autumn:  true,  winter:  true,          spring:      true}
                }
            },
            upgrade: {
                //Should KS automatically upgrade?
                enabled: false,
                items: {
                    upgrades:  {enabled: false},
                    techs:     {enabled: false},
                    buildings: {enabled: false}
                }
            },
            resources: {
                furs:        {stock: 1000},
                unobtainium: {consume: 1.0}
            }
        }
    };

    // GameLog Modification
    // ====================

    // Increase messages displayed in log
    game.console.maxMessages = 1000;

    var printoutput = function (args) {
        var color = args.pop();
        args[1] = args[1] || 'ks-default';

        // update the color of the message immediately after adding
        var msg = game.msg.apply(game, args);
        $(msg.span).css('color', color);

        if (options.debug && console) console.log(args);
    };

    // Used for option change messages and other special notifications
    var message = function () {
        var args = Array.prototype.slice.call(arguments);
        args.push('ks-default');
        args.push(options.msgcolor);
        printoutput(args);
    };

    var activity = function () {
        if (options.showactivity) {
            var args = Array.prototype.slice.call(arguments);
            var activityClass = args.length > 1 ? ' type_' + args.pop() : '';
            args.push('ks-activity' + activityClass);
            args.push(options.activitycolor);
            printoutput(args);
        }
    };

    var summary = function () {
        var args = Array.prototype.slice.call(arguments);
        args.push('ks-summary');
        args.push(options.summarycolor);
        printoutput(args);
    };

    var warning = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('Warning!');

        if (console) console.log(args);
    };

    // Core Engine for Kitten Scientists
    // =================================

    var Engine = function () {
        this.upgradeManager = new UpgradeManager();
        this.buildManager = new BuildManager();
        this.spaceManager = new SpaceManager();
        this.craftManager = new CraftManager();
        this.tradeManager = new TradeManager();
        this.religionManager = new ReligionManager();
        this.timeManager = new TimeManager();
        this.explorationManager = new ExplorationManager();
        // this.autofeedManager = new AutofeedManager();
        this.villageManager = new TabManager('Village');
    };

    Engine.prototype = {
        upgradeManager: undefined,
        buildManager: undefined,
        spaceManager: undefined,
        craftManager: undefined,
        tradeManager: undefined,
        religionManager: undefined,
        timeManager: undefined,
        explorationManager: undefined,
        // autofeedManager: undefined,
        villageManager: undefined,
        loop: undefined,
        start: function () {
            if (this.loop) return;

            this.loop = setInterval(this.iterate.bind(this), options.interval);
            message('启用猫咪科学家!');
        },
        stop: function () {
            if (!this.loop) return;

            clearInterval(this.loop);
            this.loop = undefined;
            message('禁用猫咪科学家!');
        },
        iterate: function () {
            this.observeStars();
            if (options.auto.upgrade.enabled) this.upgrade();
            if (options.auto.festival.enabled) this.holdFestival();
            if (options.auto.build.enabled) this.build();
            if (options.auto.space.enabled) this.space();
            if (options.auto.craft.enabled) this.craft();
            if (options.auto.trade.enabled) this.trade();
            if (options.auto.hunt.enabled) this.hunt();
            if (options.auto.faith.enabled) this.worship();
            if (options.auto.time.enabled) this.chrono();
            if (options.auto.crypto.enabled) this.crypto();
            if (options.auto.explore.enabled) this.explore();
            if (options.auto.autofeed.enabled) this.autofeed();
        },
        autofeed: function(){
        // var manager = this.autofeedManager;
        // Only feed if it's enabled
        if (!options.auto.autofeed.enabled) return;
        if(game.diplomacy.get("leviathans").unlocked && game.resPool.get("necrocorn").value>=1) {
        if(game.diplomacy.get("leviathans").energy<game.religion.getZU("marker").val * 5 + 5) {
        game.diplomacy.feedElders();
        activity('小猫献祭了上古神。 上古神很高兴');
        }}
    },

		crypto: function () {
            var coinPrice = game.calendar.cryptoPrice;
            var previousRelic = game.resPool.get('relic').value;
            var previousCoin = game.resPool.get('blackcoin').value;
            var exchangedCoin = 0.0;
            var exchangedRelic = 0.0;
			var waitForBestPrice = false;

            // Only exchange if it's enabled
            if (!options.auto.crypto.enabled) return;

			// Waits for coin price to drop below a certain treshold before starting the exchange process
			if (waitForBestPrice == true && coinPrice < 860.0) { waitForBestPrice = false; }

			// Exchanges up to a certain threshold, in order to keep a good exchange rate, then waits for a higher treshold before exchanging for relics.
            if (waitForBestPrice == false && coinPrice < 900.0 && previousRelic > options.auto.crypto.trigger) {
                var currentCoin;

                game.diplomacy.buyEcoin();

                currentCoin = game.resPool.get('blackcoin').value;
                exchangedCoin = Math.round(currentCoin - previousCoin);
                activity('小猫出售了圣遗物并购买了 '+ exchangedCoin +' 黑币');
            }
            else if (coinPrice > 1099.9 && game.resPool.get('blackcoin').value > 0) {
                var currentRelic;

				waitForBestPrice = true;

                game.diplomacy.sellEcoin();

                currentRelic = game.resPool.get('blackcoin').value;
                exchangedRelic = Math.round(currentRelic - previousRelic);

                activity('小猫出售了黑币并购买了 '+ exchangedRelic +' 圣遗物');
            }
        },
		explore: function () {
			var manager = this.explorationManager;
			var expeditionNode = game.village.map.expeditionNode;

			// Only exchange if it's enabled
            if (!options.auto.explore.enabled) return;

			if( expeditionNode == null) {
				manager.getCheapestNode();

				manager.explore(manager.cheapestNodeX, manager.cheapestNodeY);

				activity('你的小猫开始探索地图上的节点 '+ manager.cheapestNodeX +'-'+ manager.cheapestNodeY +'.');
			}
		},
        worship: function () {
            var builds = options.auto.faith.items;
            var buildManager = this.religionManager;
            var craftManager = this.craftManager;
            var trigger = options.auto.faith.trigger;

            // Render the tab to make sure that the buttons actually exist in the DOM. Otherwise we can't click them.
            buildManager.manager.render();

            for (var name in builds) {
                if (!builds[name].enabled) continue;

                var build = builds[name];
                var require = !build.require ? false : craftManager.getResource(build.require);

                if (!require || trigger <= require.value / require.maxValue) {
                    buildManager.build(name, build.variant);
                }
            }

            // Praise the sun with any faith left over
            var faith = craftManager.getResource('faith');

            if (options.auto.faith.trigger <= faith.value / faith.maxValue) {
                storeForSummary('faith', faith.value);
                activity('赞美太阳!', 'ks-praise');
                game.religion.praise();
            }
        },
        chrono: function () {
            var builds = options.auto.time.items;
            var buildManager = this.timeManager;
            var craftManager = this.craftManager;
            var trigger = options.auto.time.trigger;
            
            // Render the tab to make sure that the buttons actually exist in the DOM. Otherwise we can't click them.
            buildManager.manager.render();
            
            for (var name in builds) {
                if (!builds[name].enabled) continue;

                var build = builds[name];
                var require = !build.require ? false : craftManager.getResource(build.require);

                if (!require || trigger <= require.value / require.maxValue) {
                    buildManager.build(name, build.variant);
                }
            }
        },
        upgrade: function () {
            var upgrades = options.auto.upgrade.items;
            var upgradeManager = this.upgradeManager;
            var craftManager = this.craftManager;
            
            upgradeManager.workManager.render();
            upgradeManager.sciManager.render();
            
            if (upgrades.upgrades.enabled && gamePage.tabs[3].visible) {
                var work = game.workshop.upgrades;
                workLoop:
                for (var upg in work) {
                    if (work[upg].researched || !work[upg].unlocked) {continue;}
                    
                    var prices = work[upg].prices;
                    for (var resource in prices) {
                        if (craftManager.getValueAvailable(prices[resource].name, true) < prices[resource].val) {continue workLoop;}
                    }
                    upgradeManager.build(work[upg], 'workshop');
                }
            }
            
            if(upgrades.techs.enabled && gamePage.tabs[2].visible) {
                var tech = game.science.techs;
                techLoop:
                for (var upg in tech) {
                    if (tech[upg].researched || !tech[upg].unlocked) {continue;}
                    
                    var prices = tech[upg].prices;
                    for (var resource in prices) {
                        if (craftManager.getValueAvailable(prices[resource].name, true) < prices[resource].val) {continue techLoop;}
                    }
                    upgradeManager.build(tech[upg], 'science');
                }
            }
            
            if (upgrades.buildings.enabled) {
                var pastureMeta = game.bld.getBuildingExt('pasture').meta;
                if (pastureMeta.stage === 0) {
                    if (pastureMeta.stages[1].stageUnlocked) {
                        pastureMeta.on = 0;
                        pastureMeta.val = 0;
                        pastureMeta.stage = 1;
                        game.render();
                        activity('将牧场升级为太阳能农场！', 'ks-upgrade');
                    }
                }
                
                var aqueductMeta = game.bld.getBuildingExt('aqueduct').meta;
                if (aqueductMeta.stage === 0) {
                    if (aqueductMeta.stages[1].stageUnlocked) {
                        aqueductMeta.on = 0
                        aqueductMeta.val = 0
                        aqueductMeta.stage = 1
                        aqueductMeta.calculateEffects(aqueductMeta, game)
                        game.render()
                        activity('将水渠升级为水电站！', 'ks-upgrade');
                    }
                }
                
                var libraryMeta = game.bld.getBuildingExt('library').meta;
                if (libraryMeta.stage === 0) {
                    if (libraryMeta.stages[1].stageUnlocked) {
                        libraryMeta.on = 0
                        libraryMeta.val = 0
                        libraryMeta.stage = 1
                        libraryMeta.calculateEffects(libraryMeta, game)
                        game.render()
                        activity('将图书馆升级为数据中心！', 'ks-upgrade');
                    }
                    
                }
                
                var amphitheatreMeta = game.bld.getBuildingExt('amphitheatre').meta;
                if (amphitheatreMeta.stage === 0) {
                    if (amphitheatreMeta.stages[1].stageUnlocked) {
                        amphitheatreMeta.on = 0
                        amphitheatreMeta.val = 0
                        amphitheatreMeta.stage = 1
                        game.render()
                        activity('将剧场升级为广播塔！', 'ks-upgrade');
                    }
                }
            }
        },
        build: function () {
            var builds = options.auto.build.items;
            var buildManager = this.buildManager;
            var craftManager = this.craftManager;
            var trigger = options.auto.build.trigger;

            // Render the tab to make sure that the buttons actually exist in the DOM. Otherwise we can't click them.
            buildManager.manager.render();

            // Using labeled for loop to break out of a nested loop
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
            buildLoop:
            for (var name in builds) {
                if (!builds[name].enabled) continue;

                var build = builds[name];
                var require = !build.require ? false : craftManager.getResource(build.require);

                if (!require || trigger <= require.value / require.maxValue) {
                    // verify that the building prices is within the current stock settings
                    var prices = game.bld.getPrices(build.name || name);
                    for (var p = 0; p < prices.length; p++) {
                        if (craftManager.getValueAvailable(prices[p].name, true) < prices[p].val) continue buildLoop;
                    }

                    // If the build overrides the name, use that name instead.
                    // This is usually true for buildings that can be upgraded.
                    buildManager.build(build.name || name, build.stage);
                }
            }
        },
        space: function () {
            var builds = options.auto.space.items;
            var buildManager = this.spaceManager;
            var craftManager = this.craftManager;
            var trigger = options.auto.space.trigger;

            // Render the tab to make sure that the buttons actually exist in the DOM. Otherwise we can't click them.
            buildManager.manager.render();

            for (var name in builds) {
                var build = builds[name];
                var require = !build.require ? false : craftManager.getResource(build.require);

                if (!require || trigger <= require.value / require.maxValue) {
                    buildManager.build(name);
                }
            }
        },
        craft: function () {
            var crafts = options.auto.craft.items;
            var manager = this.craftManager;
            var trigger = options.auto.craft.trigger;

            for (var name in crafts) {
                var craft = crafts[name];
                var current = !craft.max ? false : manager.getResource(name);
                var require = !craft.require ? false : manager.getResource(craft.require);
                var season = game.calendar.season;

                // Ensure that we have reached our cap
                if (current && current.value > craft.max) continue;

                // Craft the resource if we meet the trigger requirement
                if (!require || trigger <= require.value / require.maxValue) {
                    var amount = manager.getLowestCraftAmount(name, craft.limited, craft.limRat);

                    if (amount > 0) {
                        manager.craft(name, amount);
                    }
                }
            }
        },
        holdFestival: function () {
            // Render the tab to make sure that the buttons actually exist in the DOM. Otherwise we can't click them.
            this.villageManager.render();

            if (game.science.get('drama').researched && game.calendar.festivalDays === 0 && game.villageTab.festivalBtn.model.enabled) {
                game.villageTab.festivalBtn.onClick();
                if (game.calendar.festivalDays !== 0) {
                    storeForSummary('festival');
                    activity('小猫开始举办节日', 'ks-festival');
                }
            }
        },
        observeStars: function () {
            if (game.calendar.observeBtn != null){
                game.calendar.observeHandler();
                activity('小猫科学家观察到一颗星星', 'ks-star');
                storeForSummary('stars', 1);
            }
        },
        hunt: function () {
            var catpower = this.craftManager.getResource('catpower');

            if (options.auto.hunt.trigger <= catpower.value / catpower.maxValue && catpower.value >= 100) {
                // No way to send only some hunters. Thus, we hunt with everything
                var hunters = game.village.getJob('hunter').value;
                storeForSummary('hunt', hunters);
                activity('派出 ' + game.getDisplayValueExt(hunters) + ' 波小猫' + (hunters == 1 ? '' : '') + ' 去打猎', 'ks-hunt');
                game.village.huntAll();
            }
        },
        trade: function () {
            var craftManager = this.craftManager;
            var tradeManager = this.tradeManager;
            var gold = craftManager.getResource('gold');
            var trades = [];
            
            tradeManager.manager.render();
            
            // Only trade if it's enabled
            if (!options.auto.trade.enabled) return;

            // Trade when we have enough gold. Don't worry about catpower.
            if (options.auto.trade.trigger >= gold.value / gold.maxValue) return;

            // Determine how many races we will trade this cycle
            for (var name in options.auto.trade.items) {
                var trade = options.auto.trade.items[name];
                var season = game.calendar.getCurSeason().name;

                // Only check if we are in season and enabled
                if (!trade.enabled) continue;
                if (!trade[season]) continue;

                var require = !trade.require ? false : craftManager.getResource(trade.require);
                var requireTrigger = options.auto.trade.trigger;

                // If we have enough to trigger the check, then attempt to trade
                if (!require || requireTrigger <= require.value / require.maxValue) {
                    trades.push(name);
                }
            }

            // Figure out how much we can currently trade
            var maxTrades = tradeManager.getLowestTradeAmount(undefined);

            // Try our best not to starve any single race
            maxTrades = (trades.length > 0) ? Math.floor(maxTrades / trades.length) : 0;

            if (maxTrades < 1) return;

            for (var i in trades) {
                var name = trades[i];
                tradeManager.trade(name, Math.min(tradeManager.getLowestTradeAmount(name), maxTrades));
            }
        }
    };

    // Tab Manager
    // ===========

    var TabManager = function (name) {
        this.setTab(name);
    };

    TabManager.prototype = {
        tab: undefined,
        render: function () {
            if (this.tab && game.ui.activeTabId !== this.tab.tabId) this.tab.render();

            return this;
        },
        setTab: function (name) {
            for (var tab in game.tabs) {
                if (game.tabs[tab].tabId === name) {
                    this.tab = game.tabs[tab];
                    break;
                }
            }

            this.tab ? this.render() : warning('无法找到标签' + name);
        }
    };

	// Exploration Manager
	// ===================

	var ExplorationManager = function () {
		this.manager = new TabManager('Village');
	};

	ExplorationManager.prototype = {
		manager: undefined,
		currentCheapestNode: null,
		currentCheapestNodeValue: null,
		cheapestNodeX: null,
		cheapestNodeY: null,
		explore: function(x, y) {
			game.village.map.expeditionNode = {x, y};
			game.village.map.explore(x, y);
		},
		getCheapestNode: function () {
			var tileArray = game.village.map.villageData;
			var tileKey = "";

			this.currentCheapestNode = null;

			for (var i in tileArray) {
				tileKey = i;

				// Discards locked nodes
				if (i.unlocked == false) { break; }

				// Discards junk nodes
				if(tileKey.includes('-')) { break; }

				// Acquire node coordinates
				var regex = /(\d).(\d*)/g;
				var keyMatch = regex.exec(tileKey);
				var xCoord = parseInt(keyMatch[1]);
				var yCoord = parseInt(keyMatch[2]);

				if(this.currentCheapestNode == null) {
					this.currentCheapestNodeValue = this.getNodeValue(xCoord, yCoord)
					this.currentCheapestNode = i;
					this.cheapestNodeX = xCoord;
					this.cheapestNodeY = yCoord;
				}

				if (this.currentCheapestNode != null && this.getNodeValue(xCoord, yCoord) < this.currentCheapestNodeValue) {
					this.currentCheapestNodeValue = this.getNodeValue(xCoord, yCoord)
					this.currentCheapestNode = i;
					this.cheapestNodeX = xCoord;
					this.cheapestNodeY = yCoord;
				}
			}
		},
		getNodeValue: function (x, y){
			var nodePrice = game.village.map.toLevel(x, y);
			var exploreCost = game.village.map.getExplorationPrice(x,y);

			var tileValue = nodePrice / exploreCost;

			return tileValue;
		}
	};

    // Religion manager
    // ================

    var ReligionManager = function () {
        this.manager = new TabManager('Religion');
        this.crafts = new CraftManager();
    };

    ReligionManager.prototype = {
        manager: undefined,
        crafts: undefined,
        build: function (name, variant) {
            var build = this.getBuild(name, variant);
            var button = this.getBuildButton(name, variant);

            if (!button || !button.model.enabled) return;

            //need to simulate a click so the game updates everything properly
            button.domNode.click(build);
            storeForSummary(name, 1, 'faith');
            if (variant === "s") {
                activity('小猫已经发现了 ' + build.label, 'ks-faith');
            } else {
                activity('小猫建造了一个新的 ' + build.label, 'ks-build');
            }
        },
        getBuild: function (name, variant) {
            switch (variant) {
                case 'z':
                    return game.religion.getZU(name);
                case 's':
                    return game.religion.getRU(name);
                case 'c':
                    return game.religion.getTU(name);
            }
        },
        getBuildButton: function (name, variant) {
            switch (variant) {
                case 'z':
                    var buttons = this.manager.tab.zgUpgradeButtons;
                    break;
                case 's':
                    var buttons = this.manager.tab.rUpgradeButtons;
                    break;
                case 'c':
                    var buttons = this.manager.tab.children[0].children[0].children;
            }
            var build = this.getBuild(name, variant);
            for (var i in buttons) {
                var haystack = buttons[i].model.name;
                if (haystack.indexOf(build.label) !== -1) {
                    return buttons[i];
                }
            }
        }
    };

    // Time manager
    // ============
    
    var TimeManager = function () {
        this.manager = new TabManager('Time');
        this.crafts = new CraftManager();
    };
    
    TimeManager.prototype = {
        manager: undefined,
        crafts: undefined,
        build: function (name, variant) {
            var build = this.getBuild(name, variant);
            var button = this.getBuildButton(name, variant);

            if (!button || !button.model.enabled) return;

            //need to simulate a click so the game updates everything properly
            button.domNode.click(build);
            storeForSummary(name, 1, 'build');

            var label = build.label;
            activity('小猫已经建造了一个新的 ' + label, 'ks-build');
        },
        getBuild: function (name, variant) {
            if (variant === 'chrono') {
                return game.time.getCFU(name);
            } else {
                return game.time.getVSU(name);
            }
        },
        getBuildButton: function (name, variant) {
            if (variant === 'chrono') {
                var buttons = this.manager.tab.children[2].children[0].children;
            } else {
                var buttons = this.manager.tab.children[3].children[0].children;
            }
            var build = this.getBuild(name, variant);
            for (var i in buttons) {
                var haystack = buttons[i].model.name;
                if (haystack.indexOf(build.label) !== -1) {
                    return buttons[i];
                }
            }
        }
    };
    
    // Upgrade manager
    // ============
    
    var UpgradeManager = function () {
        this.workManager = new TabManager('Workshop');
        this.sciManager = new TabManager('Science');
        this.crafts = new CraftManager();
    };
    
    UpgradeManager.prototype = {
        manager: undefined,
        crafts: undefined,
        build: function (upgrade, variant) {
            var button = this.getBuildButton(upgrade, variant);

            if (!button || !button.model.enabled) return;

            //need to simulate a click so the game updates everything properly
            button.domNode.click(upgrade);
            storeForSummary(build.name, 1, 'upgrade');

            var label = upgrade.label;
            activity('小猫已经购买了升级 ' + label, 'ks-upgrade');
        },
        getBuildButton: function (upgrade, variant) {
            if (variant === 'workshop') {
                var buttons = this.workManager.tab.buttons;
            } else if (variant === 'science') {
                var buttons = this.sciManager.tab.buttons;
            }
            for (var i in buttons) {
                var haystack = buttons[i].model.name;
                if (haystack === upgrade.label) {
                    return buttons[i];
                }
            }
        }
    };
    
    // Building manager
    // ================

    var BuildManager = function () {
        this.manager = new TabManager('Bonfire');
        this.crafts = new CraftManager();
    };

    BuildManager.prototype = {
        manager: undefined,
        crafts: undefined,
        build: function (name, stage) {
            var build = this.getBuild(name);
            var button = this.getBuildButton(name, stage);

            if (!button || !button.model.enabled) return;

            //need to simulate a click so the game updates everything properly
            button.domNode.click(build);
            storeForSummary(name, 1, 'build');

            var label = build.meta.label ? build.meta.label : build.meta.stages[0].label;
            activity('小猫已经建成了一个新的 ' + label, 'ks-build');
        },
        getBuild: function (name) {
            return game.bld.getBuildingExt(name);
        },
        getBuildButton: function (name, stage) {
            var buttons = this.manager.tab.buttons;
            var build = this.getBuild(name);
            var label = typeof stage !== 'undefined' ? build.meta.stages[stage].label : build.meta.label;

            for (var i in buttons) {
                var haystack = buttons[i].model.name;
                if (haystack.indexOf(label) !== -1){
                    return buttons[i];
                }
            }
        }
    };

    // Space manager
    // ================

    var SpaceManager = function () {
        this.manager = new TabManager('Space');
        this.crafts = new CraftManager();
    };

    SpaceManager.prototype = {
        manager: undefined,
        crafts: undefined,
        build: function (name) {
            var build = this.getBuild(name);
            var button = this.getBuildButton(name);

            if (!build.unlocked || !button || !button.model.enabled || !options.auto.space.items[name].enabled) return;

            //need to simulate a click so the game updates everything properly
            button.domNode.click(build);
            storeForSummary(name, 1, 'build');

            var label = build.label;
            activity('小猫建造了一个 ' + label, 'ks-build');
        },
        getBuild: function (name) {
            return game.space.getProgram(name);
        },
        getBuildButton: function (name) {
            var panels = this.manager.tab.planetPanels;

            for (var panel in panels) {
                for (var child in panels[panel].children) {
                    if (panels[panel].children[child].id === name) return panels[panel].children[child];
                }
            }
        }
    };

    // Crafting Manager
    // ================

    var CraftManager = function () {};

    CraftManager.prototype = {
        craft: function (name, amount) {
            amount = Math.floor(amount);

            if (!name || 1 > amount) return;
            if (!this.canCraft(name, amount)) return;

            var craft = this.getCraft(name);
            var ratio = game.getResCraftRatio(craft);

            game.craft(craft.name, amount);

            // determine actual amount after crafting upgrades
            amount = (amount * (1 + ratio)).toFixed(2);

            storeForSummary(name, amount, 'craft');
            
			activity('小猫制作了 ' + game.getDisplayValueExt(amount) + ' ' + cnItem(ucfirst(name)), 'ks-craft');

        },
        canCraft: function (name, amount) {
            var craft = this.getCraft(name);
            var enabled = options.auto.craft.items[name].enabled;
            var result = false;

            if (craft.unlocked && enabled) {
                result = true;

                for (var i in craft.prices) {
                    var price = craft.prices[i];
                    var value = this.getValueAvailable(price.name);

                    if (value < price.val * amount) {
                        result = false;
                    }
                }
            }

            return result;
        },
        getCraft: function (name) {
            return game.workshop.getCraft(this.getName(name));
        },
        getLowestCraftAmount: function (name, limited, limRat) {
            var amount = Number.MAX_VALUE;
            var materials = this.getMaterials(name);
            
            var craft = this.getCraft(name);
            var ratio = game.getResCraftRatio(craft);
            
            // Safeguard if materials for craft cannot be determined.
            if (!materials) return 0;

            var res = this.getResource(name);

            for (var i in materials) {
                var delta = undefined;
                if(this.getResource(i).maxValue > 0 || ! limited) {
                    // If there is a storage limit, we can just use everything returned by getValueAvailable, since the regulation happens there
                    delta = this.getValueAvailable(i) / materials[i];
                } else {
                    // Take the currently present amount of material to craft into account
                    // Currently this determines the amount of resources that can be crafted such that the produced resources and their components
                    // in storage both are "worth" the same number of base materials (as determined by price and craft ratio).
                    // This base material distribution is governed by limRat "limited ratio" which defaults to 0.5, corresponding to half of the possible components being further crafted.
                    // If this were another value, such as 0.75, then if you had 10000 beams and 0 scaffolds, 7500 of the beams would be crafted into scaffolds.
                    delta = limRat * ((this.getValueAvailable(i) + (materials[i] / (1 + ratio)) * this.getValueAvailable(res.name)) / materials[i]) - (this.getValueAvailable(res.name) / (1 + ratio));
                }

                amount = Math.min(delta,amount);
            }

            // If we have a maximum value, ensure that we don't produce more than
            // this value. This should currently only impact wood crafting, but is
            // written generically to ensure it works for any craft that produces a
            // good with a maximum value.
            if (res.maxValue > 0 && amount > (res.maxValue - res.value))
                amount = res.maxValue - res.value;

            return Math.floor(amount);
        },
        getMaterials: function (name) {
            var materials = {};
            var craft = this.getCraft(name);

            // Safeguard against craft items that aren't actually available yet.
            if (!craft) return;

            var prices = game.workshop.getCraftPrice(craft);

            for (var i in prices) {
                var price = prices[i];

                materials[price.name] = price.val;
            }

            return materials;
        },
        getName: function (name) {
            // adjust for spelling discrepancies in core game logic
            if ('catpower' === name) name = 'manpower';
            if ('compendium' === name) name = 'compedium';
            if ('concrete' === name) name = 'concrate';

            return name;
        },
        getResource: function (name) {
            for (var i in game.resPool.resources) {
                var res = game.resPool.resources[i];
                if (res.name === this.getName(name)) return res;
            }
            warning('无法找到资源 ' + name);
            return null;
        },
        getValue: function (name) {
            return this.getResource(name).value;
        },
        getStock: function (name) {
            var res = options.auto.resources[this.getName(name)];
            var stock = res ? res.stock : 0;

            return !stock ? 0 : stock;
        },
        getValueAvailable: function (name, all) {
            var value = this.getValue(name);
            var stock = this.getStock(name);

            if ('catnip' === name) {
                var resPerTick = game.getResourcePerTick(name, false, {
                    modifiers: {
                        'catnip': 0.10 - game.calendar.getWeatherMod()
                    }});

                if (resPerTick < 0) stock -= resPerTick * 202 * 5;
            }

            value = Math.max(value - stock, 0);

            // If we have a maxValue, and user hasn't requested all, check
            // consumption rate
            if (!all && this.getResource(name).maxValue > 0) {
                var res = options.auto.resources[name];
                var consume = res && (res.consume != undefined) ? res.consume : options.consume;

                value *= consume;
            }

            return value;
        }
    };

    // Trading Manager
    // ===============

    var TradeManager = function () {
        this.craftManager = new CraftManager();
        this.manager = new TabManager('Trade');
    };

    TradeManager.prototype = {
        craftManager: undefined,
        manager: undefined,
        trade: function (name, amount) {

            if (!name || 1 > amount) return;

            var race = this.getRace(name);

            if (!race.unlocked) return;

            var button = this.getTradeButton(race.name);

            if (!button.model.enabled || !options.auto.trade.items[name].enabled) return;

            game.diplomacy.tradeMultiple(race, amount);
            storeForSummary(name, amount, 'trade');
            activity('小猫和 '+ cnItem(ucfirst(name)) + " 交易了 " + amount + '次', 'ks-trade');
        },
        getLowestTradeAmount: function (name) {
            var amount = undefined;
            var highestCapacity = undefined;
            var materials = this.getMaterials(name);
            var race = this.getRace(name);

            for (var i in materials) {
                var total = this.craftManager.getValueAvailable(i) / materials[i];

                amount = (amount === undefined || total < amount) ? total : amount;
            }

            if (race === null || options.auto.trade.items[name].allowcapped) return Math.floor(amount);

            // Loop through the items obtained by the race, and determine
            // which good has the most space left. Once we've determined this,
            // reduce the amount by this capacity. This ensures that we continue to trade
            // as long as at least one resource has capacity, and we never over-trade.
            for (var s in race.sells) {
                var item = race.sells[s];
                var resource = this.craftManager.getResource(item.name);
                var max = 0;

                // No need to process resources that don't cap
                if (!resource.maxValue) continue;

                // Zebras special cased titanium taken directly from game code
                if (race.name == "zebras" && item.name == "titanium") {
                    var val = 1.5 + (1.5 * game.resPool.get("ship").value / 100 * 2);
                    max = Math.ceil(val);
                } else {
                    var sratio = item.seasons[game.calendar.getCurSeason().name];
                    var tratio = game.getEffect("tradeRatio");
                    var val = item.value + item.value * tratio;

                    max = val * sratio * (1 + item.delta/2);
                }

                capacity = (resource.maxValue - resource.value) / max;

                highestCapacity = (capacity < highestCapacity) ? highestCapacity : capacity;
            }

            // We must take the ceiling of capacity so that we will trade as long
            // as there is any room, even if it doesn't have exact space. Otherwise
            // we seem to starve trading altogether.
            highestCapacity = Math.ceil(highestCapacity);

            // Now that we know the most we *should* trade for, check to ensure that
            // we trade for our max cost, or our max capacity, whichever is lower.
            // This helps us prevent trading for resources we can't store. Note that we
            // essentially ignore blueprints here. In addition, if highestCapacity was never set,
            // then we just
            amount = (highestCapacity < amount) ? highestCapacity : amount;

            return Math.floor(amount);
        },
        getMaterials: function (name) {
            var materials = {catpower: 50, gold: 15};

            if (name === undefined)
                return materials;

            var prices = this.getRace(name).buys;

            for (var i in prices) {
                var price = prices[i];

                materials[price.name] = price.val;
            }

            return materials;
        },
        getRace: function (name) {
            if (name === undefined)
                return null;
            else
                return game.diplomacy.get(name);
        },
        getTradeButton: function (race) {
            for (var i in this.manager.tab.racePanels) {
                var panel = this.manager.tab.racePanels[i];

                if (panel.race.name === race) return panel.tradeBtn;
            }

            warning('无法找到交易按钮 ' + race);
        }
    };

    // ==============================
    // Configure overall page display
    // ==============================

    var right = $('#rightColumn');

    var addRule = function (rule) {
        var sheets = document.styleSheets;
        sheets[0].insertRule(rule, 0);
    };

    var defaultSelector = 'body[data-ks-style]:not(.scheme_sleek)';

    addRule(defaultSelector + ' #game {'
        + 'font-family: monospace;'
        + 'font-size: 12px;'
        + 'min-width: 1300px;'
        + 'top: 32px;'
        + '}');

    addRule(defaultSelector + ' {'
        + 'font-family: monospace;'
        + 'font-size: 12px;'
        + '}');

    addRule(defaultSelector + ' .column {'
        + 'min-height: inherit;'
        + 'max-width: inherit !important;'
        + 'padding: 1%;'
        + 'margin: 0;'
        + 'overflow-y: auto;'
        + '}');

    addRule(defaultSelector + ' #leftColumn {'
        + 'height: 92%;'
        + 'width: 26%;'
        + '}');

    addRule(defaultSelector + ' #midColumn {'
        + 'margin-top: 1% !important;'
        + 'height: 90%;'
        + 'width: 48%;'
        + '}');

    addRule(defaultSelector + ' #rightColumn {'
        + 'overflow-y: scroll;'
        + 'height: 92%;'
        + 'width: 19%;'
        + '}');

    addRule(defaultSelector + ' #gameLog .msg {'
        + 'display: block;'
        + '}');

    addRule(defaultSelector + ' #gameLog {'
        + 'overflow-y: hidden !important;'
        + 'width: 100% !important;'
        + 'padding-top: 5px !important;'
        + '}');

    addRule(defaultSelector + ' #resContainer .maxRes {'
        + 'color: #676766;'
        + '}');

    addRule(defaultSelector + ' #game .btn {'
        + 'border-radius: 0px;'
        + 'font-family: monospace;'
        + 'font-size: 12px !important;'
        + 'margin: 0 5px 7px 0;'
        + 'width: 290px;'
        + '}');

    addRule(defaultSelector + ' #game .map-viewport {'
        + 'height: 340px;'
        + 'max-width: 500px;'
        + 'overflow: visible;'
        + '}');

    addRule(' #game .map-dashboard {'
        + 'height: 120px;'
        + 'width: 292px;'
        + '}');

    addRule('#ks-options ul {'
        + 'list-style: none;'
        + 'margin: 0 0 5px;'
        + 'padding: 0;'
        + '}');

    addRule('#ks-options ul:after {'
        + 'clear: both;'
        + 'content: " ";'
        + 'display: block;'
        + 'height: 0;'
        + '}');

    addRule('#ks-options ul li {'
        + 'display: block;'
        + 'float: left;'
        + 'width: 100%;'
        + '}');

    addRule('#ks-options #toggle-list-resources .stockWarn {'
        + 'color: ' + options.stockwarncolor + ';'
        + '}');

    document.body.toggleAttribute("data-ks-style", true);

    // Local Storage
    // =============

    var kittenStorageVersion = 1;

    var kittenStorage = {
        version: kittenStorageVersion,
        toggles: {},
        items: {},
        resources: {},
        triggers: {}
    };

    var initializeKittenStorage = function () {
        $("#items-list-build, #items-list-craft, #items-list-trade").find("input[id^='toggle-']").each(function () {
            kittenStorage.items[$(this).attr("id")] = $(this).prop("checked");
        });

        saveToKittenStorage();
    };

    var saveToKittenStorage = function () {
        kittenStorage.toggles = {
            build: options.auto.build.enabled,
            space: options.auto.space.enabled,
            craft: options.auto.craft.enabled,
            upgrade: options.auto.upgrade.enabled,
            trade: options.auto.trade.enabled,
            hunt: options.auto.hunt.enabled,
            faith: options.auto.faith.enabled,
            time: options.auto.time.enabled,
            festival: options.auto.festival.enabled,
            crypto: options.auto.crypto.enabled,
            autofeed: options.auto.autofeed.enabled,
            explore: options.auto.explore.enabled
        };
        kittenStorage.resources = options.auto.resources;
        kittenStorage.triggers = {
            faith: options.auto.faith.trigger,
            time: options.auto.time.trigger,
            hunt: options.auto.hunt.trigger,
            build: options.auto.build.trigger,
            space: options.auto.space.trigger,
            craft: options.auto.craft.trigger,
            crypto: options.auto.crypto.trigger,
            explore: options.auto.explore.trigger,
            trade: options.auto.trade.trigger
        };
        localStorage['cbc.kitten-scientists'] = JSON.stringify(kittenStorage);
    };

    var loadFromKittenStorage = function () {
        var saved = JSON.parse(localStorage['cbc.kitten-scientists'] || 'null');
        if (saved && saved.version == kittenStorageVersion) {
            kittenStorage = saved;

            if (saved.toggles) {
                for (var toggle in saved.toggles) {
                    if (toggle !== 'engine' && options.auto[toggle]) {
                        options.auto[toggle].enabled = !!saved.toggles[toggle];
                        var el = $('#toggle-' + toggle);
                        el.prop('checked', options.auto[toggle].enabled);
                    }
                }
            }

            for (var item in kittenStorage.items) {
                var value = kittenStorage.items[item];
                var el = $('#' + item);
                var option = el.data('option');
                var name = item.split('-');

                el.prop('checked', value);

                if (name.length == 2) {
                    option.enabled = value;
                } else {
                    if (name[1] == 'limited') {
                        option.limited = value;
                    } else {
                        option[name[2]] = value;
                    }
                }
            }

            var list = $("#toggle-list-resources");
            for (var resource in kittenStorage.resources) {
                var res = kittenStorage.resources[resource];
//                  if(resource=="皮毛"){
//                      resource="Furs";
//                  }else if(resource=="难得素"){
//                      resource="Unobtainium";
//                  }
//                console.log(res)
                if ($('#resource-' + resource).length === 0) {
                    list.append(addNewResourceOption(resource));
                }
                if ('stock' in res) {
                    setStockValue(resource, res.stock);
                }
                if ('consume' in res) {
                    setConsumeRate(resource, res.consume);
                }
            }

            if (saved.triggers) {
                options.auto.faith.trigger = saved.triggers.faith;
                options.auto.time.trigger = saved.triggers.time;
                options.auto.hunt.trigger = saved.triggers.hunt;
                options.auto.build.trigger = saved.triggers.build;
                options.auto.space.trigger = saved.triggers.space;
                options.auto.craft.trigger = saved.triggers.craft;
                options.auto.trade.trigger = saved.triggers.trade;
                options.auto.crypto.trigger = saved.triggers.crypto;
                options.auto.explore.trigger = saved.triggers.explore;

                $('#trigger-faith')[0].title = options.auto.faith.trigger;
                $('#trigger-time')[0].title = options.auto.time.trigger;
                $('#trigger-hunt')[0].title = options.auto.hunt.trigger;
                $('#trigger-build')[0].title = options.auto.build.trigger;
                $('#trigger-space')[0].title = options.auto.space.trigger;
                $('#trigger-craft')[0].title = options.auto.craft.trigger;
                $('#trigger-trade')[0].title = options.auto.trade.trigger;
                $('#trigger-crypto')[0].title = options.auto.crypto.trigger;
            }

        } else {
            initializeKittenStorage();
        }
    };

    // Add options element
    // ===================

    var ucfirst = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    var roundToTwo = function (n) {
        return +(Math.round(n + "e+2") + "e-2")
    };

    var setStockWarning = function(name, value) {
        // simplest way to ensure it doesn't stick around too often; always do
        // a remove first then re-add only if needed
        $("#resource-" + name).removeClass("stockWarn");

        var maxValue = game.resPool.resources.filter(i => i.name == name)[0].maxValue;
        if (value > maxValue && !(maxValue === 0)) $("#resource-" + name).addClass("stockWarn");
    }

    var setStockValue = function (name, value) {
        var n = Number(value);

        if (isNaN(n) || n < 0) {
            warning('忽略非数值或无效的库存价值' + value);
            return;
        }

        if (!options.auto.resources[name]) options.auto.resources[name] = {};
        options.auto.resources[name].stock = n;
        $('#stock-value-' + name).text('库存: ' + game.getDisplayValueExt(n));
        setStockWarning(name, n);
    };

    var setConsumeRate = function (name, value) {
        var n = parseFloat(value);

        if (isNaN(n) || n < 0.0 || n > 1.0) {
            warning('忽略非数字或无效消耗率' + value);
            return;
        }

        if (!options.auto.resources[name]) options.auto.resources[name] = {};
        options.auto.resources[name].consume = n;
        $('#consume-rate-' + name).text('消耗: ' + n.toFixed(2));
    };

    var removeResourceControl = function (name) {
        delete options.auto.resources[name];
    };

    var addNewResourceOption = function (name, title) {
        var res = options.auto.resources[name];
        var stock = res && (res.stock != undefined) ? res.stock : 0;
        var consume = res && (res.consume != undefined) ? res.consume : options.consume;
        var enname=name;
        if(enname=="难得素"){
            enname="unobtainium";
        }else if(enname=="皮毛"){
            enname="furs";
        }
        var container = $('<div/>', {
            id: 'resource-' + enname,
            css: {display: 'inline-block', width: '100%'},
        });
        var label = $('<div/>', {
            id: 'resource-label-' + enname,
            text: cnItem(ucfirst(name)),
            css: {display: 'inline-block', width: '95px'},
        });
        
        var stock = $('<div/>', {
            id: 'stock-value-' + enname,
            text: '库存: ' + game.getDisplayValueExt(stock),
            css: {cursor: 'pointer', display: 'inline-block', width: '80px'},
        });

        var consume = $('<div/>', {
            id: 'consume-rate-' + enname,
            text: '消耗: ' + consume.toFixed(2),
            css: {cursor: 'pointer', display: 'inline-block'},
        });

        var del = $('<div/>', {
            id: 'resource-delete-' + enname,
            text: '删除',
            css: {cursor: 'pointer',
                display: 'inline-block',
                float: 'right',
                paddingRight: '5px',
                textShadow: '3px 3px 4px gray'},
        });

        container.append(label, stock, consume, del);

        // once created, set color if relevant
        if (res != undefined && res.stock != undefined) setStockWarning(name, res.stock);

        stock.on('click', function () {
            var value = window.prompt('库存 ' + ucfirst(title ? title : name));
            if (value !== null) {
                setStockValue(name, value);
                saveToKittenStorage();
            }
        });

        consume.on('click', function () {
            var value = window.prompt('消耗率 ' + ucfirst(title ? title : name));
            if (value !== null) {
                setConsumeRate(name, value);
                saveToKittenStorage();
            }
        });

        del.on('click', function () {
            if (window.confirm('取消自动转换' + ucfirst(title ? title : name) + '?')) {
                container.remove();
                removeResourceControl(name);
                saveToKittenStorage();
            }
        });

        return container;
    };

    var getAvailableResourceOptions = function () {
        var items = [];

        for (var i in game.resPool.resources) {
            var res = game.resPool.resources[i];

            //仅显示列表中没有的新资源
             //可见 这有助于减少总体尺寸。
            if (res.name && $('#resource-' + res.name).length === 0) {
                    //添加汉化
                if(res.name=="hashrates"){
                    res.title="哈希值";
                }
//                console.log("name:"+res.name+",title:"+res.title);
                
                var item = $('<div/>', {
                    id: 'resource-add-' + res.name,
                    text: ucfirst(res.title ? res.title : res.name),
                    css: {cursor: 'pointer',
                        textShadow: '3px 3px 4px gray'},
                });

                //包装功能需要使封闭工作
                (function (res, item) {
                    item.on('click', function () {
                        item.remove();
                        if (!options.auto.resources[res.name]) options.auto.resources[res.name] = {};
                        options.auto.resources[res.name].stock = 0;
                        options.auto.resources[res.name].consume = options.consume;
                        $('#toggle-list-resources').append(addNewResourceOption(res.name, res.title));
                    });
                })(res, item);

                items.push(item);
            }
        }

        return items;
    };

    var getResourceOptions = function () {
        var list = $('<ul/>', {
            id: 'toggle-list-resources',
            css: {display: 'none', paddingLeft: '20px'}
        });

        var add = $('<div/>', {
            id: 'resources-add',
            text: '添加资源',
            css: {cursor: 'pointer',
                display: 'inline-block',
                textShadow: '3px 3px 4px gray',
                borderBottom: '1px solid rgba(185, 185, 185, 0.7)' },
        });

        var clearunused = $('<div/>', {
            id: 'resources-clear-unused',
            text: '清除未使用',
            css: {cursor: 'pointer',
                display: 'inline-block',
                float: 'right',
                paddingRight: '5px',
                textShadow: '3px 3px 4px gray' },
        });

        clearunused.on('click', function () {
            for (var name in options.auto.resources) {
                //仅使用未修改的值删除资源。 需要手册
                 //使用非标准值删除资源。
                if (!options.auto.resources[name].stock &&
                    options.auto.resources[name].consume == options.consume ||
                    options.auto.resources[name].consume == undefined) {
                    $('#resource-' + name).remove();
                }
            }
        });

        allresources = $('<ul/>', {
            id: 'available-resources-list',
            css: {display: 'none', paddingLeft: '20px'}
        });

        add.on('click', function () {
            allresources.toggle();
            allresources.empty();
            allresources.append(getAvailableResourceOptions());
        });

        list.append(add, clearunused, allresources);

        // Add all the current resources
        for (var name in options.auto.resources) {
            list.append(addNewResourceOption(name));
        }

        return list;
    };

    var getToggle = function (toggleName, text) {
        var auto = options.auto[toggleName];
        var element = $('<li/>', {id: 'ks-' + toggleName});

        var label = $('<label/>', {
            'for': 'toggle-' + toggleName,
            text: text
        });

        var input = $('<input/>', {
            id: 'toggle-' + toggleName,
            type: 'checkbox'
        });

        if (auto.enabled) {
            input.prop('checked', true);
        }

        // engine needs a custom toggle
        if (toggleName !== 'engine') {
            input.on('change', function () {
                if (input.is(':checked') && auto.enabled == false) {
                    auto.enabled = true;
                    message('启用自动化 ' + ucfirst(text));
                    saveToKittenStorage();
                } else if ((!input.is(':checked')) && auto.enabled == true) {
                    auto.enabled = false;
                    message('禁用自动化 ' + ucfirst(text));
                    saveToKittenStorage();
                }
            });
        }

        element.append(input, label);

        if (auto.items) {
            // Add a border on the element
            element.css('borderBottom', '1px  solid rgba(185, 185, 185, 0.7)');

            var toggle = $('<div/>', {
                css: {display: 'inline-block', float: 'right'}
            });

            var button = $('<div/>', {
                id: 'toggle-items-' + toggleName,
                text: '项目',
                css: {cursor: 'pointer',
                    display: 'inline-block',
                    paddingRight: '5px',
                    textShadow: '3px 3px 4px gray'}
            });

            toggle.append(button);

            var list = $('<ul/>', {
                id: 'items-list-' + toggleName,
                css: {display: 'none', paddingLeft: '20px'}
            });

            var disableall = $('<div/>', {
                id: 'toggle-all-items-' + toggleName,
                text: '禁用所有',
                css: {cursor: 'pointer',
                    display: 'inline-block',
                    textShadow: '3px 3px 4px gray',
                    marginRight: '8px'}
            });

            disableall.on('click', function () {
                // can't use find as we only want one layer of checkboxes
                var items = list.children().children(':checkbox');
                items.prop('checked', false);
                items.change();
                list.children().children(':checkbox').change();
            });

            list.append(disableall);

            var enableall = $('<div/>', {
                id: 'toggle-all-items-' + toggleName,
                text: '启用所有',
                css: {cursor: 'pointer',
                    display: 'inline-block',
                    textShadow: '3px 3px 4px gray'}
            });

            enableall.on('click', function () {
                // can't use find as we only want one layer of checkboxes
                var items = list.children().children(':checkbox');
                items.prop('checked', true);
                items.change();
                list.children().children(':checkbox').change();
            });

            list.append(enableall);

            // fill out list with toggle items
            for (var itemName in auto.items) {
                if (toggleName === 'trade'){
                    list.append(getTradeOption(itemName, auto.items[itemName]));
                }else if (toggleName === 'craft'){
                    list.append(getCraftOption(itemName, auto.items[itemName]));
                }else
                    list.append(getOption(itemName, auto.items[itemName]));
            }

            button.on('click', function () {
                list.toggle();
            });

            element.append(toggle, list);

            // Add resource controls for crafting, sort of a hack
            if (toggleName === 'craft') {
                var resources = $('<div/>', {
                    id: 'toggle-resource-controls',
                    text: '资源',
                    css: {cursor: 'pointer',
                        display: 'inline-block',
                        paddingRight: '5px',
                        textShadow: '3px 3px 4px gray'},
                });

                var resourcesList = getResourceOptions();
               
                // When we click the items button, make sure we clear resources
                button.on('click', function () {
                    resourcesList.toggle(false);
                });

                resources.on('click', function () {
                    list.toggle(false);
                    resourcesList.toggle();
                });

                toggle.prepend(resources);

                element.append(resourcesList);
            }

        }

        if (auto.trigger) {
            var triggerButton = $('<div/>', {
                id: 'trigger-' + toggleName,
                text: '触发条件',
                title: auto.trigger,
                css: {cursor: 'pointer',
                    display: 'inline-block',
                    float: 'right',
                    paddingRight: '5px',
                    textShadow: '3px 3px 4px gray'}
            });

            triggerButton.on('click', function () {
                var value;
                if (text == '黑币交易'){value = window.prompt('输入新的触发值 ' + text + '. 设置触发黑币交易所需达到的遗物数量。', auto.trigger);}
                else{value = window.prompt('输入新的触发值 ' + text + '. 取值范围：0到1之间.', auto.trigger);}

                if (value !== null) {
                    auto.trigger = parseFloat(value);
                    saveToKittenStorage();
                    triggerButton[0].title = auto.trigger;
                }
            });

            element.append(triggerButton);
        }

        return element;
    };

    var getTradeOption = function (name, option) {
        var element = getOption(name, option);
        element.css('borderBottom', '1px solid rgba(185, 185, 185, 0.7)');

        var button = $('<div/>', {
            id: 'toggle-seasons-' + name,
            text: '季节',
            css: {cursor: 'pointer',
                display: 'inline-block',
                float: 'right',
                paddingRight: '5px',
                textShadow: '3px 3px 4px gray'},
        });

        var list = $('<ul/>', {
            id: 'seasons-list-' + name,
            css: {display: 'none', paddingLeft: '20px'}
        });

        // fill out the list with seasons
        list.append(getSeason(name, 'spring', option));
        list.append(getSeason(name, 'summer', option));
        list.append(getSeason(name, 'autumn', option));
        list.append(getSeason(name, 'winter', option));

        button.on('click', function () {
            list.toggle();
        });

        element.append(button, list);

        return element;
    };

    var getSeason = function (name, season, option) {
        var element = $('<li/>');
        var label = $('<label/>', {
            'for': 'toggle-' + name + '-' + season,
            text: cnItem(ucfirst(season))
        });

        var input = $('<input/>', {
            id: 'toggle-' + name + '-' + season,
            type: 'checkbox'
        }).data('option', option);

        if (option[season]) {
            input.prop('checked', true);
        }

        input.on('change', function () {
            if (input.is(':checked') && option[season] == false) {
                option[season] = true;
                message('Enabled trading with ' + ucfirst(name) + ' in the ' + ucfirst(season));
            } else if ((!input.is(':checked')) && option[season] == true) {
                option[season] = false;
                message('在' + cnItem(ucfirst(season)) + '停止和 ' + cnItem(ucfirst(name)) + ' 交易 ');
            }
            kittenStorage.items[input.attr('id')] = option[season];
            saveToKittenStorage();
        });

        element.append(input, label);

        return element;
    };

    var getOption = function (name, option) {
        var element = $('<li/>');
        var elementLabel = option.label || ucfirst(name);
        var label = $('<label/>', {
            'for': 'toggle-' + name,
            text: cnItem(elementLabel),
            css: {display: 'inline-block', minWidth: '80px'}
        });

        var input = $('<input/>', {
            id: 'toggle-' + name,
            type: 'checkbox'
        }).data('option', option);

        if (option.enabled) {
            input.prop('checked', true);
        }

        input.on('change', function () {
            if (input.is(':checked') && option.enabled == false) {
                option.enabled = true;
                message('启用自动化 ' + cnItem(elementLabel));
            } else if ((!input.is(':checked')) && option.enabled == true) {
                option.enabled = false;
                message('禁用自动化 ' + cnItem(elementLabel));
            }
            kittenStorage.items[input.attr('id')] = option.enabled;
            saveToKittenStorage();
        });

        element.append(input, label);

        return element;
    };

    var getCraftOption = function (name, option) {
        var element = getOption(name, option);

        var label = $('<label/>', {
            'for': 'toggle-limited-' + name,
            text: '限制'
        });

        var input = $('<input/>', {
            id: 'toggle-limited-' + name,
            type: 'checkbox'
        }).data('option', option);

        if (option.limited) {
            input.prop('checked', true);
        }

        input.on('change', function () {
            if (input.is(':checked') && option.limited == false) {
                option.limited = true;
                message('工艺 ' + cnItem(ucfirst(name)) + ': 每个季节限量一次');
            } else if ((!input.is(':checked')) && option.limited == true) {
                option.limited = false;
                message('工艺 ' + cnItem(ucfirst(name)) + ': 不限制');
            }
            kittenStorage.items[input.attr('id')] = option.limited;
            saveToKittenStorage();
        });

        element.append(input, label);

        return element;
    };

    // 抢按钮标签宗教选项
    var religionManager = new ReligionManager();
    for (var buildOption in options.auto.faith.items) {
        var buildItem = options.auto.faith.items[buildOption];
        var build = religionManager.getBuild(buildItem.name || buildOption, buildItem.variant);
        if (build) {
            options.auto.faith.items[buildOption].label = build.label;
        }
    }

    // 抢按钮标签建筑选项
    var timeManager = new TimeManager();
    for (var buildOption in options.auto.time.items) {
        var buildItem = options.auto.time.items[buildOption];
        var build = timeManager.getBuild(buildItem.name || buildOption, buildItem.variant);
        if (build) {
            options.auto.time.items[buildOption].label = build.label;
        }
    }

    // Grab button labels for build options
    var buildManager = new BuildManager();
    for (var buildOption in options.auto.build.items) {
        var buildItem = options.auto.build.items[buildOption];
        var build = buildManager.getBuild(buildItem.name || buildOption);
        if (build) {
            if ("stage" in buildItem) {
                options.auto.build.items[buildOption].label = build.meta.stages[buildItem.stage].label;
            } else {
                options.auto.build.items[buildOption].label = build.meta.label;
            }
        }
    }

    // Grab button labels for space options
    var spaceManager = new SpaceManager();
    for (var spaceOption in options.auto.space.items) {
        var build = spaceManager.getBuild(spaceOption);
        if (build) {
            // It's changed to label in 1.3.0.0
            var title = build.title ? build.title : build.label;
            options.auto.space.items[spaceOption].label = title;
        }
    }

    var optionsElement = $('<div/>', {id: 'ks-options', css: {marginBottom: '10px'}});
    var optionsListElement = $('<ul/>');
    var optionsTitleElement = $('<div/>', {
        css: { bottomBorder: '1px solid gray', marginBottom: '5px' },
        text: version
    });

    optionsElement.append(optionsTitleElement);

    optionsListElement.append(getToggle('engine',   '启用小猫科学家'));
    optionsListElement.append(getToggle('build',    '建筑'));
    optionsListElement.append(getToggle('space',    '太空'));
    optionsListElement.append(getToggle('craft',    '工艺'));
    optionsListElement.append(getToggle('upgrade',  '升级'));
    optionsListElement.append(getToggle('trade',    '贸易'));
    optionsListElement.append(getToggle('hunt',     '狩猎'));
    optionsListElement.append(getToggle('faith',    '宗教'));
    optionsListElement.append(getToggle('time',     '时间'));
    optionsListElement.append(getToggle('festival', '节日'));
    optionsListElement.append(getToggle('crypto',   '黑币交易'));
    optionsListElement.append(getToggle('autofeed',   '献祭上古神'));
//    optionsListElement.append(getToggle('explore',  '探索'));

    // add activity button
    // ===================

    activitySummary = {};
    var resetActivitySummary = function () {
        activitySummary = {
            lastyear: game.calendar.year,
            lastday:  game.calendar.day,
            craft:    {},
            trade:    {},
            build:    {},
            other:    {}
        };
    };

    var storeForSummary = function (name, amount, section) {
        if (amount === undefined) amount = 1;
        if (section === undefined) section = 'other';

        if (activitySummary[section] === undefined)
            activitySummary[section] = {};

        if (activitySummary[section][name] === undefined) {
            activitySummary[section][name] = parseInt(amount, 10);
        } else {
            activitySummary[section][name] += parseInt(amount, 10);
        }
    };

    var displayActivitySummary = function () {
        // Festivals
        if (activitySummary.other.festival) {
            summary('举办 ' + game.getDisplayValueExt(activitySummary.other.festival) + ' 节日');
        }

        // Observe stars
        if (activitySummary.other.stars) {
            summary('观测到 ' + game.getDisplayValueExt(activitySummary.other.stars) + ' 星星');
        }

        // Praise the Sun
        if (activitySummary.other.faith) {
            summary('累计 ' + game.getDisplayValueExt(activitySummary.other.faith) + ' 通过赞美太阳');
        }

        // Hunters
        if (activitySummary.other.hunt) {
            summary('派出 ' + game.getDisplayValueExt(activitySummary.other.hunt) + ' 批可爱的小猫猎人' + (activitySummary.other.hunt == 1 ? '' : 's'));
        }

        // Buildings
        for (var name in activitySummary.build) {
            summary('建成: +' + game.getDisplayValueExt(activitySummary.build[name]) + ' ' + cnItem(ucfirst(name)));
        }

        // Crafts
        for (var name in activitySummary.craft) {
            summary('制作了: +' + game.getDisplayValueExt(activitySummary.craft[name]) + ' ' + cnItem(ucfirst(name)));
        }

        // Trading
        for (var name in activitySummary.trade) {
            summary('贸易: ' + game.getDisplayValueExt(activitySummary.trade[name]) + 'x ' + cnItem(ucfirst(name)));
        }

        // Show time since last run. Assumes that the day and year are always higher.
        if (activitySummary.lastyear && activitySummary.lastday) {
            var years = game.calendar.year - activitySummary.lastyear;
            var days = game.calendar.day - activitySummary.lastday;

            if (days < 0) {
                years -= 1;
                days += 400;
            }

            var duration = '';
            if (years > 0) {
                duration += years + ' ';
                duration += (years == 1) ? 'year' : 'years';
            }

            if (days >= 0) {
                if (years > 0) duration += ' and ';
                duration += roundToTwo(days) + ' ';
                duration += (days == 1) ? '天' : '天';
            }

            summary('最后的总结 ' + duration);
        }

        // Clear out the old activity
        resetActivitySummary()
    };

    resetActivitySummary();

    var activityBox = $('<div/>', {
        id: 'activity-box',
        css: {
            display: 'inline-block',
            float: 'right',
            verticalAlign: 'top'
        }
    });

    var showActivity = $('<a/>', {
        id: 'showActivityHref',
        text: '显示活动项',
        href: '#',
        css: {
            verticalAlign: 'top'
        }
    });

    var activityCheckbox = $('<input/>', {
        id: 'enable-activity',
        type: 'checkbox',
        css: {
            verticalAlign: 'top'
        }
    });

    var activityLabel = $('<label/>', {
        for: 'enable-activity'
    });

    if (options.showactivity)
        activityCheckbox.prop('checked', true);

    activityCheckbox.on('change', function () {
        if (activityCheckbox.is(':checked') && options.showactivity == false) {
            options.showactivity = true;
            message('Showing Kitten Scientists activity live');
        } else if (activityCheckbox.not(':checked') && options.showactivity == true) {
            options.showactivity = false;
            message('Hiding updates of Kitten Scientists activity');
        }
    });

    showActivity.on('click', displayActivitySummary);

    activityBox.append(activityCheckbox, activityLabel, showActivity);

    $('#clearLog').append(activityBox);

    // Donation Button
    // ===============

    var donate = $('<li/>', {id: "ks-donate"}).append($('<a/>', {
        href: 'bitcoin:' + address + '?amount=0.005&label=Kittens Donation',
        target: '_blank',
        tiltle:'这是猫咪科学家插件作者的比特币捐赠地址',
        text: address
    })).prepend($('<img/>', {
        css: {
            height: '15px',
            width: '15px',
            padding: '3px 4px 0 4px',
            verticalAlign: 'bottom'
        },
        src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iNTEycHgiCiAgIGhlaWdodD0iNTEycHgiCiAgIHZpZXdCb3g9IjAgMCAxIDEiCiAgIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIgogICBpZD0ic3ZnMiIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC4yIHI5ODE5IgogICBzb2RpcG9kaTpkb2NuYW1lPSJiaXRjb2luLWxvZ28tbm9zaGFkb3cuc3ZnIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEyMiI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNDQ3IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg2MSIKICAgICBpZD0ibmFtZWR2aWV3MjAiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjAuOTIxODc1IgogICAgIGlua3NjYXBlOmN4PSIyMTIuNTE0MzciCiAgICAgaW5rc2NhcGU6Y3k9IjIzMy4yNDYxNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzIiIC8+CiAgPCEtLSBBbmRyb2lkIGxhdW5jaGVyIGljb25zOiB2aWV3Qm94PSItMC4wNDUgLTAuMDQ1IDEuMDkgMS4wOSIgLS0+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiPgogICAgPGZpbHRlcgogICAgICAgaWQ9Il9kcm9wLXNoYWRvdyIKICAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgICBpbj0iU291cmNlQWxwaGEiCiAgICAgICAgIHJlc3VsdD0iYmx1ci1vdXQiCiAgICAgICAgIHN0ZERldmlhdGlvbj0iMSIKICAgICAgICAgaWQ9ImZlR2F1c3NpYW5CbHVyNyIgLz4KICAgICAgPGZlQmxlbmQKICAgICAgICAgaW49IlNvdXJjZUdyYXBoaWMiCiAgICAgICAgIGluMj0iYmx1ci1vdXQiCiAgICAgICAgIG1vZGU9Im5vcm1hbCIKICAgICAgICAgaWQ9ImZlQmxlbmQ5IiAvPgogICAgPC9maWx0ZXI+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJjb2luLWdyYWRpZW50IgogICAgICAgeDE9IjAlIgogICAgICAgeTE9IjAlIgogICAgICAgeDI9IjAlIgogICAgICAgeTI9IjEwMCUiPgogICAgICA8c3RvcAogICAgICAgICBvZmZzZXQ9IjAlIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZjlhYTRiIgogICAgICAgICBpZD0ic3RvcDEyIiAvPgogICAgICA8c3RvcAogICAgICAgICBvZmZzZXQ9IjEwMCUiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmNzkzMWEiCiAgICAgICAgIGlkPSJzdG9wMTQiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZwogICAgIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUpIgogICAgIGlkPSJnMTYiPgogICAgPHBhdGgKICAgICAgIGlkPSJjb2luIgogICAgICAgZD0ibSA2My4wMzU5LDM5Ljc0MSBjIC00LjI3NCwxNy4xNDMgLTIxLjYzNywyNy41NzYgLTM4Ljc4MiwyMy4zMDEgLTE3LjEzOCwtNC4yNzQgLTI3LjU3MSwtMjEuNjM4IC0yMy4yOTUsLTM4Ljc4IDQuMjcyLC0xNy4xNDUgMjEuNjM1LC0yNy41NzkgMzguNzc1LC0yMy4zMDUgMTcuMTQ0LDQuMjc0IDI3LjU3NiwyMS42NCAyMy4zMDIsMzguNzg0IHoiCiAgICAgICBzdHlsZT0iZmlsbDp1cmwoI2NvaW4tZ3JhZGllbnQpIiAvPgogICAgPHBhdGgKICAgICAgIGlkPSJzeW1ib2wiCiAgICAgICBkPSJtIDQ2LjEwMDksMjcuNDQxIGMgMC42MzcsLTQuMjU4IC0yLjYwNSwtNi41NDcgLTcuMDM4LC04LjA3NCBsIDEuNDM4LC01Ljc2OCAtMy41MTEsLTAuODc1IC0xLjQsNS42MTYgYyAtMC45MjMsLTAuMjMgLTEuODcxLC0wLjQ0NyAtMi44MTMsLTAuNjYyIGwgMS40MSwtNS42NTMgLTMuNTA5LC0wLjg3NSAtMS40MzksNS43NjYgYyAtMC43NjQsLTAuMTc0IC0xLjUxNCwtMC4zNDYgLTIuMjQyLC0wLjUyNyBsIDAuMDA0LC0wLjAxOCAtNC44NDIsLTEuMjA5IC0wLjkzNCwzLjc1IGMgMCwwIDIuNjA1LDAuNTk3IDIuNTUsMC42MzQgMS40MjIsMC4zNTUgMS42NzksMS4yOTYgMS42MzYsMi4wNDIgbCAtMS42MzgsNi41NzEgYyAwLjA5OCwwLjAyNSAwLjIyNSwwLjA2MSAwLjM2NSwwLjExNyAtMC4xMTcsLTAuMDI5IC0wLjI0MiwtMC4wNjEgLTAuMzcxLC0wLjA5MiBsIC0yLjI5Niw5LjIwNSBjIC0wLjE3NCwwLjQzMiAtMC42MTUsMS4wOCAtMS42MDksMC44MzQgMC4wMzUsMC4wNTEgLTIuNTUyLC0wLjYzNyAtMi41NTIsLTAuNjM3IGwgLTEuNzQzLDQuMDE5IDQuNTY5LDEuMTM5IGMgMC44NSwwLjIxMyAxLjY4MywwLjQzNiAyLjUwMywwLjY0NiBsIC0xLjQ1Myw1LjgzNCAzLjUwNywwLjg3NSAxLjQzOSwtNS43NzIgYyAwLjk1OCwwLjI2IDEuODg4LDAuNSAyLjc5OCwwLjcyNiBsIC0xLjQzNCw1Ljc0NSAzLjUxMSwwLjg3NSAxLjQ1MywtNS44MjMgYyA1Ljk4NywxLjEzMyAxMC40ODksMC42NzYgMTIuMzg0LC00LjczOSAxLjUyNywtNC4zNiAtMC4wNzYsLTYuODc1IC0zLjIyNiwtOC41MTUgMi4yOTQsLTAuNTI5IDQuMDIyLC0yLjAzOCA0LjQ4MywtNS4xNTUgeiBtIC04LjAyMiwxMS4yNDkgYyAtMS4wODUsNC4zNiAtOC40MjYsMi4wMDMgLTEwLjgwNiwxLjQxMiBsIDEuOTI4LC03LjcyOSBjIDIuMzgsMC41OTQgMTAuMDEyLDEuNzcgOC44NzgsNi4zMTcgeiBtIDEuMDg2LC0xMS4zMTIgYyAtMC45OSwzLjk2NiAtNy4xLDEuOTUxIC05LjA4MiwxLjQ1NyBsIDEuNzQ4LC03LjAxIGMgMS45ODIsMC40OTQgOC4zNjUsMS40MTYgNy4zMzQsNS41NTMgeiIKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+CiAgPC9nPgo8L3N2Zz4='
    }));

    // Add some padding above the donation item
    donate.css('padding', '5px');

    optionsListElement.append(donate);

    // add the options above the game log
    right.prepend(optionsElement.append(optionsListElement));

    // Initialize and set toggles for Engine
    // =====================================

    var engine = new Engine();
    var toggleEngine = $('#toggle-engine');

    toggleEngine.on('change', function () {
        if (toggleEngine.is(':checked')) {
            engine.start();
        } else {
            engine.stop();
        }
    });

    loadFromKittenStorage();

    if (console && console.log) console.log(version + " 加载成功");
    game._publish("kitten_scientists/ready", version);

}

var loadTest = function() {
    if (typeof gamePage === 'undefined') {
        // Test if kittens game is already loaded or wait 2s and try again
        setTimeout(function(){
            loadTest();
        }, 2000);
    } else {
        // Kittens loaded, run Kitten Scientist's Automation Engine
        game = gamePage;
        run();
    }
}

loadTest();
