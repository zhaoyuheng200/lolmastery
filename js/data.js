var masteryData = [
  //Ferocity
  [
    {
      tier: 0,
      type: "normal",
      masteries:[
        {
          index: 0,
          order: 0,
          name: "Fury",
          levels: 5,
          desc: "+%n Attack Speed",
          levelDesc: [
            {
              holder: "%n",
              values: [0.8, 1.6, 2.4, 3.2, 4.0]
            }
          ]
        },
        {
          index: 1,
          order: 1,
          name: "Socery",
          levels: 5,
          desc: "+%n increased Ability damage",
          levelDesc: [
            {
              holder: "%n",
              values: [0.4, 0.8, 1.2, 1.6, 2.0]
            }
          ]
        }
      ]
    },
    {
      tier: 1,
      type: "key",
      masteries:[
        {
          index: 2,
          order: 0,
          name: "Double Edged Sword",
          levels: 1,
          desc: "Melee: Deal 3% additional damage, take 1.5% aditional damage.\n\nRanged: Deal and take 2% aditional damage",
          levelDesc: []
        },
        {
          index: 3,
          order: 1,
          name: "Feast",
          levels: 1,
          desc: "Killing a unit restores 20 Health (25 seconds cooldown)",
          levelDesc: []
        }
      ]
    },
    {
      tier: 2,
      type: "normal",
      masteries:[
        {
          index: 4,
          order: 0,
          name: "Vampirism",
          levels: 5,
          desc: "+%n Lifesteal and Spell Vamp",
          levelDesc: [
            {
              holder: "%n",
              values: [0.4, 0.8, 1.2, 1.6, 2.0]
            }
          ]
        },
        {
          index: 5,
          order: 1,
          name: "Natural Talent",
          levels: 5,
          desc: "+%n Attack Damage and %m Ability Power at lvl 18\n(%j Attack Damage and &k Ability Power per level)",
          levelDesc: [
            {
              holder: "%n",
              values: [2, 4, 6, 8, 10]
            },
            {
              holder: "%m",
              values: [3, 6, 9, 12, 15]
            },
            {
              holder: "%j",
              values: [0.11, 0.22, 0.33, 0.44, 0.55]
            },
            {
              holder: "%k",
              values: [0.16, 0.32, 0.5, 0.66, 0.83]
            }
          ]
        }
      ]
    },
    {
      tier: 3,
      type: "key",
      masteries:[
        {
          index: 6,
          order: 0,
          name: "Double Edged Sword",
          levels: 1,
          desc: "Melee: Deal 3% additional damage, take 1.5% aditional damage.\n\nRanged: Deal and take 2% aditional damage",
          levelDesc: []
        },
        {
          index: 7,
          order: 1,
          name: "Feast",
          levels: 1,
          desc: "Killing a unit restores 20 Health (25 seconds cooldown)",
          levelDesc: []
        }
      ]
    },
    {
      tier: 4,
      type: "normal",
      masteries:[
        {
          index: 8,
          order: 0,
          name: "Battering Blows",
          levels: 5,
          desc: "+%n% ArmorPenetration",
          levelDesc: [
            {
              holder: "%n",
              values: [1.4, 2.8, 4.2, 5.6, 7.0]
            }
          ]
        },
        {
          index: 9,
          order: 1,
          name: "Piercing Thoughts",
          levels: 5,
          desc: "+%n% Magic Penetration",
          levelDesc: [
            {
              holder: "%n",
              values: [1.4, 2.8, 4.2, 5.6, 7.0]
            }
          ]
        }
      ]
    },
    {
      tier: 5,
      type: "key",
      masteries:[
        {
          index: 10,
          order: 0,
          name: "Worlord's Blordlust",
          levels: 1,
          desc: "Your critical strikes on enemy champions heal you\nfor 15% of the damage dealt and grant you 20%\nattack speed for 4 seconds (2 second coldown)",
          levelDesc: []
        },
        {
          index: 11,
          order: 1,
          name: "Fervor of Battle",
          levels: 1,
          desc: "You generate stacks of Fervor by hitting enemy\nchampions with attacks and abilities. your basic\nattacks deal 1-8 bonux phisical damage to enemy champion for each of your stacks of fervor (max 10 stacks, damage based on your level).\n\nAttacking enemy champions generate 1 stack of\nFervor (2 for melee champions) and damaging\nenemy champions with an ability generate 2\nstacks of Fervor (2 second colldown). Stacks of\nFervor last 6 seconds.",
          levelDesc: []
        },
        {
          index: 12,
          order: 2,
          name: "Deathfire Touch",
          levels: 1,
          desc: "Your damaging abilities cause enemy champions\nto take magic damage equal to 8 + 50% of your\nBonus Attack Damage and 20% of your Ability\nPower, over 4 seconds\n\nDeathfire Touch has reduced effectiveness when applied by area of damage over time abilities.\n&nbsp;&nbsp;&nbsp;- Area of Effect: 2 second duration.\n&nbsp;&nbsp;&nbsp;- Damage over time: 1 second duration.",
          levelDesc: []
        }
      ]
    },
  ],
  //Cunning
  [
    {
      tier: 0,
      type: "normal",
      masteries:[
        {
          index: 13,
          order: 0,
          name: "Wanderer",
          levels: 5,
          desc: "+%n% Movement Speeed out of combat ",
          levelDesc: [
            {
              holder: "%n",
              values: [0.6, 1.2, 1.8, 2.4, 3.0]
            }
          ]
        },
        {
          index: 14,
          order: 1,
          name: "Savagery",
          levels: 5,
          desc: "Single target attacks and spells deal %n bonus damage to minions and monsters",
          levelDesc: [
            {
              holder: "%n",
              values: [1, 2, 3, 4, 5]
            }
          ]
        }
      ]
    },
    {
      tier: 1,
      type: "key",
      masteries:[
        {
          index: 15,
          order: 0,
          name: "Runic Affinity",
          levels: 1,
          desc: "Buffs from neutral monsters last 15% longer",
          levelDesc: []
        },
        {
          index: 16,
          order: 1,
          name: "Secret Stash",
          levels: 1,
          desc: "your Potions and Elixirs last 10% longer.\n\nYour health Potions are replaced with Biscuits that restore 20 Health and 10 Mana instantly on use",
          levelDesc: []
        },
        {
          index: 17,
          order: 2,
          name: "Assassin",
          levels: 1,
          desc: "Deal 1.5% increased damage when no allied champions are nearby",
          levelDesc: []
        },
      ]
    },
    {
      tier: 2,
      type: "normal",
      masteries:[
        {
          index: 18,
          order: 0,
          name: "Merciless",
          levels: 5,
          desc: "Deal %n% increased damage to champions below 40% Health",
          levelDesc: [
            {
              holder: "%n",
              values: [1, 2, 3, 4, 5]
            }
          ]
        },
        {
          index: 19,
          order: 1,
          name: "Meditation",
          levels: 5,
          desc: "Regenerate %n% of your missing Mana every 5 seconds",
          levelDesc: [
            {
              holder: "%n",
              values: [0.3, 0.6, 0.9, 1.2, 1.5]
            }
          ]
        }
      ]
    },
    {
      tier: 3,
      type: "key",
      masteries:[
        {
          index: 20,
          order: 0,
          name: "Bandit",
          levels: 1,
          desc: "Gain 1 gold for each nearby minion killed by an ally.\n\nGain 3 gold(10 if melee) when hitting an enemy champion with a basic attack (5 second cooldown)",
          levelDesc: []
        },
        {
          index: 21,
          order: 1,
          name: "Dangerous Game",
          levels: 1,
          desc: "Champion kills and assists restore 5% of your missing Health and mana",
          levelDesc: []
        }
      ]
    },
    {
      tier: 4,
      type: "normal",
      masteries:[
        {
          index: 22,
          order: 0,
          name: "Precision",
          levels: 5,
          desc: "Gain %n + %m per level Armor Penetration and \n%j + %k per lvl Magic Penetration",
          levelDesc: [
            {
              holder: "%n",
              values: [1, 2, 3, 4, 5]
            },
            {
              holder: "%m",
              values: [0.1, 0.2, 0.3, 0.4, 0.5]
            },
            {
              holder: "%j",
              values: [0.6, 1.2, 1.8, 2.4, 3]
            },
            {
              holder: "%k",
              values: [0.06, 0.12, 0.18, 0.24, 0.3]
            },
          ]
        },
        {
          index: 23,
          order: 1,
          name: "Intelligence",
          levels: 5,
          desc: "Your Cooldown Reduction cap is increased to %n%\nand you gain %m% Cooldown Reduction",
          levelDesc: [
            {
              holder: "%n",
              values: [41, 42, 43, 44, 45]
            },
            {
              holder: "%m",
              values: [1, 2, 3, 4, 5]
            }
          ]
        }
      ]
    },
    {
      tier: 5,
      type: "key",
      masteries:[
        {
          index: 24,
          order: 0,
          name: "Stormraider's Surge",
          levels: 1,
          desc: "Dealing 30% of a champion's max health within 2\nseconds grants you 35% Movement Speed for 3\nseconds (10 second cooldown).",
          levelDesc: []
        },
        {
          index: 25,
          order: 1,
          name: "Thunderlord's Decree",
          levels: 1,
          desc: "Your 3rd attack or speel on an enemy champion\ncalls down a lightings strike, dealing magic\n damage in the area.\n\nDamage: 10 per level, plus 30% of your Bonus\nAttack Damage, and 10% of your Ability Power (20\n second cooldown).",
          levelDesc: []
        },
        {
          index: 26,
          order: 2,
          name: "Windspeaker's Blessing",
          levels: 1,
          desc: "your heals and shields are 10% stronger.\nAdditional, your shields and heals on other allies\nincrease their armor by 5-22 (based on level) and\ntheir magic resistance by half that amount for 3]\n seconds.",
          levelDesc: []
        }
      ]
    },
  ],
  //Resolve
  [
    {
      tier: 0,
      type: "normal",
      masteries:[
        {
          index: 27,
          order: 0,
          name: "Recovery",
          levels: 5,
          desc: "+%n Health per 5 seconds",
          levelDesc: [
            {
              holder: "%n",
              values: [0.4, 0.8, 1.2, 1.6, 2.0]
            }
          ]
        },
        {
          index: 28,
          order: 1,
          name: "Unyielding",
          levels: 5,
          desc: "+%n% Bonus Armor and Magic Resist",
          levelDesc: [
            {
              holder: "%n",
              values: [1, 2, 3, 4, 5]
            }
          ]
        }
      ]
    },
    {
      tier: 1,
      type: "key",
      masteries:[
        {
          index: 29,
          order: 0,
          name: "Explorer",
          levels: 1,
          desc: "+15 Movement Speed in Brush and River",
          levelDesc: []
        },
        {
          index: 30,
          order: 1,
          name: "Tough Skin",
          levels: 1,
          desc: "You take 2 less damage from champion and\nneutral monster basic attacks",
          levelDesc: []
        }
      ]
    },
    {
      tier: 2,
      type: "normal",
      masteries:[
        {
          index: 31,
          order: 0,
          name: "Runic Armor",
          levels: 5,
          desc: "Shields, Healing, regeneration, and lifesteal on you\nare %n% stronger",
          levelDesc: [
            {
              holder: "%n",
              values: [1.6, 3.2, 4.8, 6.4, 8]
            }
          ]
        },
        {
          index: 32,
          order: 1,
          name: "Veteran's Scars",
          levels: 5,
          desc: "+%n Health",
          levelDesc: [
            {
              holder: "%n",
              values: [9, 18, 27, 36, 45]
            }
          ]
        }
      ]
    },
    {
      tier: 3,
      type: "key",
      masteries:[
        {
          index: 33,
          order: 0,
          name: "Insight",
          levels: 1,
          desc: "Reduces the cooldown of Summoner Spells by\n15%",
          desc: "",
          levelDesc: []
        },
        {
          index: 34,
          order: 1,
          name: "Perseverance",
          levels: 1,
          desc: "+50% Health Regen, increased to +200%\nwhen below 20% Health",
          levelDesc: []
        }
      ]
    },
    {
      tier: 4,
      type: "normal",
      masteries:[
        {
          index: 34,
          order: 0,
          name: "Swiftness",
          levels: 5,
          desc: "+%n% Tenacity and Slow Resist",
          levelDesc: [
            {
              holder: "%n",
              values: [3, 6, 9, 12, 15]
            }
          ]
        },
        {
          index: 35,
          order: 1,
          name: "Legendary Guardian",
          levels: 5,
          desc: "+%n Armor and Magic Resist for each nearby enemy champion",
          levelDesc: [
            {
              holder: "%n",
              values: [0.6, 1.2, 1.8, 2.4, 3]
            }
          ]
        }
      ]
    },
    {
      tier: 5,
      type: "key",
      masteries:[
        {
          index: 36,
          order: 0,
          name: "Grasp of the Undying",
          levels: 1,
          desc: "Every 4 seconds in combat your next attack\nagainst an enemy champion steals life equal to 3%\nof your max Health (halved for ranged champions, deals magic damage)",
          levelDesc: []
        },
        {
          index: 37,
          order: 1,
          name: "Strength of the Ages",
          levels: 1,
          desc: "Siege minions and large monsters that you or\n nearby allied champions kill grant 20 and 10\n permanent Health, respectively (300 max). After\n reaching the max bonus, siege minion kills restore 100 Health.",
          levelDesc: []
        },
        {
          index: 38,
          order: 2,
          name: "Bond of Stone",
          levels: 1,
          desc: "+3% Damae Reduction. increased to 6% while\n near an allied champion. 6% of the damage taken\n by the nearest allied champion is dealt to you\n instead.",
          levelDesc: []
        }
      ]
    },
  ]
]
